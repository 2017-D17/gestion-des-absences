import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Collaborateur } from "../shared/domain/collaborateur";

@Component({
  selector: "app-filtre-mois-annee-dept",
  templateUrl: "./filtre-mois-annee-dept.component.html",
  styleUrls: ["./filtre-mois-annee-dept.component.css"]
})
export class FiltreMoisAnneeDeptComponent implements OnInit {
  @Input() depts: string[];
  @Input() annees: number[] = [];
  @Input() mois: string[] = [];
  @Output() changeannee: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeyear: EventEmitter<number> = new EventEmitter<number>();
  @Output() changedeptmois: EventEmitter<string> = new EventEmitter<string>();
  collaborateurs: Collaborateur[] = [];
  dept: string;
  annee: number;
  year: number;

  constructor() { }

  ngOnInit() {
    let currentDate = new Date();
    for (
      let i = currentDate.getFullYear();
      i < currentDate.getFullYear() + 10;
      i++
    ) {
      this.annees.push(i);
    }
    this.mois.push("Janvier");
    this.mois.push("Fevrier");
    this.mois.push("Mars");
    this.mois.push("Avril");
    this.mois.push("Mai");
    this.mois.push("Juin");
    this.mois.push("Juillet");
    this.mois.push("Aout");
    this.mois.push("Septembre");
    this.mois.push("Novembre");
    this.mois.push("Octobre");
    this.mois.push("Décembre");
  }

  filtrerParDepAnneeMois(event) {
    this.annee = event.srcElement.value;
    this.dept = event.srcElement.value;
    this.year = event.srcElement.value;
    this.changeannee.emit(this.annee);
    this.changeyear.emit(this.year);
    this.changedeptmois.emit(this.dept);
  }
}
