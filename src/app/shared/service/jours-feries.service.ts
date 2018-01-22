import { Injectable } from "@angular/core";
import { JourFerie } from "../domain/jour-ferie";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class JoursFeriesService {
  joursFeries: JourFerie[];

  constructor(private http: HttpClient) {
    this.http
      .get<JourFerie[]>("http://localhost:8080/jours_feries")
      .subscribe(j => {
        this.ferieSubj.next(j);
      });
  }

  public ferieSubj = new BehaviorSubject<JourFerie[]>([]);
}
