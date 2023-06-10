import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'home', component: HomeComponent,},
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), HttpClientModule
  ]
})
export class UserModule { }
