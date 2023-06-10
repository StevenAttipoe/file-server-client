import { Component, EventEmitter, Output } from '@angular/core';
import { HomeComponent } from 'src/app/admin-dashboard/home/home.component';
import { UploadComponent } from 'src/app/admin-dashboard/upload/upload.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  @Output() viewSelected = new EventEmitter<any>();

  homeView = {title: 'Home', component: HomeComponent};
  uploadView = {title: 'Upload', component: UploadComponent};
  selectedView: any;

  constructor() {
    this.selectedView = this.homeView;
    this.viewSelected.emit(this.homeView);
  }

  selectView(view: any): void {
    this.selectedView = view;
    this.viewSelected.emit(view);
  }
}
