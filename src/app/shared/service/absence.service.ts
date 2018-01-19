import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Absence } from "../domain/absence";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Collaborateur } from "../domain/collaborateur";

@Injectable()
export class AbsenceService {
  private collaborateur: Collaborateur = new Collaborateur("", "", "");
  constructor(private http: HttpClient) {
    this.http
      .get<Absence[]>("http://localhost:8080/absences/" + "UUID3")
      .subscribe(a => {
        this.absenceSubj.next(a);
      });
  }

  public absenceSubj = new BehaviorSubject<Absence[]>([]);
}
