import { HttpService } from './../../service/http.service';
import { Component, OnInit, Input, ChangeDetectorRef, HostListener } from '@angular/core';
import { CalendarData, CalendarWeekStart, CalendarOptions, RandomDataService } from 'ng-calendar-heatmap';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  selectedTab:string = "overview";
  userProfile:any = '';
  public calendarData: any = []

  public calendarDataCustom: any = [];
  public calendarOptionsCustom: CalendarOptions;
  userData:any = '';
  @Input()
  set userData_(value: any) {
    this.userData = value;
    this.createCalendarData();
  };
  mobileView:boolean = false;
  @Input()
  set mobileViews(value: any) {
    this.mobileView = value;
  };
  contribution_year:any = "the last year";
  loaderForGetContribution:boolean = false;
  constructor(private httpService:HttpService,protected randomDataService: RandomDataService,private detectRef : ChangeDetectorRef) { 

    this.calendarOptionsCustom = {
      weekStart: CalendarWeekStart.MONDAY,
      responsive: true,
      colorRange: ['#ebedf0','#216e39'],
      staticMax: true,
      max: 10
    };

  }

  ngOnInit(): void {

  }

  getContributionByYear(year){
    let from_date = new Date(`12/30/${year}`);
    this.loaderForGetContribution = true;
    this.httpService.getContributionsData(this.userData.login,this.httpService.getDateMonthsBefore(new Date(`12/30/${year}`),11).toISOString(),from_date.toISOString()).subscribe((data)=>{
        if(data){
          this.contribution_year = year;
          this.userData.contributionsCollection.contributionCalendar = data.contributionsCollection.contributionCalendar;
          this.userData.contributionsCollection.endedAt = data.contributionsCollection.endedAt;
            this.createCalendarData();
            this.loaderForGetContribution = false;
        }
    })

  }

  createCalendarData(){
    this.calendarData = [];
    this.userData.contributionsCollection.contributionCalendar.weeks.forEach((e)=>{
      this.calendarData.push(...e.contributionDays)
  });
  }

}
