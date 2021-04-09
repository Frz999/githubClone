import { HttpService } from './../service/http.service';
import { CalendarHeatmapModule } from 'ng-calendar-heatmap';
import { ContentComponent } from './../components/content/content.component';
import { FooterComponent } from './../components/footer/footer.component';
import { HeaderComponent } from './../components/header/header.component';
import { ViewsRoutingModule } from './views-routing.module';
import { Notfound404Component } from './../views/notfound404/notfound404.component';
import { DashboardComponent } from './../views/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from './userlist/userlist.component';

@NgModule({
  declarations: [HeaderComponent,FooterComponent,DashboardComponent,Notfound404Component,ContentComponent, UserlistComponent],
  imports: [
    CommonModule,
    CalendarHeatmapModule,
    ViewsRoutingModule
    ],
  providers: [ 
    HttpService
  ]
})
export class ViewsModule { }
