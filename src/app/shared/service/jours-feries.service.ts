import { Injectable } from "@angular/core";
import { JourFerie } from "../domain/jour-ferie";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment as env } from "../../../environments/environment";
import { Collaborateur } from "../domain/collaborateur";
import { LoginService } from "./login.service";

@Injectable()
export class JoursFeriesService {
  joursFeries: JourFerie[];
  ferieSubj = new BehaviorSubject<JourFerie[]>([]);
  // Collaborateur connecté
  connectedUser:Collaborateur;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.refreshJoursFeries();
  }

  supprimerJourFerie(jourFerieId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.delete<JourFerie>(
      env.urlBackEndJoursFeries + jourFerieId
    );
  }

  refreshJoursFeries() {
    this.connectedUser = this.loginService.getConnectedUser();
    if(this.connectedUser) {
      this.http
      .get<JourFerie[]>(env.urlBackEndJoursFeries)
      .subscribe(j => this.ferieSubj.next(j));
    }
    
  }

  sauvegarderJourFerie(newJoursFeries: JourFerie): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<JourFerie>(
      env.urlBackEndJoursFeries,
      newJoursFeries,
      httpOptions
    );
  }

  modifierJourFerie(modifJoursFeries: JourFerie): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put<JourFerie>(
      env.urlBackEndJoursFeries + modifJoursFeries.id,
      modifJoursFeries,
      httpOptions
    );
  }
}
