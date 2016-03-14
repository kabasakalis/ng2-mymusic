import {View, Component, OnInit, AfterViewInit,
  AfterViewChecked} from 'angular2/core';
import {MdPatternValidator, MdMinValueValidator, MdNumberRequiredValidator, MdMaxValueValidator, MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES, Validators, FormBuilder, Control, ControlGroup, ControlArray, FORM_BINDINGS, AbstractControl} from 'angular2/common';
import {DetailsService}   from '../services/details.service';
import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';
import * as _ from 'lodash';
import * as pluralize from 'pluralize'


const validate = c => {
  if (!c.value || c.value == 'undefined') {
    console.log('required');
    //return { required: true };
    return null;
  };
  return null;
}

enum FormAction {
    Create,
    Update
}

@Component({
  selector: 'artist-form',
  template: require('!jade!./artist_form.jade')(),
  styles: [require('./artist_form.scss')],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS],
  providers: [ApiService]
})
export class ArtistForm implements OnInit {


  genreControl: AbstractControl;
  artist: any;
  artist_genre: any;
  artist_albums: any;
  artist_albums_url: string
  genres: any[];
  show: Boolean = false;
  artistForm: ControlGroup;

  form_action: number = FormAction.Create;
  new_artist: any = {
    entities: [
      { class: ['genre'] },
      { class: ['albums'] }
    ],
    properties: {

      genre_id: 1,
      title: '',
      country: ''
    },
    class: ['artist']
  };



