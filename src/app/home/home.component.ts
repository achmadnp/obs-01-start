import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // private firstObsSubscription: Subscription;
  private countObs: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    // .create() is deprecated
    // const customIntervalObservable = Observable.create((observer) => {
    //   let count = 0;
    //   setInterval(() => {
    //     observer.next(count);

    //     if (count === 2) {
    //       observer.complete();
    //     }

    //     // Fake error (error handling practice)
    //     if (count === 3) {
    //       observer.error(new Error('Count is 2!'));
    //     }
    //     count++;
    //   }, 1000);
    // });

    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count === 2) {
          observer.complete();
        }

        // Fake error (error handling practice)
        if (count === 3) {
          observer.error(new Error('Count is 2!'));
        }
        count++;
      }, 1000);
    });

    // customIntervalObservable.pipe(
    //   map((data: number) => {
    //     return 'Round: ' + (data + 1);
    //   })
    // );

    this.countObs = customIntervalObservable
      .pipe(
        filter((data: number) => {
          return data > 0;
        }),
        map((data: number) => {
          return 'Round: ' + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        // if obs complete, this will be called
        // wont get called in case of error
        () => {
          console.log('Completed!');
        }
      );
  }

  ngOnDestroy(): void {
    // this.firstObsSubscription.unsubscribe();
    this.countObs.unsubscribe();
  }
}
