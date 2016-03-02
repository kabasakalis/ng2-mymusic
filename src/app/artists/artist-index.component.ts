import {View, Component, OnInit } from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {Observable}     from 'rxjs/Observable';
import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';
//import {PaginatePipe, PaginationControlsCmp, PAGINATION_DIRECTIVES, PaginationService} from 'ng2-pagination';
import {PaginatePipe, PaginationService, PAGINATION_DIRECTIVES, IPaginationInstance} from 'ng2-pagination';


@Component({
  selector: 'artist-index',
  template: require('!jade!./artist-index.jade')(),
  styles: [require('./artist-index.scss')],
  //directives: [PaginationControlsCmp],
  pipes: [PaginatePipe],
  directives: [PAGINATION_DIRECTIVES],
  providers: [PaginationService, ApiService]
 })

export class ArtistIndex implements OnInit {
  constructor (private _apiService: ApiService) {}
  errorMessage: string;
  artists: any;
  page: number = 1;
  total_pages : number;
  total_count: number;
  page_size: number;
  ngOnInit() { this.getArtists(1); }

 public config: IPaginationInstance = {
         id: 'custom',
         itemsPerPage: 12,
         currentPage: 1,
         totalItems: 64
     };


 //{ id: 'server', itemsPerPage: page_size, currentPage: page, totalItems: total_count }

  getArtists(page : number = 1, page_size : number = 12) {

     let params = { page: page, per: page_size }
     this._apiService.req('get', 'artists', params)
    .subscribe(
      response => this.success(response),
      error =>  this.errorMessage = <any>error
    );
  }

  success(response: any) {
    this.artists = response.entities;
    console.log('ARTIST', this.artists);
    this.total_pages = response.total_pages;
    this.total_count = response.total_count;
    this.page_size = response.page_size;
  }


  // addArtist (title: string) {
  //   if (!title) {return;}
  //   this._artistService.addArtist(title)
  //   .subscribe(
  //     artist  => this.artists.push(artist),
  //     error =>  this.errorMessage = <any>error)
  //   ;
  // }
}