// @ts-ignore
import {BrowserModule} from '@angular/platform-browser';
// @ts-ignore

import {NgModule} from '@angular/core';
import {LoginComponent} from './customers/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ListComponent} from './houses/list/list.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './layouts/home/home.component';
import {RegisterComponent} from './customers/register/register.component';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {AddComponent} from './houses/add/add.component';
import {DetailComponent} from './houses/detail/detail.component';
import {FooterComponent} from './layouts/footer/footer.component';

import { CheckoutComponent } from './houses/checkout/checkout.component';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NgxDropzoneModule} from "ngx-dropzone";

import { BListComponent } from './bills/b-list/b-list.component';

import { ProfileComponent } from './customers/profile/profile.component';
import { PasswordComponent } from './customers/password/password.component';
import { BNewComponent } from './bills/b-new/b-new.component';
import { BOldComponent } from './bills/b-old/b-old.component';
import {CarouselModule} from 'ngx-owl-carousel-o';

import {AngularMyDatePickerModule} from "angular-mydatepicker";

import { UserListComponent } from './houses/user-list/user-list.component';
import { UpdateComponent } from './houses/update/update.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ListComponent,
    AddComponent,
    DetailComponent,
    FooterComponent,
    CheckoutComponent,

    BListComponent,
    ProfileComponent,
    PasswordComponent,
    BNewComponent,
    BOldComponent,
    UserListComponent,
    UpdateComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularMyDatePickerModule,
    BrowserAnimationsModule,

    CarouselModule,

    NgxDropzoneModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),


  ],
  providers: [AngularFirestoreModule, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule {
}
