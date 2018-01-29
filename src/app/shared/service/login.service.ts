import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment as env } from "../../../environments/environment";
import { Collaborateur } from "../domain/collaborateur";

const httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

@Injectable()
export class LoginService {
  subjectCollaborateur = new BehaviorSubject<Collaborateur>(new Collaborateur("8b2d3ac7", "Hahn", "Nellie", 0, 0, "DSI/INDUS", "MANAGER"));

  constructor(private http: HttpClient) { }

  refreshConnectedCollab(collab: Collaborateur) {
    this.subjectCollaborateur.next(collab);
  }

  login(collaborateur: Collaborateur): Observable<any> {
    return this.http.post<Collaborateur>(env.urlBackEndLogin, collaborateur, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post<any>(env.urlBackEndLogout, "");
  }
}
