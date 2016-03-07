import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from 'angular2/router';
import {FORM_PROVIDERS, FORM_DIRECTIVES, Control} from 'angular2/common';
import {Http} from 'angular2/http';



import {DetailsDefault}   from './details_default.cmp';
import {DetailsShow} from './details_show.cmp';

@Component({
  selector: 'details-root',
  providers: [ FORM_PROVIDERS ],
  template: require('!jade!./details.jade')(),
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, DetailsShow, DetailsDefault],
  pipes: []
})
// Routing is set up with the RouteConfig decorator
@RouteConfig([
    { path: '/', component: DetailsDefault, name: 'DetailsDefault', useAsDefault: true },
  { path: '/show', component: DetailsShow, name: 'DetailsShow'},
  //{ path: '/**', redirectTo: ['DetailsDefault'] },
  //{ path: '/users/:userLogin/...', component: Users, name: 'Users' }
])
export class Details implements OnInit {
  // users: Array<Object> = [];
  // searchTerm: Control = new Control();

  // We want an instance of router so we can route manually
  constructor(private _router: Router) {}

  ngOnInit() {
    //this._router.navigate(['DetailsShow']);
   // this._router.parent.navigate(['/About']);
     }



  goDefault() {
    // Example of manual routing
    this._router.navigate(['DetailsDefault']);
  }
}
