import {Injectable, EventEmitter}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Artist}           from '../artists/artist';
import {Observable}     from 'rxjs/Observable';
//import { ARTISTS } from './mock-artists';

@Injectable()
export class DetailsService {
  public show_details$: EventEmitter<any>;
  private object: Object;

  constructor() {
    this.show_details$ = new EventEmitter();
   }

   public show(object: Object): void {
     this.show_details$.next(object);
     console.log('show in DetailsService', object);
   }

  private handleError(error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

