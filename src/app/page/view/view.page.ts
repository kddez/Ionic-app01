import { Component, OnInit } from '@angular/core';

// Importa dependências
import { ActivatedRoute, Router } from '@angular/router';
import { addDoc, collection, doc, Firestore, getDoc, onSnapshot, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  // Armazena o Id do artigo vindo da rota
  public id: string;

  // Armazena o artigo completo
  art: any;

  // Armazena comentários
  comment: any;
  commentData: any;
  comments: Array<any> = [];
  commentForm: FormGroup;

  constructor(

    // Injeta dependências
    private afs: Firestore,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    public alertController: AlertController,
    private fb: FormBuilder,
    private date: DateService
  ) { }

  // 'ngOnInit()' deve ser 'async' por causa do 'await' usado logo abaixo!
  async ngOnInit() {

    // Cria formulário de comentários
    this.createForm();

    // Obtém o ID do artigo a ser exibido, da rota (URL)
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // Obtém o artigo inteiro à partir do ID deste
    const myArt = await getDoc(doc(this.afs, 'manual', this.id));

    // Se o artigo foi encontrado...
    if (myArt.exists()) {

      // Armazena o artigo em 'art'
      this.art = myArt.data();

      // Incrementa 'views' do artigo
      updateDoc(doc(this.afs, 'manual', this.id), {
        views: (parseInt(this.art.views, 10) + 1).toString()
      });

      // Conecta ao banco de dados e obtém todos os comentários deste artigo
      onSnapshot(query(
        collection(this.afs, 'comment'),
        where('article', '==', this.id),
        where('status', '==', 'on'),
        orderBy('date', 'desc')
      ), (myComments) => {

        // Limpa a lista de comentários para carregar novamente.
        this.comments = [];

        // Loop que itera cada faq obtida
        myComments.forEach((myDoc) => {

          // Armazena dados na variável 'faq'
          const myComment = myDoc.data();

          // Adiciona conteúdo de 'faq' em 'faqs' para ser usado na view
          this.comments.push(myComment);

        });

      });


      // Se não foi encontrado...
    } else {

      // Volta para a lista de artigos
      this.route.navigate(['/usuarios']);
    }

  }

  // Função que exibe caixa de alerta
  async presentAlert(alertHeader, alertMessage) {
    const alert = await this.alertController.create({
      header: alertHeader,
      message: alertMessage,
      buttons: [{
        text: 'OK',
        handler: () => {

          // Limpar campos do formulário
          this.commentForm.markAsPristine();

          // Preenche campos 'name' e 'email' com os valores atuais
          this.commentForm.reset({
            name: this.commentForm.value.name,
            email: this.commentForm.value.email
          });

          return true;

        }
      }]
    });
    await alert.present();
  }

  // Função que cria o formulário
  createForm() {
    this.commentForm = this.fb.group({
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
      comment: ['', // Valor inicial do campo
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
    if (this.commentForm.invalid) {

      // Exibe caixa de alerta
      this.presentAlert(
        'Ooooops!',
        'Preencha todos os campos antes de enviar seus comentários...'
      );

      // Se formulário está ok...
    } else {

      this.commentData = this.commentForm.value;
      this.commentData.date = this.date.brNow();
      this.commentData.status = 'on';
      this.commentData.article = this.id;

      await addDoc(collection(this.afs, 'comment'), this.commentData)
        .then(() => {
          const firstName = this.commentForm.value.name.split(' ')[0];
          this.presentAlert(
            `Olá ${firstName}!`,
            'Seu comentário foi enviado com sucesso.<br><br>Obrigado...'
          );
        })
        .catch(() => {
          this.presentAlert(
            'Ooooops!',
            'Ocorreu um erro ao enviar seu comentário.<br><br>Por favor, tente mais tarde...'
          );
        });
    }
  }

}
