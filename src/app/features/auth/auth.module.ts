import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {AuthRoutingModule} from './auth-routing.module';
import {RegisterComponent} from './register/register.component';
import {PreviewComponent} from "@features/auth/preview/preview.component";
import {SharedModule} from "@shared/shared.module";

@NgModule({
  declarations: [LoginComponent, RegisterComponent,PreviewComponent],
  imports: [CommonModule, FormsModule, RouterLink, AuthRoutingModule,SharedModule],
})
export class AuthModule {}
