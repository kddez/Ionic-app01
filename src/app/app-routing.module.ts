import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'xp',
    loadChildren: () => import('./pages/xp/xp.module').then( m => m.XpPageModule)
  },
  {
    path: 'skills',
    loadChildren: () => import('./pages/skills/skills.module').then( m => m.SkillsPageModule)
  },
  {
    path: 'schools',
    loadChildren: () => import('./pages/schools/schools.module').then( m => m.SchoolsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
