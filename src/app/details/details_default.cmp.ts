import {Component} from 'angular2/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`details_default` component loaded asynchronously');

@Component({
  selector: 'details-default',
  template: require('!jade!./details_default.jade')(),
})
export class DetailsDefault {
  constructor() {

  }

  ngOnInit() {
    console.log('hello details_default cmp');
  }

}
