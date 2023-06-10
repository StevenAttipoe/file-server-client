import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: [
  ]
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length === 1) {
      this.selectedFile = files.item(0);
    } else {
      this.selectedFile = null;
    }
  }
  
  uploadFile(uploadFile: FormGroup): void {
    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('file', this.selectedFile);
      uploadData.append('title', uploadFile.value.title);
      uploadData.append('description', uploadFile.value.description);

      this.http.post(environment.apiUrl + '/admin/upload', uploadData).subscribe(
        (response) => {
          console.log('File uploaded successfully.', response);
        },
        (error) => {
          console.error('Failed to upload file.', error);
        }
      );
    } else {
      console.warn('No file selected.');
    }
  }
}
