import { Component, OnInit } from "@angular/core";
import { AbsenceService } from "../shared/service/absence.service";
import { Absence } from "../shared/domain/absence";
import { Collaborateur } from "../shared/domain/collaborateur";
import { AbsenceType, ABSENCES_TYPES} from "../shared/domain/absence-type.enum";
import { FerieType, FERIE_TYPES } from "../shared/domain/ferie-type.enum";
import { LoginService } from "../shared/service/login.service";

@Component({
  selector: "app-gestion-des-absences",
  templateUrl: "./gestion-des-absences.component.html",
  styleUrls: ["./gestion-des-absences.component.css"]
})
export class GestionDesAbsencesComponent implements OnInit {
  // Collaborateur connecté
  collaborateur: Collaborateur;
  absences: Absence[] = [];
  demandeAbsence: string = "add";
  rtt:number;
  conges:number;
  absTypes:any = ABSENCES_TYPES;
  jfTypes:any = FERIE_TYPES;

  constructor(private absService: AbsenceService,private loginService: LoginService) {}

  ngOnInit() {
    //récupération du collaborateur connecté
    this.collaborateur = this.loginService.getConnectedUser();
    this.rtt = this.collaborateur.conges;
    this.conges = this.collaborateur.rtt;
    this.absService.refreshAbsencesByMatricule();
    this.absService.absenceSubj.subscribe(result => {
      this.absences = result;
      result.forEach(abs => {
        this.rtt = abs.collaborateur.rtt;
        this.conges = abs.collaborateur.conges;
      })
    });
  }
}
