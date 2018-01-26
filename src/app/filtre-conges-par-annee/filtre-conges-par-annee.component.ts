import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Collaborateur } from "../shared/domain/collaborateur";

@Component({
  selector: "app-filtre-conges-par-annee",
  templateUrl: "./filtre-conges-par-annee.component.html",
  styleUrls: ["./filtre-conges-par-annee.component.css"]
})
export class FiltreCongesParAnneeComponent implements OnInit {
  @Input() annees: number[];
  collaborateurs: Collaborateur[] = [];
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  annee: number;

  constructor() {}

  ngOnInit() {}

  filtrerParDate(event) {
    this.annee = event.srcElement.value;
    this.change.emit(this.annee);
  }
}
