import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment as env } from "../../../environments/environment";
import { Collaborateur } from "../domain/collaborateur";

const httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

@Injectable()
export class LoginService {
  connectedUser:Collaborateur;

  constructor(private http: HttpClient) { }

   getConnectedUser():Collaborateur {
    this.connectedUser = JSON.parse(localStorage.getItem('user'))
     return this.connectedUser;
   }

   setConnectedUser(collab:Collaborateur) {
    this.connectedUser = collab;
   }

  seConnecter(dataLogin: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    };
    return this.http.post<Collaborateur>(env.urlBackEndLogin, dataLogin,httpOptions );
  }
  seDeConnecter(): Observable<any> {
    return this.http.post<any>(env.urlBackEndLogout,"");

  }

  login(collaborateur: Collaborateur): Observable<any> {
    return this.http.post<Collaborateur>(env.urlBackEndLogin, collaborateur, httpOptions);
  }
}
