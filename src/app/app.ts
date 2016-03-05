/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
//import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {ROUTER_DIRECTIVES, RouteConfig, Router, Route, AuxRoute} from 'angular2/router';
//import {_} from 'lodash';
import * as _ from 'lodash';
//import {pluralize} from '../../typings/browser/ambient/pluralize/pluralize'


import {FORM_PROVIDERS} from 'angular2/common';

// import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {About} from './about/about.async';
import {Details} from './details/details.cmp';
import {Artist}              from './artists/artist';
import {Artists}              from './artists/artists';





//import {Artist}              from './artist';
//import {ApiService}       from './services/api.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES, RouterActive],
  pipes: [],
  styles: [require('./app.scss')],
  template: require('!jade!./app.jade')()
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/artists', loader: () => require('./artists/artists')('Artists'), name: 'Artists' },
  // Async load a component using Webpack's require with es6-promise-loader
  { path: '/about', loader: () => require('./about/about')('About'), name: 'About' },
  //{ path: '/details/...', component: Details, name: 'Details' },
   //new AuxRoute({ path: '/details', component: Details, name: 'Details' }),
   { path: '/details',aux: 'detailz', component: Details, name: 'Details' },
  //new AuxRoute({ path: '/about', component: About, name: 'About' }),
  { path: '/**', redirectTo: ['Home'] }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack';
  url = 'https://twitter.com/AngularClass';
  constructor() {
    // _details.selected_object = {
    //        id: 2,
    //        title: 'I am an Object from APP'

    //    };


  }

  // show(artist: Artist) {
  //   console.log('ARTIST IN APP', artist)
  // }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
