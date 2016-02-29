import {View, Component, OnInit} from 'angular2/core';
import {Artist}              from './artist';
import {ArtistService}       from './artist.service';
import {ApiService}       from '../services/api.service';
import {Observable}     from 'rxjs/Observable';
import {Whiteframe}     from './whiteframe.component';
import * as _ from 'lodash';
//import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {PaginatePipe, PAGINATION_DIRECTIVES, PaginationService} from 'ng2-pagination';

@Component({
  selector: 'artists-list',
  template: require('!jade!./index.jade')(),
  providers: [ApiService],
  styles: [require('./artists.scss')],
  directives: [Whiteframe]
 })


export class IndexComponent implements OnInit {
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
// export class IndexComponent implements OnInit {
//   constructor (private _artistService: ArtistService) {}
//   errorMessage: string;
//   artists:Artist[];
//   ngOnInit() { this.getArtists(); }
//   getArtists() {
//     this._artistService.getArtists()
//     .subscribe(
//       artists => this.artists = artists,
//       error =>  this.errorMessage = <any>error
//     );
//   }
//   addArtist (title: string) {
//     if (!title) {return;}
//     this._artistService.addArtist(title)
//     .subscribe(
//       artist  => this.artists.push(artist),
//       error =>  this.errorMessage = <any>error)
//     ;
//   }
// }
