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
import {FORM_DIRECTIVES, Validators, FormBuilder, ControlGroup, FORM_BINDINGS} from 'angular2/common';
import {DetailsService}   from '../services/details.service';
import {Artist}              from './artist';
import {ApiService}       from '../services/api.service';





@Component({
  selector: 'artist-form',
  template: require('!jade!./artist_form.jade')(),
  styles: [require('./artist_form.scss')],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS],
  providers: [ApiService]
})
export class ArtistForm implements OnInit {
  artistForm: ControlGroup;
  // artist = {


  //   : '',
  //   clientEmail: '',
  //   description: 'Nuclear Missile Defense System',
  //   rate: 500
  // };

  artist = {
    properties: {
      id: 1092,
      title: 'KOKO',
      country: '4r4r4',
    },
    class: ['artist']
  };


  constructor(private fb: FormBuilder, private _detailsService: DetailsService, private _apiService: ApiService) {

  }

  ngOnInit() {

    this.artistForm = this.fb.group({
      'title': [this.artist.properties.title, Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],

      'country': [this.artist.properties.country, Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      // 'clientEmail': ['', Validators.compose([
      //   MdPatternValidator.inline('^.+@.+\..+$'),
      //   Validators.required,
      //   Validators.minLength(10),
      //   Validators.maxLength(100)
      // ])],
      // 'rate': ['', Validators.compose([
      //   MdNumberRequiredValidator.inline(),
      //   MdPatternValidator.inline('^1234$'),
      //   MdMinValueValidator.inline(800),
      //   MdMaxValueValidator.inline(4999)
      // ])]
    });




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


    onObjectShow(object: any) {

      // console.log('object', object)

       this.artist = <Artist>object;

       this.artistForm.value = { title: this.artist.properties.title,country:this.artist.properties.country }

       this.artistForm.touched = true
       this.artistForm.untouched = false
       this.artistForm.dirty = true
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
      artist_payload.artist.albums_attributes = [{title: 'testAlbum',year: '1921'}];
      artist_payload.artist.genre_attributes = {title: 'GNREEEE'};

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
}