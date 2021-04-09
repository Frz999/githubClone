import { Router } from '@angular/router';
import { HttpService } from './../../service/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  userList = [];
  constructor(private http:HttpService,private router: Router) { }

  ngOnInit(): void {
    this.http.getUsersList().subscribe((data)=>{
      if(data){
        this.userList = data;
      }
    })

  }

  selectUser(user) {
    this.router.navigateByUrl(`/${user}`);
  }

}
