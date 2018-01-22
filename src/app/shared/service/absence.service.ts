import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Absence } from "../domain/absence";
import { Collaborateur } from "../domain/collaborateur";

import { environment as env} from '../../../environments/environment';

@Injectable()
export class AbsenceService {
  abences:Absence[];
  subjectCollaborateur = new BehaviorSubject<Collaborateur>(new Collaborateur("8b2d3ac7","Hahn","Nellie"));
  collaborateur:Collaborateur = new Collaborateur("","","");
  public absenceSubj = new BehaviorSubject<Absence[]>([]);


  constructor(private http: HttpClient) {
    this.refreshAbsencesByMatricule();
  }

   refreshConnectedCollab(collab:Collaborateur) {
		this.subjectCollaborateur.next(collab);
   }

  refreshAbsencesByMatricule() {
    this.subjectCollaborateur.subscribe(data => {
      this.http.get<Absence[]>( env.urlBackEnd + data.matricule)
      .subscribe(data => this.absenceSubj.next(data));

    });
  }

  sauvegarderAbsence(newAbsence:Absence):Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
		return this.http.post<Absence>(env.urlBackEnd, newAbsence,httpOptions);
  }
  
  modifierAbsence(modifAbsence:Absence) {
    console.log('modifAbsence.id ',modifAbsence.id);
    const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
		return this.http.put<Absence>(env.urlBackEnd + modifAbsence.id,modifAbsence,httpOptions);

  }
  supprimerAbsence(absenceId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.delete<Absence>(env.urlBackEnd + absenceId);
  }

  validerOuRejeterAbsence(modifAbsence:Absence) {
    console.log('modifAbsence.id ',modifAbsence.id);
    const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
		return this.http.patch<Absence>(env.urlBackEnd + modifAbsence.id,modifAbsence,httpOptions);
  }
}
