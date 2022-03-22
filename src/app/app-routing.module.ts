import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Importa dependências
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

// Redireciona usuário não logado para a página de login
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['usuario/login']);

// Redireciona usuário já logado para a página home
const redirectLoggedInToItems = () => redirectLoggedInTo(['inicio']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./page/user/user.module').then(m => m.UserPageModule)
  },
  {
    path: 'documentos',
    loadChildren: () => import('./page/docs/docs.module').then(m => m.DocsPageModule)
  },
  {
    path: 'contatos',
    loadChildren: () => import('./page/contacts/contacts.module').then(m => m.ContactsPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./page/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./page/faq/faq.module').then(m => m.FaqPageModule)
  },

  /**
   * Páginas auxiliares (administrativas).
   * Não serão usadas no aplicativo.
   */
  {
    // Cria a coleção 'faq' no Firestore.
    path: 'db/faq',
    loadChildren: () => import('./db/faq/faq.module').then(m => m.FaqPageModule)
  },

  // Cria a coleção 'manual' no Firestore.
  {
    path: 'db/manual',
    loadChildren: () => import('./db/manual/manual.module').then(m => m.ManualPageModule)
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./page/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'usuario/login',
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginPageModule),

    // Somente se não estiver logado.
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }
  },
  {
    path: 'usuario/logout',
    loadChildren: () => import('./user/logout/logout.module').then(m => m.LogoutPageModule),

    // Somente se estiver logado.
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'usuario/perfil',
    loadChildren: () => import('./user/profile/profile.module').then(m => m.ProfilePageModule),

    // Somente se estiver logado.
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },

  /**
   * Oooops! Atenção!
   * Esta rota (path: '**') deve ser SEMPRE a última rota desta lista.
   * Se criar novas páginas, edite este arquivo para satisfazer a regra acima.
   */
  {
    path: '**',
    loadChildren: () => import('./page/e404/e404.module').then(m => m.E404PageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
