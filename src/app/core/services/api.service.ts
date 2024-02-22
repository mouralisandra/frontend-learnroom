import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://localhost:3000';
  private init = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
  ) {}

  private handleError(error: any, showErrors: boolean) {
    console.error('Error:', error.message);
    if (showErrors) this.toastr.error('Error: ' + error.message, 'Error');
    return of(error.message);
  }

  private makeRequest<Entity>(
    url: string,
    method: string,
    showErrors: boolean,
    showSuccess: boolean,
    body?: any,
  ): Observable<Entity> {
    const requestOptions = {
      ...this.init,
      body: body ? JSON.stringify(body) : undefined,
    };

    let call: Observable<Entity>;
    let successMessage = '';
    switch (method) {
      case 'GET':
        call = this.http.get<Entity>(this.BASE_URL + url, requestOptions);
        successMessage = `Fetched ${url} successfully`;
        break;
      case 'POST':
        call = this.http.post<Entity>(
          this.BASE_URL + url,
          body,
          requestOptions,
        );
        successMessage = `Created ${url} successfully`;
        break;
      case 'PATCH':
        call = this.http.patch<Entity>(
          this.BASE_URL + url,
          body,
          requestOptions,
        );
        successMessage = `Updated ${url} successfully`;
        break;
      case 'DELETE':
        call = this.http.delete<Entity>(this.BASE_URL + url, requestOptions);
        successMessage = `Deleted ${url} successfully`;
        break;
      default:
        call = this.http.request<Entity>(
          method,
          this.BASE_URL + url,
          requestOptions,
        );
        break;
    }

    return call.pipe(
      map((obj: Entity) => {
        const result = obj as Entity & { message: string };
        if (result.message) {
          this.toastr.error(result.message, 'Error');
          return {} as Entity;
        }
        if (showSuccess) this.toastr.success(successMessage, 'Success');
        return obj as Entity;
      }),
      catchError((error) => this.handleError(error, showErrors)),
    );
  }

  get<T>(url: string, showSuccess = false, showErrors = true) {
    return this.makeRequest<T>(url, 'GET', showErrors, showSuccess).pipe();
  }

  post<T>(url: string, body: any, showSuccess = true, showErrors = true) {
    return this.makeRequest<T>(
      url,
      'POST',
      showErrors,
      showSuccess,
      body,
    ).pipe();
  }

  patch<T>(url: string, body: any, showSuccess = true, showErrors = true) {
    return this.makeRequest<T>(
      url,
      'PATCH',
      showErrors,
      showSuccess,
      body,
    ).pipe();
  }

  remove<T>(url: string, showSuccess = true, showErrors = true) {
    return this.makeRequest<T>(url, 'DELETE', showErrors, showSuccess).pipe();
  }
}
