import { Component, OnInit } from '@angular/core';
import { LoginService } from "../shared/service/login.service";
import { Collaborateur } from "../shared/domain/collaborateur";
import { RoleCollaborateur } from "../shared/domain/role-collaborateur.enum";

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit {
   // Collaborateur connecté
   collaborateur: Collaborateur;
   collaborateurs: Collaborateur[] = [];

  constructor() { }

  ngOnInit() {
  }

}
