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
    })
  }

  ngOnInit() {
    this.album = this.new_album;
    //this._crudService.show_details$.subscribe(object => this.onObjectShow(object));
  }

  onEdit(object: any) {
    if (object.item.class[0] == 'album') {
      this.form_action = FormAction.Update
      this.artist = object.related.artist[0]
      this.show = true;
      this.album = object.item as any;
    }
  }

  onCreate(object: any) {
    if (object.list_type == 'album') {
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



  handleForm(album: any) {

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
    this._apiService.req(action,
                               uri,
                               {},
                               album_payload,
                               { Authorization: `Bearer ${localStorage.getItem('id_token')}` }
                               )
       .map(response => <any>response.json())
       .subscribe(
         response => this.updateSuccess(response),
         error =>  this.updateError = <any>error
      );
  }

  updateSuccess(response: any) {
    this.spinner_active = false;
    if (this.form_action == FormAction.Create){
      this._crudService.create_success(response)
    }else{
      this._crudService.update(response)
    }
    this.show = false;
    console.log('this.show', this.show)
  };

  updateError(error: any) {
    console.log('Update Error', error);
  };

}