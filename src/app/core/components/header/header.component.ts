import {Component, inject, Input} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthPersistence} from "@core/services/auth.persistence";
import {AuthService} from "@features/auth/auth.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  router = inject(Router);
  @Input() isOpen: boolean = false;
  isCollapsed: boolean = true; // Add or modify this property as needed
  showHeader: boolean = true;
  authService = inject(AuthPersistence);
  connService = inject(AuthService);
  translate = inject(TranslateService)
  selectedLanguage: string = 'fr'; // Set the default language here

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlWithoutQueryParams = event.url.split('?')[0];

        this.showHeader = !(
          urlWithoutQueryParams.startsWith('/login') ||
          urlWithoutQueryParams.startsWith('/register')
        );
      }
      this.selectedLanguage = this.translate.currentLang;
    });
  }

  navigateToPreview(): void {
    this.router.navigate(['']);
  }

  signIn(): void {
    this.router.navigate(['login']);
  }

  signUp(): void {
    this.router.navigate(['register']);
  }

  signOut(): void {
    this.router.navigate(['']);
    this.connService.logout();
  }
  onLanguageChange(language: string): void {
    this.translate.use(language);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
