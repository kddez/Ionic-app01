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

    // Verifica se esta logado
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        console.log(user);
      }
    });

  }

}
