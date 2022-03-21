import { Component, OnInit } from '@angular/core';

// Importa dependências
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
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

    // Injeta dependências
    private activatedRoute: ActivatedRoute,
    private route: Router
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

      // Se não foi encontrado...
    } else {

      // Volta para a lista de artigos
      this.route.navigate(['/usuarios']);
    }
  }
}
