import { Component, OnInit } from '@angular/core';
import { Collaborateur } from "../shared/domain/collaborateur";
import { FormsModule, NgForm } from "@angular/forms";
import { LoginService } from "../shared/service/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
    // Collaborateur connecté
    collaborateur: Collaborateur = new Collaborateur("","","",0,0,"",[],[]);
    // Message d'erreur ou de succès suite à l'envoi des données sur le serveur
    msg:string
    // Attribut permettant d'afficher ou non le message d'alert msg
    alertActive:boolean = false;
    data:any = {};


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  submit(loginForm: NgForm) {    
    this.loginService.seConnecter(this.data).subscribe(result => {
      if(result) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.collaborateur));
        this.loginService.setConnectedUser(result.collaborateur);
        loginForm.resetForm();
        this.router.navigate(['/accueil']);
      } else {
        this.alertActive = true;
        this.msg = "Vos informations d'authentification sont invalides";
      }
      

    },err => {
        this.alertActive = true;
        this.msg = "Vos informations d'authentification sont invalides";
    });
    

  }

  // Fermeture de l'alert par la croix
  closeAlert() {
    this.alertActive = false;
  }

}
