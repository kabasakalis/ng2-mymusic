import {View, Component, OnInit, Output, EventEmitter } from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {Observable}     from 'rxjs/Observable';
import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';
import {DetailsService}       from '../services/details.service';
//import {PaginatePipe, PaginationControlsCmp, PAGINATION_DIRECTIVES, PaginationService} from 'ng2-pagination';
import {PaginatePipe, PaginationService, PAGINATION_DIRECTIVES, IPaginationInstance} from 'ng2-pagination';
import * as _ from 'lodash';
import * as pluralize from 'pluralize'


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
               )
  {



  }


  errorMessage: string;
  artists: any;
  selected_artist: Artist;
  page: number = 1;
  total_pages : number;
  total_count: number;
  page_size: number;

  // @Output() artist_details = new EventEmitter<Artist>();
  //paging_config: IPaginationInstance;
  ngOnInit() {
    this.getArtists(1);
    this._detailsService.update$.subscribe(object => this.onArtistUpdate(object));
    this._detailsService.delete$.subscribe(object => this.delete(object));


  }


  find_in_list(object:any) {
    console.log('object',object);
    return _.find(this.artists, function(a: any) { console.log('a',a);return a.properties.id == object.properties.id });
  }

  delete_from_list(object:any):void{
     _.remove(this.artists, function(a: any) {
      return a.properties.id == object.properties.id;
         });

     console.log('LIST AFTER REMOVAL',this.artists);
  }

  add_to_list(object:any):void {
    _.concat(this.artists, object );
  }

  onArtistUpdate(object: any) {

    this.delete_from_list(this.find_in_list(object))
    this.add_to_list(object)

  }

  onSuccessfulArtistDelete(object: any) {

    if (object.class[0] == 'artist') {

     let artist_to_delete:any= _.find(this.artists, function(a:any) { return a.properties.id == object.properties.id });
     _.remove(this.artists, function(a:Artist) {
       a.properties.id == artist_to_delete.properties.id;
     });
    }
    console.log('onArtistDelete', object);
  }


  delete(object: any) {
    // this.artist = null;
    // this.artist = <Artist>object;
    //if (object.class[0] == this.selected_artist.class[0]) {
      let resource_uri = pluralize.plural(object.class[0]);
      this._apiService.req('delete', resource_uri + '/' + object.properties.id)
        .map(res => <any>res.text())
        .subscribe(
        res => this.onDeleteSuccess(res),
        err => this.onDeleteError(err),
        () => this.onDeleteCompleted()
        );

    //}

  }

   onDeleteSuccess(res) {
     this.delete_from_list(this.find_in_list(this.selected_artist))
     console.log('ARTIST DELETED successfully!!', res);
   }
   onDeleteError(err) {
     console.log('There was an error');
   }
   onDeleteCompleted() {
     console.log('Delete Completed');
   }

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