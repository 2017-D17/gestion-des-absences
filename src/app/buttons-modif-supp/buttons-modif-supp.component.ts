import { Component, Input, OnInit } from "@angular/core";
import { Absence } from "../shared/domain/absence";
import { AbsenceService } from "../shared/service/absence.service";
import { FerieType, FERIE_TYPES } from '../shared/domain/ferie-type.enum';

@Component({
  selector: "app-buttons-modif-supp",
  templateUrl: "./buttons-modif-supp.component.html",
  styleUrls: ["./buttons-modif-supp.component.css"]
})
export class ButtonsModifSuppComponent implements OnInit {
  @Input() absence: Absence;

  @Input() titre: string;
  absences: Absence[];
  modif: boolean = false;
  modifAbsence: string;
  aff:boolean = false;

  constructor(private aService: AbsenceService) {}

  ngOnInit() {
    if (this.absence.statut == "INITIALE" && this.absence.type != FerieType.RTT_EMPLOYEUR) {
      this.modifAbsence = "update";
      this.aff = true;
    } else if(this.absence.statut == "EN_ATTENTE_VALIDATION" ) {
      this.aff = true;
    }
  }

  supprimer() {
    this.aService
      .supprimerAbsence(this.absence.id).subscribe(resultat => {
        this.absence = resultat;
        //Mise à jour des absences
        this.aService.refreshAbsencesByMatricule();
      });
  }

}