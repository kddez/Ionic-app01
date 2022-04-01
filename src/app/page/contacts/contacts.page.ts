import { Component, OnInit } from '@angular/core';

// Importa dependências
import { FormBuilder, FormGroup, Validators } from '@angular/forms';   // Classes do Reactive forms
import { Router } from '@angular/router';                              // Roteamento
import { AlertController } from '@ionic/angular';                      // Caixa de alerta do Ionic
import { addDoc, collection } from 'firebase/firestore'; // Firestore
import { Firestore } from '@angular/fire/firestore';
import { DateService } from '../../services/date.service';

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
  user: any;

  constructor(

    // Injeta dependências
    private fb: FormBuilder,                  // Objeto do formulário
    private alertController: AlertController, // Objeto da caixa de alerta
    private router: Router,                    // Objeto que faz redirecionamento de rota
    private afs: Firestore,
    private date: DateService
  ) { }

  ngOnInit() {

    // Cria formulário
    this.createForm();

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
      this.contactData.date = this.date.brNow(); // Data atual já formatada
      this.contactData.status = 'recebido';       // Status do contato

      // Armazena documento na coleção 'contact' do Firestore
      await addDoc(collection(this.afs, 'contact'), this.contactData)

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
  async presentAlert(alertHeader, alertMessage, alertRedirect) {
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


  goSocial(social) {

    let url = '';

    switch (social) {
      case 'github':
        url = 'https://github.com/Luferat';
        break;


    }

  }

}
