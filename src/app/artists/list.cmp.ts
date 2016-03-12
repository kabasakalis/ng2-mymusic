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
  list_type: string = 'artists';
  list_uri: string
  list: any;
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

  // onSuccessfulArtistDelete(object: any) {

  //   if (object.class[0] == 'artist') {

  //    let artist_to_delete:any= _.find(this.list, function(a:any) { return a.properties.id == object.properties.id });
  //    _.remove(this.list, function(a:Artist) {
  //      a.properties.id == artist_to_delete.properties.id;
  //    });
  //   }
  //   console.log('onArtistDelete', object);
  // }


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
    this.list_uri = resource.uri
    this.list_type = resource.type
    this.getList(resource.uri);

  }

  getList(resource_uri: string = 'artists', page: number = 1, page_size: number = 12) {
    //this.list_type = list_type;
     let params = { page: page, per: page_size }
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
    this.total_pages = response.total_pages;
    this.total_count = response.total_count;
    this.page_size = response.page_size;
  }


  show_details(artist:Artist) {
    this.selected_item = artist;
    this._detailsService.show(artist);
    console.log('selected in ArtistIndex', this.selected_item);
  }





}