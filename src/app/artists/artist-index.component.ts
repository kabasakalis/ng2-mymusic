import {View, Component, OnInit, Output, EventEmitter } from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {Observable}     from 'rxjs/Observable';
import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';
import {DetailsService}       from '../services/details.service';
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
  constructor (
               private _apiService: ApiService,
               private _detailsService: DetailsService
               ) {}


  errorMessage: string;
  artists: any;
  selected_artist: Artist;
  page: number = 1;
  total_pages : number;
  total_count: number;
  page_size: number;

  // @Output() artist_details = new EventEmitter<Artist>();
  //paging_config: IPaginationInstance;
  ngOnInit() { this.getArtists(1); }



 //{ id: 'server', itemsPerPage: page_size, currentPage: page, totalItems: total_count }

  getArtists(page : number = 1, page_size : number = 12) {

     let params = { page: page, per: page_size }
     this._apiService.req('get', 'artists', params)
     .map(response => <any>response.json())
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


  show_details(artist:Artist) {
    this.selected_artist = artist;
    this._detailsService.show(artist);
    console.log('selected in ArtistIndex', this.selected_artist);
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