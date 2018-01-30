import { Component, OnInit } from "@angular/core";
import { AbsenceService } from "../shared/service/absence.service";
import { Collaborateur } from "../shared/domain/collaborateur";
import { LoginService } from "../shared/service/login.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {

  collaborateur: Collaborateur;

  constructor(private absenceService: AbsenceService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.collaborateur = this.loginService.getConnectedUser();
  }

  seDeconnecter() {
    console.log("deconnexion");
    /*this.loginService.setConnectedUser(new Collaborateur("","","",0,0,"",[],[]));
    this.router.navigate(['/connexion']);*/
    this.loginService.seDeconnecter();
  }
}
