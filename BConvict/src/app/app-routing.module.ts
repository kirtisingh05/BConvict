import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { signupComponent } from './signup/signup.component';
import{ ForgotComponent } from './forgot/forgot.component';
import{ ProfileComponent } from './profile/profile.component'
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ShowFormsComponent } from './show-forms/show-forms.component';
import { AddFirComponent } from './add-fir/add-fir.component';
import { AddCaseComponent } from './add-case/add-case.component';
import { AddEvidenceComponent } from './add-evidence/add-evidence.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: signupComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'profile', component: ProfileComponent , canActivate : [AuthGuard] },
  { path : 'mydashboard', component :MydashboardComponent, canActivate : [AuthGuard]},
  { path : 'showforms', component :ShowFormsComponent, canActivate : [AuthGuard]},
  { path : 'addFir', component :AddFirComponent, canActivate : [AuthGuard]},
  { path : 'addCase', component :AddCaseComponent, canActivate : [AuthGuard]},
  { path : 'addEvidence', component :AddEvidenceComponent, canActivate : [AuthGuard]}

];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
