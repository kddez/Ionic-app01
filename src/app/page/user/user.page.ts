import { Component, OnInit } from '@angular/core';

// Importa todas as dependências necessárias
import { initializeApp } from 'firebase/app';
import { collection, query, where, onSnapshot, getFirestore, orderBy } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  ///// Variáveis da página /////

  // Conexão com o Firebase
  app = initializeApp(environment.firebase);

  // Conexão com o banco de dados
  db = getFirestore();

  // Armazenará as páginas de manual
  manual: any;

  // Armazena todas as páginas para exibir no HTML
  manuals: Array<any> = [];

  constructor() { }

  ngOnInit() {

    // Conecta ao banco de dados e obtém todos os documentos da coleção 'manual' cujo 'section=user'
    onSnapshot(query(
      collection(this.db, 'manual'), // Conecta-se à coleção 'manual'
      where('section', '==', 'users'), // Obtem somente os documentos que atendem a este requisito
      where('status', '==', 'on'), // Somente se o 'status' for 'on'
      orderBy('date', 'desc') // Obtém os documentos ordenados pela data, da mais nova para a mais antiga
    ), (myManual) => {

      // Limpa a lista de manuais para carregar novamente.
      this.manuals = [];

      // Loop que itera cada faq obtida
      myManual.forEach((doc) => {

        // Armazena dados na variável 'faq'
        this.manual = doc.data();

        // Armazena o ID do documento em 'faq'
        this.manual.id = doc.id;

        // Adiciona conteúdo de 'faq' em 'faqs' para ser usado na view
        this.manuals.push(this.manual);

      });

    });

  }

}
