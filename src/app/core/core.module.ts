import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from "@core/components/spinner/spinner.component";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoaderService} from "@core/services/loader.service";
import {LoaderInterceptor} from "@core/interceptors/loader.interceptor";
import {SidebarComponent} from "@core/components/sidebar/sidebar.component";
import {TokenInterceptor} from "@core/interceptors/token.interceptor";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ToastrModule} from "ngx-toastr";
import {CookieService} from "ngx-cookie-service";
import {ApiService} from "@core/services/api.service";
import {AppComponent} from "@core/components/_app/app.component";
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
  NgbCollapse
} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "@shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "@core/components/footer/footer.component";
import {HeaderComponent} from "@core/components/header/header.component";
import {FormsModule} from "@angular/forms";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";


@NgModule({
  declarations: [SpinnerComponent,
    SidebarComponent,AppComponent,FooterComponent,HeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
    }),
    SharedModule,
    RouterOutlet,
    FormsModule,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
    NgbCollapse,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    LoaderService,
    CookieService,
    ApiService
  ],
  exports: [
    AppComponent
  ]
})
export class CoreModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
