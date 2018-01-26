import { Component, OnInit } from "@angular/core";
import { AbsenceService } from "../shared/service/absence.service";
import { Collaborateur } from "../shared/domain/collaborateur";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  // Collaborateur connecté
  collaborateur: Collaborateur;
  constructor(private absenceService: AbsenceService) {}

  ngOnInit() {
    // récupération du collaborateur connecté
    this.absenceService.subjectCollaborateur.subscribe(
      data => (this.collaborateur = data)
    );
  }
}
