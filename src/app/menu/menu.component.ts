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
    this.loginService.seDeConnecter().subscribe();
    localStorage.clear();

    this.router.navigate(['/connexion']);
  }
}
