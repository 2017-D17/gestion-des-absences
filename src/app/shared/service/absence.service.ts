import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Absence } from "../domain/absence";
import { JourFerie } from "../domain/jour-ferie";

import { Collaborateur } from "../domain/collaborateur";
import { LoginService } from "./login.service";
import { environment as env } from "../../../environments/environment";
import { RoleCollaborateur } from "../domain/role-collaborateur.enum";
import { AbsenceStatut } from "../domain/absence-statut.enum";

@Injectable()
export class AbsenceService {
  abences: Absence[];

  public absenceSubj = new BehaviorSubject<Absence[]>([]);
  // toutes les absences
  allAbences: Absence[];
  public allAbsencesSubj = new BehaviorSubject<Absence[]>([]);
  // Absences en attentes de validation
  abencesEnAttente: Absence[];
  public abencesEnAttenteSubj = new BehaviorSubject<Absence[]>([]);

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.refreshAbsencesByMatricule();
    this.listerAllAbsences();
    this.listerAbsencesParStatut();
  }
  refreshAbsencesByMatricule() {
    this.loginService.subjectCollaborateur.subscribe(data => {
      this.http
        .get<Absence[]>(env.urlBackEndAbsences + data.matricule)
        .subscribe(data => this.absenceSubj.next(data));
    });
  }

  listerAllAbsences() {
    this.loginService.subjectCollaborateur.subscribe(collab => {
      if (collab.role.includes(RoleCollaborateur.MANAGER)) {
        this.http
          .get<Absence[]>(env.urlBackEndAbsences)
          .subscribe(data => this.allAbsencesSubj.next(data));
      }
    });
  }

  listerAbsencesParStatut() {
    this.loginService.subjectCollaborateur.subscribe(collab => {
      if (collab.role.includes(RoleCollaborateur.MANAGER)) {
        this.http
          .get<Absence[]>(
            env.urlBackEndAbsencesStatut + AbsenceStatut.EN_ATTENTE_VALIDATION
          )
          .subscribe(data => this.abencesEnAttenteSubj.next(data));
      }
    });
  }

  sauvegarderAbsence(newAbsence: Absence): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<Absence>(
      env.urlBackEndAbsences,
      newAbsence,
      httpOptions
    );
  }

  modifierAbsence(modifAbsence: Absence) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put<Absence>(
      env.urlBackEndAbsences + modifAbsence.id,
      modifAbsence,
      httpOptions
    );
  }
  supprimerAbsence(absenceId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.delete<Absence>(env.urlBackEndAbsences + absenceId);
  }

  validerOuRejeterAbsence(modifAbsence: Absence) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.patch<Absence>(
      env.urlBackEndAbsences + modifAbsence.id,
      modifAbsence,
      httpOptions
    );
  }
}
