import { Component, OnInit } from '@angular/core';

// Importa dependências
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    // Injeta dependências
    public auth: AngularFireAuth,
    public alertController: AlertController,
    private route: Router
  ) { }

  ngOnInit() { }

  // Função de login, executada pelo botão
  login() {

    // Faz a autenticação do usuário pelo provedor
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

      // Se der certo...
      .then(

        // Obtém os dados do usuário
        (user) => {

          // "Chama" a caixa de alerta
          this.presentAlert(user.user.displayName);
        }
      );
  }

  // Exibe uma caixa de alerta ao logar-se
  // Referências: https://ionicframework.com/docs/api/alert
  async presentAlert(userName) {
    const alert = await this.alertController.create({
      header: `Olá ${userName}!`,
      message: 'Você já pode acessar nosso conteúdo exclusivo...',
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            // Quando clicar em [Ok] na caixa, vai para a página inicial
            this.route.navigate(['/inicio']);
          }
        }
      ]
    });
    await alert.present();
  }

}
