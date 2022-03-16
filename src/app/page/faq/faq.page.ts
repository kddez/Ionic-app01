import { Component, OnInit } from '@angular/core';

// Importa todas as bibliotecas necessárias
import { initializeApp } from 'firebase/app';
import { collection, query, where, onSnapshot, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  ///// Variáveis da página /////

  // Conexão com o Firebase
  app = initializeApp(environment.firebase);

  // Conexão com o banco de dados
  db = getFirestore();

  // Vai armazenar cada FAQ obtido
  faq: any;

  // Vai armazenar todos os FAQ obtidos para a view
  faqs: Array<any> = [];

  constructor() { }

  ngOnInit() {

    // Conectar ao banco de dados e obtém todos os documentos da coleção 'faq'
    onSnapshot(query(collection(this.db, 'faq')), (myFaqs) => {

      // Limpa a lista de FAQ para carregar novamente.
      this.faq = [];

      // Loop que itera cada faq obtida
      myFaqs.forEach((doc) => {

        this.faq = doc.data();
        this.faq.id = doc.id;
        this.faqs.push(this.faq);

      });

      console.log(this.faqs);
    });

  }

}
