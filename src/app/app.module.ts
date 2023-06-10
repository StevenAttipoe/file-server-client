import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { AuthComponent } from './pages/auth/auth.component';
import { IndexComponent } from './pages/index/index.component';
import { SidebarComponent } from './admin-dashboard/components/sidebar/sidebar.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminDashboardModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
