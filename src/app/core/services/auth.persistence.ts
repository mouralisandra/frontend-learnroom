import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {User} from "@core/models/user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthPersistence {
  readonly userSubject: BehaviorSubject<User>;
  readonly user$: Observable<User>;
  readonly isTeacher$: Observable<boolean>;
  readonly isAuthenticated$: Observable<boolean>;


  constructor(private readonly CookieService:CookieService) {
    this.userSubject = new BehaviorSubject({} as User);
    this.user$ = this.userSubject.asObservable();
    this.isTeacher$ = this.userSubject.pipe(map((res) => res.user));
    this.isAuthenticated$ = this.user$.pipe(map((res) => Boolean(this.CookieService.get('auth') && res.id)));
  }
}
