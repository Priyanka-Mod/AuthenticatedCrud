import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule} from 'primeng/panel';
import{ InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from "primeng/password";
import {CalendarModule} from 'primeng/calendar';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ShowUserDetailComponent } from './show-user-detail/show-user-detail.component';
import { AppRoutingModule } from './app-routing.module';
// import { UserDataService } from './user-detail.service';
import { HttpClientModule } from '@angular/common/http';
import { ShowAllUsersComponent } from './show-all-users/show-all-users.component';
import { DatePipe } from '@angular/common';
import { UserDataService } from 'src/user-data.service';
// import { EditUserComponent } from './edit-user/edit-user.component';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    UserDetailComponent,
    ShowUserDetailComponent,
    ShowAllUsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,PanelModule,InputTextModule,
    PasswordModule,
    AppRoutingModule,
    CalendarModule,
    NgxIntlTelInputModule,
    DropdownModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule,
    HttpClientModule
  ],
  providers: [DatePipe,UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
