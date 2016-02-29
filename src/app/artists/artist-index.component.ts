import {View, Component, OnInit } from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {Observable}     from 'rxjs/Observable';
import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';
import {PaginatePipe, PAGINATION_DIRECTIVES, PaginationService} from 'ng2-pagination';


@Component({
  selector: 'artist-index',
  template: require('!jade!./artist-index.jade')(),
  styles: [require('./artist-index.scss')],
  providers: [ApiService]
  //directives: [MATERIAL_DIRECTIVES]
 })

export class ArtistIndex implements OnInit {
  constructor (private _apiService: ApiService) {}
  errorMessage: string;
  artists: any;
  ngOnInit() { this.getArtists(); }

  getArtists() {

    this._apiService.get('artists')
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