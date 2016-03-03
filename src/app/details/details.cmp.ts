import {View, Component, OnInit } from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {Observable}     from 'rxjs/Observable';
//import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';



@Component({
  selector: 'selected-details',
  template: require('!jade!./details.jade')(),
 // styles: [require('./art.scss')],
  //directives: [PaginationControlsCmp],
  //pipes: [PaginatePipe],
  directives: [],
  providers: [ApiService]
 })

export class Details implements OnInit {
  constructor (private _apiService: ApiService) {}
  errorMessage: string;
  artists: any;
  selected_object: any;
  //paging_config: IPaginationInstance;
  ngOnInit() {
    console.log('Details started')
    this.selected_object = {
        id: 1,
        title: 'I am an Object'

    };
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