import { Component, OnInit } from '@angular/core';

// Importa dependências
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  // Dados a serem armazenados na coleção 'faq'
  data = [
    {
      question: 'Por que este aplicativo é tão feio?',
      response: 'Porque o fessô enxerga muito mal.'
    },
    {
      question: 'Por que este aplicativo não é verde?',
      response: 'Porque o fessô enxerga somente o azul.'
    },
    {
      question: 'Por que este aplicativo não faz nada?',
      response: 'Porque ainda estamos fazendo.'
    },
    {
      question: 'Por que este aplicativo não funciona?',
      response: 'Porque não serve para nada mesmo.'
    },
    {
      question: 'Como cadastrar um novo documento?',
      response: 'Faça upload usando alguma ferramenta.'
    },
    {
      question: 'Como alterar o nome do documento?',
      response: 'Acesse a função que faz isso.'
    }
  ];

  // Conexão com Firebase. Observe o uso da chave de 'environment'
  app = initializeApp(environment.firebase);

  // Conexão com Firestore
  db = getFirestore();

  constructor() { }

  ngOnInit() { }

  /**
   * Função que salva os dados 'data' no banco de dados.
   * Esta função é executada pelo 'click' no botão da view.
   */
  create() {

    // Itera 'data'
    this.data.forEach(async el => {

      // Tentar armazenar cada documento (addDoc()) na coleção 'manual' (collection())
      try {
        const docRef = await addDoc(collection(this.db, 'faq'), {
          question: el.question,
          response: el.response
        });

        // Se deu certo, exibe o ID do documento no console
        console.log('Documento adicionado com o ID: ', docRef.id);

        // Se de errado...
      } catch (e) {

        // Exibe mensagem de eror no console.
        console.error('Erro ao adicionar documento: ', e);
      }

    });

  }

}
