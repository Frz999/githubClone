import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  mobileView:boolean = false;
  @Input()
  set mobileViews(value) {
    this.mobileView = value;
  };
  constructor() { }

  ngOnInit(): void {
  }

}
