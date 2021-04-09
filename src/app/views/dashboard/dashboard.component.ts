import { HttpService } from './../../service/http.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allUserData:any = '';
  mobileView:boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    ) { 

      if(Number(window.screen.width) < 888){
        this.mobileView = true;
      }

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.allUserData = data.user;
    });
  }

  @HostListener("window:resize", ['$event'])
  onResize(event) {
   if(Number(event.target.innerWidth) < 888){
     this.mobileView = true;
   }else{
     this.mobileView = false;
   }
 }

}
