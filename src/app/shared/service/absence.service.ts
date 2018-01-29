import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Absence } from "../domain/absence";
import { JourFerie } from "../domain/jour-ferie";
import { LoginService } from "./login.service";
import { environment as env} from '../../../environments/environment';
import { RoleCollaborateur } from "../domain/role-collaborateur.enum";
import { AbsenceStatut } from '../domain/absence-statut.enum';
import { Collaborateur } from "../domain/collaborateur";

@Injectable()
export class AbsenceService {
  // absences du collaborateur collaborateur connecté
  abences:Absence[];

  public absenceSubj = new BehaviorSubject<Absence[]>([]);
  // toutes les absences
  allAbences:Absence[];
  public allAbsencesSubj = new BehaviorSubject<Absence[]>([]);
  // Collaborateur connecté
  connectedUser:Collaborateur;
  // Absences en attentes de validation
  abencesEnAttente:Absence[];
  public abencesEnAttenteSubj = new BehaviorSubject<Absence[]>([]);

  constructor(private http: HttpClient,private loginService: LoginService) {
    this.refreshAbsencesByMatricule();
    this.listerAllAbsences();
    this.listerAbsencesParStatut();
  }
   

  refreshAbsencesByMatricule() {
    this.connectedUser = this.loginService.getConnectedUser();
    this.http.get<Absence[]>( env.urlBackEndAbsences + this.connectedUser.matricule)
      .subscribe(data => this.absenceSubj.next(data));
  }

  listerAllAbsences() {
    this.connectedUser = this.loginService.getConnectedUser();
    if(this.connectedUser.roles.includes(RoleCollaborateur.MANAGER)) {
      this.http.get<Absence[]>( env.urlBackEndAbsences)
    .subscribe(data => this.allAbsencesSubj.next(data));
    }
  }

  listerAbsencesParStatut() {
    this.connectedUser = this.loginService.getConnectedUser();
    if(this.connectedUser.roles.includes(RoleCollaborateur.MANAGER)) {
      this.http.get<Absence[]>( env.urlBackEndAbsencesStatut + AbsenceStatut.EN_ATTENTE_VALIDATION)
      .subscribe(data => this.abencesEnAttenteSubj.next(data));
    }
  }

  

  sauvegarderAbsence(newAbsence:Absence):Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('newAbsence ',newAbsence);
		return this.http.post<Absence>(env.urlBackEndAbsences, newAbsence,httpOptions);
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
