import {View, Component, OnInit, Output, EventEmitter, NgZone } from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {Observable}     from 'rxjs/Observable';
//import {Artist}              from './artist';
import {ApiService}       from './services/api.service';
import {CrudService}       from './services/crud.service';
import {Inject} from 'angular2/core';
import {SpinnerComponent} from './utils/spinner.cmp';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {CanActivate} from 'angular2/router'
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
  directives: [PAGINATION_DIRECTIVES, ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES, SpinnerComponent],
  providers: [PaginationService, ...ROUTER_PROVIDERS, MATERIAL_PROVIDERS]
 })


@CanActivate(() => true )
export class MMList implements OnInit {
  constructor (
             // private _router:Router,
                //_routeParams : RouteParams,
               zone: NgZone,
               private _apiService: ApiService,
               private _crudService: CrudService
               )
  {
    this.zone = zone;


  }

  zone: NgZone;
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
  public spinner_active: boolean = true;
  initialized: boolean = false;
  user_email: string = '';



  // @Output() artist_details = new EventEmitter<Artist>();
  //paging_config: IPaginationInstance;
  ngOnInit() {

     //let list_type = this._routeParams
    // console.log('type', list_type)
    this.user_email = localStorage.getItem('user_email')
   this.initialized=true;
    this.spinner_active = true;
    this.getList('artists',1);
    this._crudService.update$.subscribe(object => this.onItemUpdate(object));
    this._crudService.delete$.subscribe(object => this.onItemDelete(object));
    this._crudService.create_success$.subscribe(object => this.onCreateSuccess(object));

    this._crudService.list$.subscribe(object => this.onList(object));

  }

    raiseCreate(object: any) {
      this._crudService.create(object);
      console.log('CREA')
      }

  find_in_list(object:any) {
    console.log('object',object);
    return _.find(this.list, function(a: any) {return a.properties.id == object.properties.id });
  }

  find_in_list_by_id(id:number) {
    console.log('id',id);
    var a = _.find(this.list, function(a: any) {
      // console.log('a.properties.id', a.properties.id);
      // console.log('EQAU', a.properties.id == id);
      return (a.properties.id == id) });

    console.log('A',a);
    return a;
  }

  delete_from_list(object:any):void{

    console.log('delete_from_list OBJECT', object);
    if (object != undefined ) {
      console.log('delete_from_list LIST BEFORE REMOVAL', this.list);
     var _list = this.list;
     _.remove(_list, function(a: any) {
      return a.properties.id == object.properties.id;
         });
      this.list = _list;
      console.log('delete_from_list _list AFTER REMOVAL', _list);
     console.log('delete_from_list LIST AFTER REMOVAL', this.list);

   }

  }

  add_to_list(object:any):void {
    //console.log('add_to_list LIST BEFORE ADD', this.list);
    this.list= _.concat(this.list, object );
    //this.list.push(object)
    //console.log('add_to_list LIST AFTER ADD', this.list);

  }

  onItemUpdate(object: any) {

    this.delete_from_list(this.find_in_list(object))
    this.add_to_list(object)

  }
  onCreateSuccess(object: any) {
      console.log('CREATE SUCCESS TRIGGR')
    this.add_to_list(object)

  }


  onItemDelete(object: any) {
    console.log('Lthis.selected_item onItemDelete', this.selected_item);
     let resource_uri = pluralize.plural(object.class[0]);
     let deleted_item = this.selected_item;
     if (this.selected_item) {  //Temporary Workaround for double trigger TODO Fix,Removal from list should move in first callback
      this.delete_from_list(this.find_in_list_by_id(this.selected_item.properties.id));
      //console.log('DELETION TRIGGERED')
      this.spinner_active =true
      this._apiService.req('delete',
                            resource_uri + '/' + object.properties.id,
                            {},
                            {},
                            { Authorization: `Bearer ${localStorage.getItem('id_token')}` }
                             )
        .map(res => <any>res.json())
        .subscribe(
        res => {
          console.log('delete_from_list should move here');
        },
        err => {

          this.onDeleteError(err)
          this.stopSpinner()
        },
        () => {
          this.onDeleteCompleted()
          this.stopSpinner()
        }
        );
     }
  }


   // onDeleteSuccess(res) {
   //   //this.delete_from_list(this.find_in_list(this.selected_item as any))

   //   let item_to_delete = this.find_in_list_by_id(res.id)
   //   console.log('item_to_delete', item_to_delete);
   //   //console.log('LIST BEFORE REMOVAL', this.list);

   //   //this.delete_from_list(item_to_delete)

   //   console.log('onDeleteSuccess LIST BEFORE REMOVAL', this.list);
   //   //this.list.splice(this.list.indexOf(item_to_delete), 1)
   //   _.remove(this.list, function(a: any) {
   //     return a.properties.id == item_to_delete.properties.id;
   //       });
   //   console.log('onDeleteSuccess LIST AFTER REMOVAL', this.list);

   //   //console.log('LIST AFTER REMOVAL', this.list);
   //   console.log('onDeleteSuccess!!', res);

   //   // this.zone.run(() => {


   //   //            });

   // }
   onDeleteError(err) {
     console.log('ERROR IN DELETE',err);
   }
   onDeleteCompleted() {
     console.log('Delete Completed');
     // console.log('LIST BEFORE REMOVAL', this.list);
     // console.log('Lthis.selected_item BEFORE REMOVAL', this.selected_item);

     // console.log('LIST AFTER REMOVAL', this.list);
    // console.log('ITEM DELETED successfully!!', res);
   }


  onList(resource: any) {
    console.log('ONLIST', resource);

    this.list_uri = _.split(resource.uri, '/page', 2)[0];
    this.list_type_singular = resource.type
    this.list_type = pluralize.plural(resource.type)


    //this.getList(resource.uri);

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

     this.spinner_active = true
     this._apiService.req('get',
                           resource_uri,
                           params,
                           {},
                           {Authorization: `Bearer ${localStorage.getItem('id_token')}`}
                           )
    .map(response => <any>response.json())
    .subscribe(
      response => {
        this.onListSuccess(response)
        this.stopSpinner()
      },
      error =>  {
        //this.errorMessage = <any>error
        console.log('list ERROR',error)
        this.stopSpinner();
      }
    );
  }

  onListSuccess(response: any) {
    this.stopSpinner()
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
    this._crudService.show(item);
    console.log('selected in List', this.selected_item);
    console.log('THIS ON SHOW_DETAILSList', this);
    //console.log('current Artist proper', this.current_artist.properties.title);
  }




     private stopSpinner() {
        this.spinner_active = false;
      }


}