import {View, Component, OnInit } from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {Observable}     from 'rxjs/Observable';
//import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';
import {DetailsService}   from '../services/details.service';
import {KeysValuesPipe}   from '../utils/keys_values.pipe';
import * as pluralize from 'pluralize'



@Component({
  selector: 'details-show',
  template: require('!jade!./details_show.jade')(),
  styles: [require('./details.scss')],
  //directives: [PaginationControlsCmp],
  //pipes: [PaginatePipe],
  directives: [],
  providers: [ApiService],
  pipes: [KeysValuesPipe]
 })

// Routing is set up with the RouteConfig decorator
// @RouteConfig([
//   { path: '/show', component: DetailsShowCmp, name: 'Home' },
//   { path: '/users/:userLogin/...', component: Users, name: 'Users' },
//   { path: '/**', redirectTo: ['Home'] }
// ])
export class DetailsShow implements OnInit {
  constructor(private _apiService: ApiService, private _detailsService: DetailsService) {

  }
  errorMessage: string;
  artists: any;
  public selected_object: any;
  public selected_object_class = '';
  //paging_config: IPaginationInstance;
  ngOnInit() {
    this._detailsService.show_details$.subscribe(object => this.onObjectShow(object));
    console.log('DetailsShow started')
    this.selected_object = {
      class: ['artist'],
      properties: {
        //id: 1,
        title: 'Select an Item From the list on the left.'
      }
    };
    this.selected_object_class = this.selected_object.class[0];
    }

  onObjectShow(object: Object) {
    this.selected_object = object
    this.selected_object_class = this.selected_object.class[0]
    console.log('object in DetailsShowCmp', object);
  }

  delete(object: any) {
    let resource_uri = pluralize.plural(object.class[0]);
    this._apiService.req('delete', resource_uri + '/' + object.properties.id)
    .map(res => <any>res.text())
    .subscribe(
      res => this.onDeleteSuccess(res),
      err => this.onDeleteError(err),
      () =>  this.onDeleteCompleted()
     );
    }

  onDeleteSuccess(res) {
    console.log('ARTIST DELETED successfully!!', res);
  }
  onDeleteError(err) {
    console.log('There was an error');
  }
  onDeleteCompleted() {
    console.log('Delete Completed');
  }

  // getArtists(page : number = 1, page_size : number = 12) {

  //    let params = { page: page, per: page_size }
  //    this._apiService.req('get', 'artists', params)
  //   .subscribe(
  //     response => this.success(response),
  //     error =>  this.errorMessage = <any>error
  //   );
  // }

  // success(response: any) {
  //   this.artists = response.entities;
  //   console.log('ARTIST', this.artists);
  //   this.total_pages = response.total_pages;
  //   this.total_count = response.total_count;
  //   this.page_size = response.page_size;
  // }

}