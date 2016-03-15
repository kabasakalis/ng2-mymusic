/*
 * Angular 2 decorators and services
 */
import {Component, OnInit } from 'angular2/core';
//import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS,RouteConfig, Router, Route, AuxRoute, RouteParams} from 'angular2/router';
//import {_} from 'lodash';
import * as _ from 'lodash';
//import {pluralize} from '../../typings/browser/ambient/pluralize/pluralize'


import {FORM_PROVIDERS} from 'angular2/common';

import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {About} from './about/about.async';
import {DetailsShow} from './details/details_show.cmp';
import {ArtistForm} from './artists/artist_form.cmp';
import {GenreForm} from './artists/genre_form.cmp';
import {Artist}              from './artists/artist';
import {MMList}              from './artists/list.cmp';




/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS, MATERIAL_PROVIDERS],
  directives: [ROUTER_DIRECTIVES, RouterActive, DetailsShow, ArtistForm,GenreForm, MMList],
  pipes: [],
  styles: [require('./app.scss')],
  template: require('!jade!./app.jade')()
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/list', component: MMList, name: 'MMList' },
  // Async load a component using Webpack's require with es6-promise-loader
  { path: '/about', loader: () => require('./about/about')('About'), name: 'About' },
  { path: '/**', redirectTo: ['Home'] }
])
export class App implements OnInit {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack';
  url = 'https://twitter.com/AngularClass';



  constructor(private _router: Router) {
    // let list_type = this._routeParams.get('type');
    // console.log('type', list_type)
  }


  ngOnInit() {
    //this._router.navigate(['/Home']);
    //this._router.navigate(['/About', ['Details']]);


    // this._router.parent.navigate(['/About']);
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
