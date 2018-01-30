import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment as env } from "../../../environments/environment";
import { Collaborateur } from "../domain/collaborateur";
import { Router } from '@angular/router';

const httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

@Injectable()
export class LoginService {
  connectedUser:Collaborateur;

  constructor(private http: HttpClient,private router: Router) { }

   getConnectedUser():Collaborateur {
    this.connectedUser = JSON.parse(localStorage.getItem('user'))
    if(this.connectedUser) {
      return this.connectedUser;
    } else {
      this.router.navigate(['/connexion']);
    }
    
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

  seDeconnecter() {
    localStorage.clear();
    this.router.navigate(['/connexion']);
  }

}
