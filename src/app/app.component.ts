import { HttpService } from './service/http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GitHub';
  loader:boolean = false;
  constructor(private http : HttpService) { 
    this.http.mainPageLoader.subscribe((data)=>{
      this.loader = data;
    })
  }

}
