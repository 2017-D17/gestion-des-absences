import { Component, OnInit } from '@angular/core';
import { AbsenceService } from "../shared/service/absence.service";
import { JourFerie } from '../shared/domain/jour-ferie';

@Component({
  selector: 'app-jours-feries',
  templateUrl: './jours-feries.component.html',
  styleUrls: ['./jours-feries.component.css']
})
export class JoursFeriesComponent implements OnInit {
  demandeAbsence: string = "add";
  absences:JourFerie[];

  constructor(private absService: AbsenceService) { }

  ngOnInit() {
    this.absService.jourFerieSubj.subscribe(result => {
      console.log(result);
      this.absences = result;
    });
  }

}
