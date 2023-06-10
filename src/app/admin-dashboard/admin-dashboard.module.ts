import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'dashboard', component: MainComponent,},
]

@NgModule({
  declarations: [
    HomeComponent,
    UploadComponent,
    SidebarComponent,
    MainComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), HttpClientModule, ReactiveFormsModule
  ]
})
export class AdminDashboardModule { }
