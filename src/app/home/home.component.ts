import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription; 

  constructor() { }

  ngOnInit() {
   /*  this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);

    }); */
    //now we build our own custom observable
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 2) {
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error('Count is > 3!'));
        }
        count++;
      }, 1000);
    });

    //here we use an operator to change the data that we will subscribe to, but we must subscribe to this,
    //therefore, we comment this out and add this statement our subscribe
    /* customIntervalObservable.pipe(map( (data: number) => {
      return 'Round: ' + (data + 1);
    })); */

    // filter will return true if data is > 0
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map( (data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
     
  }

}
