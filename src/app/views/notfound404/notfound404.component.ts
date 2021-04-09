import { HttpService } from './../../service/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound404',
  templateUrl: './notfound404.component.html',
  styleUrls: ['./notfound404.component.scss']
})
export class Notfound404Component implements OnInit {

  constructor(private http:HttpService) {
    console.log("m here")

   }

  ngOnInit(): void {
    console.log("m here")
    this.http.mainPageLoader.next(false);
  }

}
