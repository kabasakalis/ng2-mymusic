import {View, Component, OnInit, AfterViewInit,
  AfterViewChecked} from 'angular2/core';
import {MdPatternValidator, MdMinValueValidator, MdNumberRequiredValidator, MdMaxValueValidator, MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES, Validators, FormBuilder, Control, ControlGroup, ControlArray, FORM_BINDINGS, AbstractControl} from 'angular2/common';
import {CrudService}   from '../services/crud.service';
import {SpinnerComponent} from '../utils/spinner.cmp';
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
  styles: [require('./form.scss')],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, SpinnerComponent],
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
  public spinner_active: boolean = false;
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

  constructor(private fb: FormBuilder, private _crudService: CrudService, private _apiService: ApiService) {
    this._crudService.edit$.subscribe(object => this.onEdit(object));
    this._crudService.create$.subscribe(object => this.onCreate(object));
    this.artistForm = fb.group({
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
  }

  ngOnInit() {
    this.artist = this.new_artist;
    //this._crudService.show_details$.subscribe(object => this.onObjectShow(object));
  }


  onEdit(object: any) {
    if (object.item.class[0] == 'artist') {
      this.getGenres(1, 12);
      this.form_action = FormAction.Update
      this.show = true;
      this.artist = object.item as any;
    }
  }

  onCreate(object: any) {
    this.getGenres(1, 12);
    console.log('object in ARTIST FORM', object);
    if (object.list_type == 'artist') {
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
    }
  }


  handleForm(artist: any) {
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
    this.spinner_active = true;
    this._apiService.req(action,
                          uri,
                          {},
                          artist_payload,
                          { Authorization: `Bearer ${localStorage.getItem('id_token')}` }
                          )
       .map(response => <any>response.json())
       .subscribe(
        response => this.updateSuccess(response),
        error =>  this.updateError = <any>error
      );
  }

  updateSuccess(response: any) {
    //this.artists = response.entities;

    this.spinner_active = false;
    if (this.form_action == FormAction.Create){
      this._crudService.create_success(response)
    }else{
      this._crudService.update(response)
    }
    this.show = false;
  };

  updateError(error: any) {
    console.log('Update Error', error);
  };

  getGenres(page : number = 1, page_size : number = 12) {
    let params = { page: page, per: page_size }
    this._apiService.req('get',
                         'genres',
                          params,
                          {},
                          { Authorization: `Bearer ${localStorage.getItem('id_token')}` }
                          )
    .map(response => <any>response.json())
   .subscribe(
      response => this.getGenresSuccess(response),
      error => this.getGenresError = <any>error
   );
  }

  getGenresSuccess(response: any) {
    this.genres = response.entities;
  };

   getGenresError(error: any) {
     console.log('ERROR GET GENRES', error);
   };
}