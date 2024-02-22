import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthPersistence} from "@core/services/auth.persistence";

export const authenticatedGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const authService = inject(AuthPersistence);
  let authenticated = false;
  authService.isAuthenticated$.subscribe((res) => (authenticated = res));
  if (!authenticated && localStorage.getItem('auth') !== "true"){
    console.log("hi")
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};

export const disconnectedGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const authService = inject(AuthPersistence);
  let authenticated = true;
  authService.isAuthenticated$.subscribe((res) => (authenticated = res));
  if (authenticated && localStorage.getItem('auth') === "true"){
    router.navigate(['/classroom']);
    return false;
  }

  return true;
};
