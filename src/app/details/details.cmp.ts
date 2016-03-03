import {View, Component, OnInit } from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {Observable}     from 'rxjs/Observable';
//import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';
import {DetailsService}   from '../services/details.service';
import {KeysValuesPipe}   from '../utils/keys_values.pipe';



@Component({
  selector: 'selected-details',
  template: require('!jade!./details.jade')(),
 // styles: [require('./art.scss')],
  //directives: [PaginationControlsCmp],
  //pipes: [PaginatePipe],
  directives: [],
  providers: [ApiService],
  pipes: [KeysValuesPipe]
 })

export class Details implements OnInit {
  constructor(private _apiService: ApiService, private _detailsService: DetailsService) {

  }
  errorMessage: string;
  artists: any;
  public selected_object: any ={properties :{id:10, title: 'sadd'}};
  //paging_config: IPaginationInstance;
  ngOnInit() {
    this._detailsService.show_details$.subscribe(object => this.onObjectShow(object));
    console.log('Details started')
    this.selected_object = {
      properties: {
        id: 1,
        title: 'I am an Object'
      }
    };
    }

  onObjectShow(object: Object) {
    this.selected_object = object
    console.log('object in DetailsCmp', object);
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