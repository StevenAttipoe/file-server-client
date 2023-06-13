import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environment';
import { FileMetaData } from 'src/app/admin-dashboard/interfaces/FileMetaData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  fileMetaData: FileMetaData[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFilesMetaData();
  }

  getFilesMetaData(): void {
    this.http.get<FileMetaData[]>(environment.apiUrl + '/files/get/metadata/all').subscribe(
      (response) => {
        this.fileMetaData = response;
        console.log('Files metadata successfully retrieved.', response);
      },
      (error) => {
        console.error('Could not get files', error);
      }
    );
  }
}
