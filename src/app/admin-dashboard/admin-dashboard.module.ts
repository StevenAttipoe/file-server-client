import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'upload',
    component: UploadComponent,
  },
]

@NgModule({
  declarations: [
    HomeComponent,
    UploadComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), HttpClientModule
  ]
})
export class AdminDashboardModule { }
