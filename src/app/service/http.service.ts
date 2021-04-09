import { map, catchError, tap  } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  token = '9078a7112233b96cafb6b2ff03afa4733fc5059f';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) };
  mainPageLoader = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient,private router: Router) { }

  getAllUseData(username, from_date, to_date): any {
    let body = {
      "query":
         `
        {
          user(login: "${username}") {
            name
            email
            company
            bio
            twitterUsername
            followers {
              totalCount
            }
            following {
              totalCount
            }
            contributionsCollection(from: "${from_date}", to: "${to_date}" ) {
              endedAt
              startedAt
              contributionYears
              repositoryContributions(last: 30) {
                nodes {
                  occurredAt
                  resourcePath
                  url
                  repository {
                    commitComments(last: 10) {
                      totalCount
                      nodes {
                        path
                        updatedAt
                      }
                    }
                  }
                }
                totalCount
              }
              contributionCalendar {
                colors
                totalContributions
                months {
                  name
                  year
                }
                weeks {
                  contributionDays {
                    color
                    count : contributionCount
                    date
                    weekday
                  }
                  firstDay
                }
              }
            }
            repositories(last: 30,orderBy: {field: STARGAZERS, direction: ASC}) {
              nodes {
                name
                url
                description
                forkCount
                name
                stargazerCount
                isFork
                updatedAt
                labels(last: 5) {
                  nodes {
                    name
                  }
                }
                parent {
                  resourcePath
                }
                licenseInfo {
                  name
                }
                primaryLanguage {
                  id
                  name
                }
                watchers {
                  totalCount
                }
              }
              totalCount
            }
            projects(last: 10) {
              totalCount
              nodes {
                name
                updatedAt
                columns(last: 10) {
                  nodes {
                    name
                    updatedAt
                  }
                }
              }
            }
            avatarUrl(size: 300)
            websiteUrl
            viewerIsSponsoring
            viewerIsFollowing
            viewerCanSponsor
            viewerCanFollow
            viewerCanCreateProjects
            twitterUsername
            updatedAt
                location
                login
                url
                starredRepositories {
                  totalCount
                }
                sponsorsListing {
                  name
                  fullDescription
                  shortDescription
                  activeGoal {
                    title
                    description
                  }
                }
                hasSponsorsListing
                organizations(last: 10) {
                  totalCount
                  nodes {
                    avatarUrl(size: 100)
                  }
                }
                sponsorshipsAsSponsor(last: 10) {
                  totalCount
                  nodes {
                    maintainer {
                      avatarUrl(size: 100)
                    }
                  }
                }
          }
        }
        
        `
        }
    return this.httpClient.post<any>('https://api.github.com/graphql', body, this.httpOptions)
      .pipe(
        map(value => {
          if (value) {
            return value.data.user;
          }
        }),
        (catchError(error => {
          this.router.navigateByUrl('user/not-found');
          return of({ 'errored': true, error })

        }))
      );
  }
  
  getContributionsData(username, from_date, to_date): any {
    let body = {
      "query":
         `{  
           user(login: "${username}") {
            contributionsCollection(from: "${from_date}", to: "${to_date}" ) {
              endedAt
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    color
                    count : contributionCount
                    date
                    weekday
                  }
                  firstDay
                }
              }
            }
          }
        }
        `
        }
    return this.httpClient.post<any>('https://api.github.com/graphql', body, this.httpOptions)
      .pipe(
        map(value => {
          if (value) {
            return value.data.user;
          }
        }),
        (catchError(error => {
          this.router.navigateByUrl('user/not-found');
          return of({ 'errored': true, error })

        }))
      );
  }

  getDateMonthsBefore(date,nofMonths) {
    var thisMonth = date.getMonth();
    date.setMonth(thisMonth - nofMonths);
    
    if ((thisMonth - nofMonths < 0) && (date.getMonth() != (thisMonth + nofMonths))) {
        date.setDate(0);
    } else if ((thisMonth - nofMonths >= 0) && (date.getMonth() != thisMonth - nofMonths)) {
        date.setDate(0);
    }
    return date;
}

getUsersList(): any {
  return this.httpClient.get<any>(`https://api.github.com/users`);
}

}
