import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ViewsModule } from './views/views.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{
  path: '', loadChildren: () => import('./views/views.module').then(M => M.ViewsModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
