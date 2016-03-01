import {View, Component, OnInit } from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {Observable}     from 'rxjs/Observable';
import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';
//import {PaginatePipe, PaginationControlsCmp, PAGINATION_DIRECTIVES, PaginationService} from 'ng2-pagination';
import {PaginatePipe, PaginationService, PAGINATION_DIRECTIVES} from 'ng2-pagination';


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
  ngOnInit() { this.getArtists(); }

  getArtists() {
      //req(_method: string, _uri: string, _params: Object, _body: Object, _headers: Object)
     this._apiService.req('get', 'artists', { 'page': '3' })
    .subscribe(
      artists => this.artists = artists.entities,
      error =>  this.errorMessage = <any>error
    );
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