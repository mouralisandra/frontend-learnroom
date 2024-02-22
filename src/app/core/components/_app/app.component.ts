import {Component, inject} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {TranslateService} from "@ngx-translate/core";
import {AuthPersistence} from "@core/services/auth.persistence";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learnRoom-frontend-angular';
  modalService = inject(NgbModal);
  isLoggedIn$: Observable<boolean>;
  authService = inject(AuthPersistence);
  constructor(private translate: TranslateService) {
    this.isLoggedIn$ = this.authService.isAuthenticated$;
      translate.setDefaultLang('fr');
    translate.addLangs(['en', 'fr']);
    const browserLang = translate.getBrowserLang();
    if (browserLang != null) {
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
    }
    }
}
