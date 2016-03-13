import {View, Component, OnInit, Output, EventEmitter } from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {Observable}     from 'rxjs/Observable';
import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';
import {DetailsService}       from '../services/details.service';
import {Inject} from 'angular2/core';
// import {
//   // Location,
//   // Router,
//   // RouteRegistry,
//   // RouterLink,
//   // RouterOutlet,
//   // Route,
//   RouteParams,
//   // ComponentInstruction,
//   //ROUTER_DIRECTIVES
// } from 'angular2/router';
//import {RouteParams, Router, Location, ROUTER_PROVIDERS} from 'angular2/router';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import {PaginatePipe, PaginationService, PAGINATION_DIRECTIVES, IPaginationInstance} from 'ng2-pagination';
import * as _ from 'lodash';
import * as pluralize from 'pluralize'


@Component({
  selector: 'list',
  template: require('!jade!./list.jade')(),
  styles: [require('./list.scss')],
  pipes: [PaginatePipe],
  directives: [PAGINATION_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [PaginationService, ApiService, ...ROUTER_PROVIDERS]
 })

export class MMList implements OnInit {
  constructor (
             // private _router:Router,
                //_routeParams : RouteParams,
               private _apiService: ApiService,
               private _detailsService: DetailsService
               )
  {



  }


  errorMessage: string;
  list_type: string = 'artist';
  list_type_singular: string= 'artist'
  list_uri: string = 'artists'
  list_items_owner: any
  list: any;
  current_artist: any;
  selected_item: any;
  page: number = 1;
  total_pages : number;
  total_count: number;
  page_size: number;

  // @Output() artist_details = new EventEmitter<Artist>();
  //paging_config: IPaginationInstance;
  ngOnInit() {

     //let list_type = this._routeParams
    // console.log('type', list_type)
    this.selected_item = {
      class: ['artists'],
      properties: {
        //id: 1,
        title: ''
      }
    };

    this.getList('artists',1);
    this._detailsService.update$.subscribe(object => this.onItemUpdate(object));
    this._detailsService.delete$.subscribe(object => this.onItemDelete(object));

    this._detailsService.list$.subscribe(object => this.onList(object));

  }


  find_in_list(object:any) {
    console.log('object',object);
    return _.find(this.list, function(a: any) { console.log('a',a);return a.properties.id == object.properties.id });
  }

  delete_from_list(object:any):void{
     _.remove(this.list, function(a: any) {
      return a.properties.id == object.properties.id;
         });

     console.log('LIST AFTER REMOVAL',this.list);
  }

  add_to_list(object:any):void {
    _.concat(this.list, object );
  }

  onItemUpdate(object: any) {

    this.delete_from_list(this.find_in_list(object))
    this.add_to_list(object)

  }


  onItemDelete(object: any) {
      let resource_uri = pluralize.plural(object.class[0]);
      this._apiService.req('delete', resource_uri + '/' + object.properties.id)
        .map(res => <any>res.text())
        .subscribe(
        res => this.onDeleteSuccess(res),
        err => this.onDeleteError(err),
        () => this.onDeleteCompleted()
        );
  }

   onDeleteSuccess(res) {
     this.delete_from_list(this.find_in_list(this.selected_item))
     console.log('ITEM DELETED successfully!!', res);
   }
   onDeleteError(err) {
     console.log('There was an error');
   }
   onDeleteCompleted() {
     console.log('Delete Completed');
   }


  onList(resource: any) {
    console.log('ONLIST', resource);

    this.list_uri = _.split(resource.uri, '/page', 2)[0];
    this.list_type_singular = resource.type
    this.list_type = pluralize.plural(resource.type)


    this.getList(resource.uri);

  }

  set_owner_for_list_items(){
    this.list_items_owner = _.find(this.list[0].entities, function(e: any) { return e.hasOwnProperty('properties') });
   console.log('OWNER', _.find(this.list[0].entities, function(e: any) { return e.hasOwnProperty('properties') }))
  }

  getList(resource_uri: string = 'artists', page: number = 1, page_size: number = 12, query_params : any = {}) {
    //this.list_type = list_type;
    //console.log('query_params', query_params);
    let params = _.merge({ page: page, per: page_size }, query_params)
    // /console.log('params', params);
     this._apiService.req('get', resource_uri, params)
     .map(response => <any>response.json())
    .subscribe(
      response => this.onListSuccess(response),
      error =>  this.errorMessage = <any>error
    );
  }

  onListSuccess(response: any) {
    this.list = response.entities;
    console.log('LIST SUCCESS', this.list);
    console.log('LIST SUCCESS FIRST', this.list[0]);
    this.total_pages = response.total_pages;
    this.total_count = response.total_count;
    this.page_size = response.page_size;
    this.set_owner_for_list_items();
    this.list_type = response.entities[0].class[0]
  }


  show_details(item:any) {
    this.selected_item = item;
    if (item.class[0] == 'artist') {
      this.current_artist = item
    }
    this._detailsService.show(item);
    console.log('selected in List', this.selected_item);
    //console.log('current Artist proper', this.current_artist.properties.title);
  }





}