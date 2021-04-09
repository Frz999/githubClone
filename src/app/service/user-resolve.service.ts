import { HttpService } from './http.service';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<any> {

  constructor(private router: Router,private http : HttpService) {

   }

   resolve(route: ActivatedRouteSnapshot):Observable<any> {
    let { userid } = route.params;
    if(!userid){
      this.router.navigateByUrl('steipete');
    }
    let from_date = new Date().toISOString();

    return this.http
      .getAllUseData(userid,this.http.getDateMonthsBefore(new Date(),11).toISOString(),from_date)
      .pipe(
        map(value => {
          this.http.mainPageLoader.next(false);
          return value;
        }),
        catchError(error => {
          this.http.mainPageLoader.next(false);
          this.router.navigateByUrl('errored');
          return EMPTY;
        })
      )
  }


}
