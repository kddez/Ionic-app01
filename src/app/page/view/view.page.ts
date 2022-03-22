import { Component, OnInit } from '@angular/core';

// Importa dependências
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, addDoc } from 'firebase/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  // Armazena o Id do artigo vindo da rota
  public id: string;

  // Conexão com o Firebase
  app = initializeApp(environment.firebase);

  // Conexão com o banco de dadosKw
  db = getFirestore();

  // Armazena o artigo completo
  art: any;

  // Variável que armazena dados do usuário logado
  userData: any;

  // Armazena comentários
  comment = '';
  comments: Array<any> = [];

  constructor(

    // Injeta dependências
    private activatedRoute: ActivatedRoute,
    private route: Router,
    public auth: AngularFireAuth,
    public alertController: AlertController
  ) { }

  // 'ngOnInit()' deve ser 'async' por causa do 'await' usado logo abaixo!
  async ngOnInit() {

    // Obtém o ID do artigo a ser exibido, da rota (URL)
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // Obtém o artigo inteiro à partir do ID deste
    const myArt = await getDoc(doc(this.db, 'manual', this.id));

    // Se o artigo foi encontrado...
    if (myArt.exists()) {

      // Armazena o artigo em 'art'
      this.art = myArt.data();

      // Incrementa 'views' do artigo
      updateDoc(doc(this.db, 'manual', this.id), {
        views: (parseInt(this.art.views, 10) + 1).toString()
      });

      // Conecta ao banco de dados e obtém todos os comentários deste artigo
      onSnapshot(query(
        collection(this.db, 'comment'),
        where('article', '==', this.id),
        where('status', '==', 'on'),
        orderBy('date', 'desc')
      ), (myComments) => {

        // Limpa a lista de manuais para carregar novamente.
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

    // Verifica se tem usuario logado
    this.auth.authState.subscribe(user => {
      if (user) {

        // Armazena os dados do usuário em 'this.user'
        this.userData = user;

        console.log(this.userData, this.auth.user);
      }
    });

  }

  // Salva comentários no banco de dados
  async sendComment() {

    /**
     * Sanitiza comentário, se necessário
     * Retirado do 'MyDocsApp' original:
     *     https://github.com/Luferat/MyDocsApp/blob/20220119_01/global.js
     */
    this.comment = this.comment.replace(/<[^>]*>?/gm, '');
    this.comment = this.comment.replace(/\n/g, '<br>').trim();
    this.comment = this.comment.trim();

    // Se existe comentário...
    if (this.comment !== '') {

      /**
       * Data de hoje, formatada.
       * Retirado do 'MyDocsApp' original:
       *     https://github.com/Luferat/MyDocsApp/blob/20220119_01/global.js
       */
      const yourDate = new Date();
      const now = yourDate.toISOString().replace('T', ' ').split('.')[0];

      // Formata dados para salvar no database
      const commentData = {
        name: this.userData.displayName, // Nome do comentarista
        email: this.userData.email, // E-mail do comentarista
        photo: this.userData.photoURL, // Foto do comentarista
        uid: this.userData.uid, // ID do comentarista
        date: now, // Data atual (UTC)
        article: this.id, // ID do artigo que esta sendo comentado
        comment: this.comment, // Comentário
        status: 'on' // Status do comentário
      };

      // Tenta armazenar o comentário em um novo documento da coleção 'comment'
      try {
        const docRef = await addDoc(collection(this.db, 'comment'), commentData);

        // Se deu certo, exibe alerta para o usuário
        this.presentAlert();

        // Limpa o campo para um novo comentário
        this.comment = '';

        // Se de errado...
      } catch (e) {

        // Exibe mensagem de erro no console.
        console.error('Erro ao adicionar documento: ', e);
      }

    } else {

      // Se não existe comentário, sai sem fazer nada.
      return false;
    }
  }

  // Caixa de alerta --> https://ionicframework.com/docs/api/alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Oba!',
      message: 'Seu comentário foi enviado com sucesso.',
      buttons: ['Ok']
    });
    await alert.present();
  }

}
