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
  // Collaborateur connecté
  collaborateur: Collaborateur;
  constructor(private absenceService: AbsenceService,private loginService: LoginService,private router: Router) {}

  ngOnInit() {
    // récupération du collaborateur connecté
    this.loginService.subjectCollaborateur.subscribe(
      data => (this.collaborateur = data)
    );
  }

  seDeconnecter() {
    this.loginService.seDeConnecter().subscribe();
    this.loginService.subjectCollaborateur.next(new Collaborateur("","","",0,0,"","USER"));
    this.router.navigate(['/connexion']);
  }
}
