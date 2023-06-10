import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent {
  selectedView: any;

  constructor() {
    this.selectedView = {component: HomeComponent };
  }

  onViewSelected(view: any) {
    this.selectedView = view;
  }
}