  constructor(private fb: FormBuilder, private _detailsService: DetailsService, private _apiService: ApiService) {
    // console.log('FormAction',FormAction)
    // console.log('FormAction',FormAction.Create)
    // console.log('FormAction',FormAction.Update)
    this._detailsService.edit$.subscribe(object => this.onEdit(object));
    this._detailsService.create$.subscribe(object => this.onCreate(object));


    this.artistForm = fb.group({
      //'artist':fb.group({
      title: [undefined, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      country: [undefined, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],

      genre_id: [undefined, validate]
      // /albums_attributes: new ControlArray(this.ctrlAlbums)
    })

    console.log('this.FB', this.fb);
    console.log('artistForm.control');

  }

  ngOnInit() {
    //this.titleCtrl = this.artistForm.controls['artist'].controls['title'];

    this.artist = this.new_artist;

    this.getGenres(1, 12);

    this._detailsService.show_details$.subscribe(object => this.onObjectShow(object));
    console.log('Artist Form started')
  }

  ngAfterViewInit() {


  }
  onEdit(object: any) {
    // this.artist = null;
    // this.artist = <Artist>object;
    this.form_action= FormAction.Update
    this.show = true;
    this.artist = object as any;
    let artist_albums_data = _.find(this.artist.entities, function(o) { return (o as any).class[0] == 'albums'; }) as any;

    this.artist_albums_url = (artist_albums_data != null) ? artist_albums_data.href : '';
    // console.log('artist_albums_data', artist_albums_data);
    // console.log('artist_albums_data == null', artist_albums_data == null);

    if (this.artist_albums_url != '') {
      this.getAlbums(1, 12);
    } else {
      this.artist_albums = []
    }
  }

  onCreate(object: any) {
    // this.artist = null;
    // this.artist = <Artist>object;
    this.form_action = FormAction.Create

    this.show = true;
    this.artist = {
      entities: [
        { class: ['genre'] },
        { class: ['albums'] }
      ],
      properties: {

        genre_id: 1,
        title: '',
        country: ''
      },
      class: ['artist']
    };
    //this.artist = <Artist>object;
    //let artist_albums_data = _.find(this.artist.entities, function(o) { return o.class[0] == 'albums'; })

    //this.artist_albums_url = (artist_albums_data != null) ? artist_albums_data.href : '';
    // console.log('artist_albums_data', artist_albums_data);
    // console.log('artist_albums_data == null', artist_albums_data == null);

    // if (this.artist_albums_url != '') {
    //   this.getAlbums(1, 12);
    // } else {
    //   this.artist_albums = []
    // }
  }




    onObjectShow(object: any) {

       // this.artist = <Artist>object;
       // let artist_albums_data =_.find(this.artist.entities, function(o) { return o.class[0] == 'albums'; })

       // this.artist_albums_url = (artist_albums_data != null) ? artist_albums_data.href : '';
       // // console.log('artist_albums_data', artist_albums_data);
       // // console.log('artist_albums_data == null', artist_albums_data == null);

       // if (this.artist_albums_url != ''){
       //   this.getAlbums(1, 12);
       // } else{
       //  this.artist_albums =[]
       // }

       console.log('artist onObjectShow in form',this.artist)
       console.log('this.artistForm.value ON SELECT', this.artistForm.value)
       console.log('FORMBUILDER artistForm', this.artistForm)

    }



    handleForm(artist: any) {

      console.log('artist in UYPDATE', artist)
      console.log('this.artistForm.value', this.artistForm.value)
      let artist_payload = {
         artist: this.artistForm.value
         }
      console.log('artist_paylod in artist_form   ', artist_payload);

      var uri:string;
      var action: string;
      if (this.form_action== FormAction.Create) {
        uri='artists'
        action='post'

      } else
      {
        uri = `artists/${this.artist.properties.id}`
        action='put'
      }
      //var uri = `artists/${this.artist.properties.id}`;
      this._apiService.req(action, uri, {}, artist_payload)
         .map(response => <any>response.json())
        .subscribe(
          response => this.updateSuccess(response),
          error =>  this.updateError = <any>error
        );
    }

    updateSuccess(response: any) {
      //this.artists = response.entities;


      if (this.form_action == FormAction.Create){
        this._detailsService.create_success(response)

        console.log('CREAT HANDLED');
      }else{
        this._detailsService.update(response)
        console.log('UPDATE HANDLED');

      }
      this.show = false;
      console.log('this.show', this.show)
      //this.total_pages = response.total_pages;
      //this.total_count = response.total_count;
      //this.page_size = response.page_size;
    };

    updateError(error: any) {
      console.log('ERROR UPDATE', error);
    };

   getGenres(page : number = 1, page_size : number = 12) {

      let params = { page: page, per: page_size }
      this._apiService.req('get', 'genres', params)
      .map(response => <any>response.json())
     .subscribe(
        response => this.getGenresSuccess(response),
        error => this.getGenresError = <any>error
     );
   }

   getGenresSuccess(response: any) {
     //this.artists = response.entities;
     console.log('GENRES GET SUCCESSFUL ', response);
     //this.total_pages = response.total_pages;
     //this.total_count = response.total_count;
     //this.page_size = response.page_size;
     this.genres = response.entities;
     console.log('GENRES', this.genres);
   };

   getGenresError(error: any) {
     //this.artists = response.entities;
     console.log('ERROR GET GENRES', error);
     //this.total_pages = response.total_pages;
     //this.total_count = response.total_count;
     //this.page_size = response.page_size;
   };




   getAlbums(page : number = 1, page_size : number = 12) {

      let params = { page: page, per: page_size }
      this._apiService.req('get', this.artist_albums_url, params)
      .map(response => <any>response.json())
     .subscribe(
        response => this.getAlbumsSuccess(response),
        error => this.getAlbumsError = <any>error
     );
   }

   getAlbumsSuccess(response: any) {
     //this.artists = response.entities;
     console.log('GENRES GET SUCCESSFUL ', response);
     //this.total_pages = response.total_pages;
     //this.total_count = response.total_count;
     //this.page_size = response.page_size;
     this.artist_albums = response.entities;
     console.log('artist_albums', this.artist_albums)
     console.log('ALBUMS GET SUCCESS', this.artist_albums);
   };

   getAlbumsError(error: any) {
     //this.artists = response.entities;
     console.log('ERROR GET ALBUMS', error);
     //this.total_pages = response.total_pages;
     //this.total_count = response.total_count;
     //this.page_size = response.page_size;
   };


}