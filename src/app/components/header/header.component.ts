import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userData: any = "";
  mobileView:boolean = false;
  @Input()
  set mobileViews(value) {
    this.mobileView = value;
  };
  constructor() { }

  ngOnInit(): void {
  }

}
