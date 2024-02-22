import {Injectable} from '@angular/core';
import {BehaviorSubject, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private apiCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor() { }

  showLoader() {
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(true);
    }
    this.apiCount++;
  }

  hideLoader() {
    if (this.apiCount > 0) {
      this.apiCount--;
      if (this.apiCount === 0) {
        timer(500).subscribe(() => this.isLoadingSubject.next(false));
      }
    }
    }
  }
