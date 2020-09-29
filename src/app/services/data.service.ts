import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
// @ts-ignore
import any = jasmine.any;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // @ts-ignore
  dataSource  = new Subject();
  // dataShare = this.dataSource.asObservable();

  constructor() {
  }

  addData(data): any {
    console.log(data);
    this.dataSource.next(data);
  }

}
