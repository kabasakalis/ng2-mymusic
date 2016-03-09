import {View, Component, OnInit} from 'angular2/core';
//our root app component
// import {
//   Component,
//   View,
//   FORM_BINDINGS,
//   FORM_DIRECTIVES,
//   ControlGroup,
//   FormBuilder,
//   Validators,
//   OnInit
// } from 'angular2/core'
import {MdPatternValidator, MdMinValueValidator, MdNumberRequiredValidator, MdMaxValueValidator, MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES, Validators, FormBuilder, Control, ControlGroup, ControlArray, FORM_BINDINGS, AbstractControl} from 'angular2/common';
import {DetailsService}   from '../services/details.service';
import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';
import * as _ from 'lodash';


const validate = c => {
  if (!c.value || c.value == 'undefined') {
    console.log('required');
    //return { required: true };
    return null;
  };
  return null;
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
  artist: Artist;
  // artist:Artist = {
  //   entities: [],
  //   properties: {
  //     id: 1092,
  //     genre_id: 7,
  //     title: 'KOKO',
  //     country: '4r4r4'
  //   },
  //   class: ['artist']
  // };

  artist_genre: any;
  artist_albums: any;
  artist_albums_url : string
  genres: any[];

  artistForm: ControlGroup;
  ctrlAlbums: Control[] = [
    new Control(''),
    new Control(''),
    new Control('')
  ];
  //titleCtrl: Control;
  titleCtrl: Control = new Control('', Validators.compose([
    Validators.required,
    Validators.maxLength(20)
  ]));
  countryCtrl: Control = new Control('', Validators.compose([
    Validators.required,
    Validators.maxLength(20)
  ]));
  genre_idCtrl: Control = new Control('', Validators.compose([
    Validators.required
  ]));


  constructor(private fb: FormBuilder, private _detailsService: DetailsService, private _apiService: ApiService) {



    this.artistForm = fb.group({
      //'artist':fb.group({
        title: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(30)
        ])],
        country: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(30)
        ])],

        genre_id: [undefined, validate],
        'albums_attributes': new ControlArray(this.ctrlAlbums)
      })
    //})
    ;

    this.genreControl = this.artistForm.controls['genre_id'];

  }

  ngOnInit() {
    //this.titleCtrl = this.artistForm.controls['artist'].controls['title'];
    this.artist = {
      entities: [
        { class: ['genre'] },
        { class: ['albums'] }
      ],
      properties: {

        id: 1092,
        genre_id: 3,
        title: 'KOKO',
        country: '4r4r4'
      },
      class: ['artist']
    };

    this.getGenres(1, 12);

  // this.artistForm= new ControlGroup({
  //   //'artist': new ControlGroup({
  //     'title': this.titleCtrl,
  //     'country': this.countryCtrl,
  //     //'genre_id': [undefined, validate],
  //     'albums_attributes': new ControlArray(this.ctrlAlbums)
  //   //})
  // });


    console.log('this.FB',this.fb);
    console.log('artistForm.control');



    this._detailsService.show_details$.subscribe(object => this.onObjectShow(object));
    console.log('Artist Form started')
    // this.selected_object = {
    //   class: ['artist'],
    //   properties: {
    //     //id: 1,
    //     title: 'Select an Item From the list on the left.'
    //   }
    // };
    // this.selected_object_class = this.selected_object.class[0];


    }


    // onGenreChange(value:string):void{
    //    console.log('genre_changed',value);
    //  }

    onObjectShow(object: any) {

       this.artist = <Artist>object;
       let artist_albums_data =_.find(this.artist.entities, function(o) { return o.class[0] == 'albums'; })

       this.artist_albums_url = (artist_albums_data != null) ? artist_albums_data.href : '';
       // console.log('artist_albums_data', artist_albums_data);
       // console.log('artist_albums_data == null', artist_albums_data == null);

       if (this.artist_albums_url != ''){
         this.getAlbums(1, 12);
       } else{
        this.artist_albums =[]
       }

       console.log('artist onObjectShow in form',this.artist)
       console.log('this.artistForm.value ON SELECT', this.artistForm.value)
       console.log('FORMBUILDER artistForm', this.artistForm)

    }

    update(artist: Artist) {
      // this.selected_object = object
      // this.selected_object_class = this.selected_object.class[0]


      console.log('artist in UYPDATE', artist)
      console.log('this.artistForm.value', this.artistForm.value)
      let artist_payload = {
         artist: this.artistForm.value
         }
      //artist_payload.artist.id=this.artist.properties.id;
      //artist_payload.artist.albums_attributes = [{title: 'fgtestAlbum',year: 'dfdfff1921'}];
      //artist_payload.artist.genre_attributes = {title: 'GNREEEE'};

      console.log('artist_paylod in artist_form   ', artist_payload);

      var uri = `artists/${this.artist.properties.id}`;
      this._apiService.req('put', uri, {}, artist_payload)
         .map(response => <any>response.json())
        .subscribe(
          response => this.updateSuccess(response),
          error =>  this.updateError = <any>error
        );


    }

    updateSuccess(response: any) {
      //this.artists = response.entities;
      console.log('SUCCESSFUL UPDATE', response);
      //this.total_pages = response.total_pages;
      //this.total_count = response.total_count;
      //this.page_size = response.page_size;
    };

    updateError(error: any) {
      //this.artists = response.entities;
      console.log('ERROR UPDATE', error);
      //this.total_pages = response.total_pages;
      //this.total_count = response.total_count;
      //this.page_size = response.page_size;
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