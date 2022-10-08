import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageListComponent } from './components/page-list/page-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageComponent } from './components/page/page.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PageListComponent
      },
      {
        path: 'title/:title',
        component: PageComponent
      },
      {
        path: 'tag/:tag',
        component: PageListComponent
      },
      {
        path: 'title',
        redirectTo: ''
      },
      {
        path: 'tag',
        redirectTo: ''
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
