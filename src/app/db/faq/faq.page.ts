import { Component, OnInit } from '@angular/core';

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

  constructor() {
    const app = initializeApp(environment.firebase);
  }

  ngOnInit() { }

  async create() {

    const db = getFirestore();

    this.data.forEach(async el => {

      try {
        const docRef = await addDoc(collection(db, 'faq'), {
          question: el.question,
          response: el.response
        });
        console.log('documento adicionado com o ID: ', docRef.id);
      } catch (e) {
        console.error('Erro ao adicionar documento: ', e);
      }

    });

  }

}
