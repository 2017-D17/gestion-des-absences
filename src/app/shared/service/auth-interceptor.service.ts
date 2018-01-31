import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
    let authReq ;
    if(localStorage.getItem('token') != null) {
      authReq = req.clone({ headers: req.headers.set("Authorization", 'Bearer '+ localStorage.getItem('token'))});
    }else{
      authReq = req.clone({ headers: req.headers});
    }
    return next.handle(authReq);
  }
  

}
