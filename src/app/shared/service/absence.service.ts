import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Absence } from '../domain/absence';

@Injectable()
export class AbsenceService {
  abences:Absence[];
  subject = new BehaviorSubject<Absence[]>([]);

  constructor(private http:HttpClient) { }

  refresh() {
		this.http.get<Absence[]>('http://localhost:8080/absences')
		.subscribe(data => this.subject.next(data));
  }
  
  sauvegarder(newAbsence:Absence):Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
		return this.http.post<Absence>('http://localhost:8080/absences/creer',newAbsence,httpOptions);
	}

}
