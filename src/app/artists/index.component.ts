import {Component, OnInit} from 'angular2/core';
import {Artist}              from './artist';
import {ArtistService}       from './artist.service';
import {Observable}     from 'rxjs/Observable';

@Component({
  selector: 'artists-list',
  template: require('!jade!./index.jade')(),
 })

export class IndexComponent implements OnInit {
  constructor (private _artistService: ArtistService) {}
  errorMessage: string;
  artists:Artist[];
  ngOnInit() { this.getArtists(); }
  getArtists() {
    this._artistService.getArtists()
    .subscribe(
      artists => this.artists = artists,
      error =>  this.errorMessage = <any>error
    );
  }
  addArtist (title: string) {
    if (!title) {return;}
    this._artistService.addArtist(title)
    .subscribe(
      artist  => this.artists.push(artist),
      error =>  this.errorMessage = <any>error)
    ;
  }
}
