import { Component, OnInit } from '@angular/core';

// Importa dependências
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  // Variável que armazena dados do usuário logado
  user: any;

  constructor(

    // Injeta dependências
    public auth: AngularFireAuth,
  ) { }

  // executada sempre que esta página é 'aberta'
  ngOnInit() {

    // Verifica se tem usuario logado
    this.auth.authState.subscribe(user => {
      if (user) {

        // Armazena os dados do usuário em 'this.user'
        this.user = user;
      }
    });

  }

}
