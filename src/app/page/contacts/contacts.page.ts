import { Component, OnInit } from '@angular/core';

// Importa dependências
import { FormBuilder, FormGroup, Validators } from '@angular/forms';   // Classes do Reactive forms
import { Router } from '@angular/router';                              // Roteamento
import { AlertController } from '@ionic/angular';                      // Caixa de alerta do Ionic
import { initializeApp } from 'firebase/app';                          // Firebase
import { addDoc, collection, getFirestore } from 'firebase/firestore'; // Firestore
import { environment } from 'src/environments/environment';            // Configurações do app
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  // Recebe o formulário
  contactForm: FormGroup;

  // Armazena documento para o Firestore
  contactData: any;

  // Armazena metadados do usuário logado
  user = {};

  // Conexão com Firebase. Observe o uso da chave de 'environment'
  app = initializeApp(environment.firebase);

  // Conexão com Firestore
  db = getFirestore();

  constructor(

    // Injeta dependências
    private fb: FormBuilder,                  // Objeto do formulário
    private alertController: AlertController, // Objeto da caixa de alerta
    private router: Router,                    // Objeto que faz redirecionamento de rota
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {

    // Cria formulário
    this.createForm();

    // Testa se tem usuário logado
    this.auth.authState.subscribe((user) => {

      // Se tem alguém logado
      if (user) {

        // Monta metadados do usuário
        this.user = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
          status: 'logged'
        };

        // Campos nome e e-mail já vem preenchidos
        this.contactForm.reset({
          name: user.displayName,
          email: user.email,
        });

        // Ninguém logado
      } else {

        // Monta metadados do usuário
        this.user = {
          status: 'not logged'
        };
      }
    });
  }

  // Função que cria o formulário
  createForm() {
    this.contactForm = this.fb.group({
      name: ['',     // Valor inicial do campo
        [
          Validators.required,    // Campo obrigatório
          Validators.minLength(3) // Pelo menos 3 caracteres
        ]
      ],
      email: ['',    // Valor inicial do campo
        [
          Validators.required, // Campo obrigatório
          Validators.email     // Deve ser um endereço de e-mail
        ]
      ],
      subject: ['',  // Valor inicial do campo
        [
          Validators.required,    // Campo obrigatório
          Validators.minLength(5) // Pelo menos 5 caracteres
        ]
      ],
      message: ['', // Valor inicial do campo
        [
          Validators.required,      // Campo obrigatório
          Validators.minLength(5)   // Pelo menos 5 caracteres
        ]
      ]
    });
  }

  // Processa envio do formulário
  async submitForm() {

    // console.log(this.contactForm.value);

    // Se o formulário tem erros ao enviar...
    if (this.contactForm.invalid) {

      // Exibe caixa de alerta
      this.presentAlert(
        'Ooooops!',
        'Preencha todos os campos antes de enviar...',
        false
      );

      // Se formulário está ok...
    } else {

      // Formata os campos do documento do Firebase Firestore
      this.contactData = this.contactForm.value;  // Dados do formulário
      this.contactData.date = this.nowDatetime(); // Data atual já formatada
      this.contactData.status = 'recebido';       // Status do contato
      this.contactData.usermeta = this.user;      // Dados do usuário, se logado

      // console.log(this.contactData);

      // Armazena documento na coleção 'contact' do Firestore
      await addDoc(collection(this.db, 'contact'), this.contactData)

        // Se deu certo...
        .then(() => {

          // Extrai primeiro nome do remetente
          const firstName = this.contactForm.value.name.split(' ')[0];

          // Exibe caixa de alerta
          this.presentAlert(
            `Olá ${firstName}!`,
            'Seu contato foi enviado com sucesso.<br><br>Obrigado...',
            true // Força recirecionamento
          );
        })

        // Se deu errado...
        .catch(() => {

          // Exibe caixa de alerta
          this.presentAlert(
            'Ooooops!',
            'ocorreu um erro ao enviar seu contato.<br><br>Por favor, tente mais tarde...',
            false
          );
        });
    }
  }

  // Função que exibe caixa de alerta
  async presentAlert(alertHeader: string, alertMessage: string, alertRedirect: boolean) {
    const alert = await this.alertController.create({
      header: alertHeader,
      message: alertMessage,
      buttons: [{
        text: 'OK',
        handler: () => {

          // Se solicitou redirecionamento...
          if (alertRedirect) {

            // Limpar campos do formulário
            this.contactForm.markAsPristine();

            // Preenche campos 'name' e 'email' com os valores atuais
            this.contactForm.reset({
              name: this.contactForm.value.name,
              email: this.contactForm.value.email
            });

            // Redireciona para a página inicial
            this.router.navigate(['/inicio']);

            // Se não solicitou redirecionamento...
          } else {

            // Somente fecha o alert
            return true;
          }
        }
      }]
    });
    await alert.present();
  }

  // Função que gera a data atual no formato 'YYYY-MM-DD HH:II:SS'
  nowDatetime() {
    let yourDate = new Date(); // Obtém a data atual
    yourDate = new Date(yourDate.getTime() - (yourDate.getTimezoneOffset() * 60 * 1000)); // Ajusta o 'timezone'
    const dateParts = yourDate.toISOString().split('T'); // Extrai partes da data
    const timeParts = dateParts[1].split('.')[0]; // Remove timezone da hora
    return dateParts[0] + ' ' + timeParts; // Formata a data
  }
}
