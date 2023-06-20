import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { signupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ProfileComponent } from './profile/profile.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoginheaderComponent } from './loginheader/loginheader.component';
import { LoginfooterComponent } from './loginfooter/loginfooter.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterComponent } from './filter/filter.component';
import { TableComponent } from './table/table.component';
import { ShowFormsComponent } from './show-forms/show-forms.component';
import { AddFirComponent } from './add-fir/add-fir.component';
import { AddCaseComponent } from './add-case/add-case.component';
import { AddEvidenceComponent } from './add-evidence/add-evidence.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    signupComponent,
    ForgotComponent,
    ProfileComponent,
    MydashboardComponent,
    LoginheaderComponent,
    LoginfooterComponent,
    FilterComponent,
    TableComponent,
    ShowFormsComponent,
    AddFirComponent,
    AddCaseComponent,
    AddEvidenceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
