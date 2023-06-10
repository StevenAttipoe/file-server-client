import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  // toggleModel() {
  //   this.isModalOpen = !this.isModalOpen;
  // }

  toggleModal(index: number) {
    this.isModalOpen[index] = !this.isModalOpen[index];
  }

  closeModal(index: number) {
    this.isModalOpen[index] = false;
  }

  fetchFile(fileName: string): void {
    const apiUrl = `http://localhost:8080/api/v1/files/get?fileName=${fileName}`;

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
    
    // this.http.get(apiUrl, { responseType: 'arraybuffer' }).subscribe(
    //   (response) => {
    //     const file = new Blob([response], { type: 'image/png' });
    //     this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
    //   },
    //   error => {
    //     console.error('Failed to fetch file.', error);
    //   }
    // );
  }

  // closeModal(event: MouseEvent) {
  //   if (event.target === event.currentTarget) {
  //     this.isModalOpen = false;
  //   }
  // }
  
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
