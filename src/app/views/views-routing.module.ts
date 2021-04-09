import { UserlistComponent } from './userlist/userlist.component';
import { UserResolveService } from './../service/user-resolve.service';
import { Notfound404Component } from './../views/notfound404/notfound404.component';
import { DashboardComponent } from './../views/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{path:'', component:UserlistComponent },
{path:'errored',component:Notfound404Component },
{path:':userid',component:DashboardComponent , resolve: { user: UserResolveService }},
{ path:'**', redirectTo:'errored',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
