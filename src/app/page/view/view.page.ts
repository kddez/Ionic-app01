import { Component, OnInit } from '@angular/core';

// Importando dependências
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

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

  // Conexão com o banco de dados
  db = getFirestore();

  // Armazena o artigo completo
  art: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    onSnapshot(doc(this.db, 'manual', this.id), (myArt) => {

      // Armazena o artigo em 'art'
      this.art = myArt.data();

      console.log(this.art);
    });

  }

}




