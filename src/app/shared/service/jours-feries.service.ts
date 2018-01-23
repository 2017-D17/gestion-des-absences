import { Injectable } from "@angular/core";
import { JourFerie } from "../domain/jour-ferie";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable, Subject } from "rxjs";

@Injectable()
export class JoursFeriesService {
  joursFeries: JourFerie[];
  ferieSubj = new BehaviorSubject<JourFerie[]>([]);

  constructor(private http: HttpClient) {
    this.http
      .get<JourFerie[]>("http://localhost:8080/jours_feries")
      .subscribe(j => {
        this.ferieSubj.next(j);
      });
  }
  refreshJoursFeries() {
    this.http
      .get<JourFerie[]>("http://localhost:8080/jours_feries")
      .subscribe(j => this.ferieSubj.next(j));
  }

  supprimerJourFerie(jourFerieId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    console.log("jourFerieId:" + jourFerieId);
    return this.http.delete<JourFerie>(
      "http://localhost:8080/jours_feries/" + jourFerieId
    );
  }
}
