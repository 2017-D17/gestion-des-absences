import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment as env } from "../../../environments/environment";
import { Collaborateur } from "../domain/collaborateur";

@Injectable()
export class LoginService {
  sub1:Collaborateur = new Collaborateur("a8fc21fc","Robertson","Hubbard",0,0,"DSI/INDUS","USER",[]);
  sub2:Collaborateur = new Collaborateur("e300fb12","Odonnell","Jennifer",0,0,"DSI/INDUS","USER",[]);
  subjectCollaborateur = new BehaviorSubject<Collaborateur>(new Collaborateur("8b2d3ac7","Hahn","Nellie",0,0,"DSI/INDUS","MANAGER",[this.sub1,this.sub2]));

  constructor(private http: HttpClient) { }

  refreshConnectedCollab(collab:Collaborateur) {
		this.subjectCollaborateur.next(collab);
   }

  seConnecter(collaborateur: Collaborateur): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<Collaborateur>(env.urlBackEndLogin, collaborateur,httpOptions );
  }
  seDeConnecter(): Observable<any> {
    return this.http.post<any>(env.urlBackEndLogout,"");
  }



}
