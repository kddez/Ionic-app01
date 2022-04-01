import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

// Importa todas as dependências necessárias
import { collection, Firestore, query, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  // Vai armazenar cada FAQ obtido
  faq: any;

  // Vai armazenar todos os FAQ obtidos para a view
  faqs: Array<any> = [];

  constructor(

    // Injeta dependências
    private afs: Firestore,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Conectar ao banco de dados e obtém todos os documentos da coleção 'faq'
    onSnapshot(query(collection(this.afs, 'faq')), (faqs) => {

      // Limpa a lista de FAQ para carregar uma nova listagem em caso de atualização.
      this.faq = [];

      // Loop que itera cada faq obtida
      faqs.docs.forEach((doc) => {

        // Armazena dados da faq na variável 'faq'
        this.faq = doc.data();

        // Também armazena o ID do documento em 'faq'
        this.faq.id = doc.id;

        // Adiciona conteúdo de 'faq' em 'faqs' para ser usado na view
        this.faqs.push(this.faq);

      });
    });
  }

  // Caixa de alerta que exibe a FAQ completa ao clicar nela.
  async showFaq(alertTitle, alertText) {
    const alert = await this.alertController.create({
      header: alertTitle,
      message: alertText,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
