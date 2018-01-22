import { Component, Input, OnInit } from "@angular/core";
import { Absence } from "../shared/domain/absence";

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

  constructor() {}

  ngOnInit() {
    if (this.absence.statut == "INITIALE") {
      this.modifAbsence = "update";
      // this.modif = true;
    }
  }

  supprimer() {
    console.log("supprimer");
  }

  modifier() {
    console.log(this.absence);
    console.log("modifier");
  }
}
