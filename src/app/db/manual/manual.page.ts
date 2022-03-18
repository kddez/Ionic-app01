/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';

// Importa dependências
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  // Dados a serem armazenados na coleção 'manual'
  data = [
    {
      date: '2022-03-16 15:21',
      section: 'users',
      title: 'Cadastrar-se',
      image: 'https://picsum.photos/200',
      intro: 'Como se cadastrar no |------| de forma correta.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-16 15:22',
      section: 'users',
      title: 'Entrar no aplicativo',
      image: 'https://picsum.photos/201',
      intro: 'Como se logar e acessar os recursos exclusivos.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-16 15:23',
      section: 'users',
      title: 'Sair do aplicativo',
      image: 'https://picsum.photos/202',
      intro: 'Como fazer logout do aplicativo de forma segura.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-16 15:24',
      section: 'users',
      title: 'Editar perfil',
      image: 'https://picsum.photos/199',
      intro: 'Como alterar dados do seu perfil de ususário.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-16 15:25',
      section: 'users',
      title: 'Trocar senha',
      image: 'https://picsum.photos/198',
      intro: 'Como trocar a senha e manter sua conta segura.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-16 15:26',
      section: 'users',
      title: 'Lembrar senha',
      image: 'https://picsum.photos/203',
      intro: 'Como voltar a ter acesso ao aplicativo após esquecer a senha.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-17 15:26',
      section: 'docs',
      title: 'Enviando um documento',
      image: 'https://picsum.photos/200',
      intro: 'Cmo enviar documentos novos para a plataforma.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-17 15:27',
      section: 'docs',
      title: 'Documentos suportados',
      image: 'https://picsum.photos/201',
      intro: 'Que tipos de documentos podemos armazenar na plataforma.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-17 15:28',
      section: 'docs',
      title: 'Editando metadados',
      image: 'https://picsum.photos/200',
      intro: 'Como alterar nome e outras informações sobre um documento.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-17 15:29',
      section: 'docs',
      title: 'Baixando documentos',
      image: 'https://picsum.photos/200',
      intro: 'Como acessar, ler e baixar documentos da platafoma.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-17 15:20',
      section: 'docs',
      title: 'Permissões do documento',
      image: 'https://picsum.photos/200',
      intro: 'Como compartilhar documentos com outros usuários.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
    },
    {
      date: '2022-03-17 15:31',
      section: 'docs',
      title: 'Apagando documentos',
      image: 'https://picsum.photos/200',
      intro: 'COmo apagar um documento da plataforma.',
      body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam amet quibusdam quam sed, voluptatem dolorum qui totam ut quae porro repellendus perferendis eaque et minus iure officiis ipsum. Iure, nesciunt!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, facilis. Vitae aliquam neque nesciunt eaque libero quod temporibus doloremque molestias reiciendis consequatur id quis ducimus dolor eos, totam illo ut.</p><div class="img-center"><img src="https://picsum.photos/400/300" alt="Imagem aleatória"><small>Legenda da imagem.</small></div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quaerat debitis deserunt ratione autem. Deleniti eum id corrupti, perferendis aut minima voluptatum commodi architecto accusamus tenetur, earum fugiat officia iste!</p><h4>Lista de links:</h4><ul><li><a href="http://catabits.com.br" target="_blank">Blog do fessô</a></li><li><a href="https://github.com/Luferat" target="_blank">GitHub do fessô</a></li></ul><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe porro perspiciatis provident quod atque ipsum beatae harum mollitia magnam aliquam error voluptatum inventore, earum blanditiis hic voluptatem in odit esse.</p>',
      views: '0',
      status: 'on'
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
    this.data.forEach(async (el) => {

      // Tentar armazenar cada documento (addDoc()) na coleção 'manual' (collection())
      try {
        const docRef = await addDoc(collection(this.db, 'manual'), {
          date: el.date,
          section: el.section,
          title: el.title,
          image: el.image,
          intro: el.intro,
          body: el.body,
          views: el.views,
          status: el.status
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
