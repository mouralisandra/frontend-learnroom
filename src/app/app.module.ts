import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from "@core/core.module";
import {AppComponent} from "@core/components/_app/app.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
