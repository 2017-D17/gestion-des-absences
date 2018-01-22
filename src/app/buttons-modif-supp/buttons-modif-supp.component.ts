import { Component, Input, OnInit } from "@angular/core";
import { Absence } from "../shared/domain/absence";
import { AbsenceService } from "../shared/service/absence.service";

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

  constructor(private aService: AbsenceService) {}

  ngOnInit() {
    if (this.absence.statut == "INITIALE") {
      this.modifAbsence = "update";
      // this.modif = true;
    }
  }

  supprimer(articleId: number) {
    console.log(this.absence);
    this.aService
      .supprimerAbsence(this.absence.id)

      .subscribe(abs => (this.absence = abs));
  }

  modifier() {
    console.log(this.absence);
    console.log("modifier");
  }
}
