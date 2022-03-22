import { Component, OnInit } from '@angular/core';

// Importa dependências
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // Variável que armazena dados do usuário logado
  public userData: any;

  constructor(

    // Injeta dependências
    public auth: AngularFireAuth
  ) { }

  ngOnInit() {

    // Verifica se esta logado
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });

  }

}
