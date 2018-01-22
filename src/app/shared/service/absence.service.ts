import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Absence } from '../domain/absence';
import { Collaborateur } from '../domain/collaborateur';

@Injectable()
export class AbsenceService {
  abences:Absence[];
  subjectCollaborateur = new BehaviorSubject<Collaborateur>(new Collaborateur("bd540e65","Rossi","Roberts"));
  collaborateur:Collaborateur = new Collaborateur("","","");
  public absenceSubj = new BehaviorSubject<Absence[]>([]);

  // constructor(private http:HttpClient) {
  //   this.refreshConnectedCollab(this.collaborateur);
  //  }
  constructor(private http: HttpClient) {
    this.refreshAbsencesByMatricule();
    // this.http
    //   .get<Absence[]>("http://localhost:8080/absences/" + "bd540e65")
    //   .subscribe(a => {
    //     this.absenceSubj.next(a);
    //   });
  }

   refreshConnectedCollab(collab:Collaborateur) {
		this.subjectCollaborateur.next(collab);
   }

  refreshAbsencesByMatricule() {
    this.subjectCollaborateur.subscribe(data => {
      this.http.get<Absence[]>('http://localhost:8080/absences/'+data.matricule)
      .subscribe(data => this.absenceSubj.next(data));
    });
		
  }
  
  sauvegarderAbsence(newAbsence:Absence):Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
		return this.http.post<Absence>('http://localhost:8080/absences',newAbsence,httpOptions);
	}
}
