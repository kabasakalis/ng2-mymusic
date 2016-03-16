import {View, Component, OnInit, AfterViewInit,
  AfterViewChecked} from 'angular2/core';
import {MdPatternValidator, MdMinValueValidator, MdNumberRequiredValidator, MdMaxValueValidator, MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES, Validators, FormBuilder, Control, ControlGroup, ControlArray, FORM_BINDINGS, AbstractControl} from 'angular2/common';
import {CrudService}   from '../services/crud.service';
//import {Artist}              from './album';
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
  selector: 'album-form',
  template: require('!jade!./album_form.jade')(),
  styles: [require('./form.scss')],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, SpinnerComponent],
  viewBindings: [FORM_BINDINGS],
  providers: [ApiService]
})
export class AlbumForm implements OnInit {



  album: any;
  show: Boolean = false;
  albumForm: ControlGroup;
  public spinner_active: boolean = false;
  artist: any

  form_action: number = FormAction.Create;
  new_album: any = {
    entities: [
      { class: ['artist'] },
      { class: ['tracks'] },
    ],
    properties: {

      artist_id: 1,
      title: '',
      year: ''
    },
    class: ['album']
  };



  constructor(private fb: FormBuilder, private _crudService: CrudService, private _apiService: ApiService) {
    this._crudService.edit$.subscribe(object => this.onEdit(object));
    this._crudService.create$.subscribe(object => this.onCreate(object));


    this.albumForm = fb.group({
      //'album':fb.group({
      title: [undefined, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      year: [undefined, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],

     // genre_id: [undefined, validate]
      // /albums_attributes: new ControlArray(this.ctrlAlbums)
    })

    console.log('this.FB', this.fb);
    console.log('albumForm.control');

  }

  ngOnInit() {
    //this.titleCtrl = this.albumForm.controls['album'].controls['title'];

    this.album = this.new_album;

    this._crudService.show_details$.subscribe(object => this.onObjectShow(object));
    console.log('Artist Form started')
  }

  ngAfterViewInit() {


  }
  onEdit(object: any) {
    console.log('onEFIT', object);
    if (object.class[0] == 'album') {
      this.form_action = FormAction.Update
      this.show = true;
      this.album = object as any;

    }
  }

  onCreate(object: any) {
    // this.album = null;
    // this.album = <Artist>object;
    console.log('object in CREAT ALBUM FORM', object);
    if (object.list_type == 'album') {
      console.log('ALBUM CREATED RUN')
    this.form_action = FormAction.Create
    this.artist = object.artist
    this.show = true;
    this.album = {
      entities: [
        { class: ['artist'] },
        { class: ['tracks'] },
      ],
      properties: {

        artist_id: this.artist.id,
        title: '',
        year: ''
      },
      class: ['album']
    };

  }
  }




    onObjectShow(object: any) {

       console.log('album onObjectShow in form',this.album)
       console.log('this.albumForm.value ON SELECT', this.albumForm.value)
       console.log('FORMBUILDER albumForm', this.albumForm)

    }



    handleForm(album: any) {

      console.log('album in UYPDATE', album)
      console.log('this.albumForm.value', this.albumForm.value)
      let album_payload = {
         album: this.albumForm.value
         }

      album_payload.album.artist_id=this.artist.properties.id
      console.log('album_paylod in album_form   ', album_payload);

      var uri:string;
      var action: string;
      if (this.form_action== FormAction.Create) {
        uri='albums'
        action='post'

      } else
      {
        uri = `albums/${this.album.properties.id}`
        action='put'
      }
      //var uri = `albums/${this.album.properties.id}`;
      this.spinner_active = true;
      this._apiService.req(action, uri, {}, album_payload)
         .map(response => <any>response.json())
        .subscribe(
          response => this.updateSuccess(response),
          error =>  this.updateError = <any>error
        );
    }

    updateSuccess(response: any) {
      //this.albums = response.entities;

      this.spinner_active = false;
      if (this.form_action == FormAction.Create){
        this._crudService.create_success(response)

        console.log('CREAT HANDLED');
      }else{
        this._crudService.update(response)
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


}