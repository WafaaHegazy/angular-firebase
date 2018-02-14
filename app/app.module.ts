import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import {AngularFireAuth} from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { SidebareComponent } from './components/sidebare/sidebare.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {ClientService} from './services/client.service';
import {AuthService} from './services/auth.service';
import { ClientsComponent } from './components/clients/clients.component';
import {enableProdMode} from '@angular/core';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import {SettingsService} from './services/settings.service';
import {RegisterGuard} from './guards/register.guard'

enableProdMode();
const appRoutes:Routes=[
{path: '', component:DashboardComponent, canActivate:[AuthGuard]},
{path:'login',component:LoginComponent},
{path:'register', component:RegisterComponent, canActivate:[RegisterGuard]},
{path:'add-client', component:AddClientComponent, canActivate:[AuthGuard]},
{path:'client/:id', component:ClientDetailsComponent, canActivate:[AuthGuard]},
{path:'edit-client/:id', component:EditClientComponent, canActivate:[AuthGuard]},
{path:'settings', component:SettingsComponent, canActivate:[AuthGuard]},
{path:'**', component:PageNotFoundComponent}
];

export const firebaseConfig ={
  //set firebase configuration here 
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientDetailsComponent,
    SidebareComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NavbarComponent,
    AddClientComponent,
    EditClientComponent,
    PageNotFoundComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ClientService,
    AuthService,
    AuthGuard,
    SettingsService,
    RegisterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
