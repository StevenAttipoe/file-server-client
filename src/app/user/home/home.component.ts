import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environment';
import { FileMetaData } from '../interfaces/FileMetaData';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  fileNames: FileMetaData[] = [];
  fileUrl: SafeResourceUrl | undefined = undefined;
  isModalOpen: boolean[] = [];
  currentPage = 1;
  totalPages = 0;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchFiles();
  }

  updateDownloadCount(fileName: string): void {
    this.http.put(environment.apiUrl + `/files/update/download-count?fileName=${fileName}`, {}).subscribe(
      (response) => {
        console.log('Download count updated successfully.', response);
      },
      (error) => {
        console.error('Failed to update download count.', error);
      }
    );
  }

  updateMailCount(fileName: string): void {
    this.http.put(environment.apiUrl + `/files/update/email-count?fileName=${fileName}`, {}).subscribe(
      (response) => {
        console.log('Email count updated successfully.', response);
      },
      (error) => {
        console.error('Failed to email download count.', error);
      }
    );
  }

  fetchFiles(page: number = 1, pageSize: number = 11): void {
    this.http.get<FileMetaData[]>( environment.apiUrl + `/files/get/all?page=${page}&pageSize=${pageSize}`).subscribe(
      (response) => {
        this.fileNames = response;
        console.log('Files fetched successfully.', response);
        this.currentPage = page;
        this.totalPages = Math.ceil(this.fileNames.length / pageSize);
      },
      (error) => {
        console.error('Failed to fetch files.', error);
      }
    );
  }

  toggleModal(index: number) {
    this.isModalOpen[index] = !this.isModalOpen[index];
  }

  closeModal(index: number) {
    this.isModalOpen[index] = false;
  }

  fetchFile(fileName: string): void {
    const apiUrl = environment.apiUrl + `/files/get?fileName=${fileName}`;

    this.http.get(apiUrl, { responseType: 'blob', observe: 'response' }).subscribe(
      (response: HttpResponse<Blob | null>) => {
        console.log('File fetched successfully.', fileName);
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const file = new Blob([response.body as BlobPart], { type: contentType }) ;
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
      },
      error => {
        console.error('Failed to fetch file.', error);
      }
    );
  }
  
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
