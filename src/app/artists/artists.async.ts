import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Artist}              from './artist';
import {IndexComponent} from './index.component';
//import {ShowComponent} from './show.component';
import {ArtistService}       from './artist.service';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Artists` component loaded asynchronously');

@RouteConfig([
  { path: '/', loader: () => require('./artists')('Artists'), name: 'Artists' },
  // Async load a component using Webpack's require with es6-promise-loader
  //{ path: '/show', loader: () => require('./show')('Show'), name: 'Show' },
  { path: '/**', redirectTo: ['Artists'] }
])

@Component({
  selector: 'artists',
  //template: `kabasakalis@gmail.com`
  template: require('!jade!./artists.jade')(),
  directives: [IndexComponent],
  providers: [
      HTTP_PROVIDERS,
      ArtistService,
  ]
})
export class Artists {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Artists` component');
  }

}
