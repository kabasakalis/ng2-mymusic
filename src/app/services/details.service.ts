import {Injectable, EventEmitter}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Artist}           from '../artists/artist';
import {Observable}     from 'rxjs/Observable';
//import { ARTISTS } from './mock-artists';

@Injectable()
export class DetailsService {
  public show_details$: EventEmitter<any>;
  public edit$: EventEmitter<any>;
  public update$: EventEmitter<any>;
  public delete$: EventEmitter<any>;
  public list$: EventEmitter<any>;
  public create$: EventEmitter<any>;
  public create_success$: EventEmitter<any>;
  private object: Object;

  constructor() {
    this.show_details$ = new EventEmitter();
    this.edit$ = new EventEmitter();
    this.update$ = new EventEmitter();
    this.delete$ = new EventEmitter();
    this.list$ = new EventEmitter();
    this.create$ = new EventEmitter();
    this.create_success$ = new EventEmitter();
   }

   public show(object: Object): void {
     this.show_details$.next(object);
     console.log('show in DetailsService', object);
   }

   public edit(object: Object): void {
     this.edit$.next(object);
     console.log('edit in DetailsService', object);
   }

   public update(object: Object): void {
     this.update$.next(object);
     console.log('update in DetailsService', object);
   }

   public delete(object: Object): void {
     this.delete$.next(object);
     console.log('delete in DetailsService', object);
   }

   public create(object: Object): void {
     this.create$.next(object);
     console.log('create in DetailsService', object);
   }
   public create_success(object: Object): void {
     this.create_success$.next(object);
     console.log('create_success in DetailsService', object);
   }


   public list(object: Object): void {
     this.list$.next(object);
     console.log('list in DetailsService', object);
   }

   // public delete(object: any): void {
   //   //this.show_details$.next(object);
   //   console.log('object delete in DetailsService', object);
   //   console.log('object class delete in DetailsService', object.class[0]);
   // }


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


