import {View, Component, OnInit, AfterViewInit,
  AfterViewChecked} from 'angular2/core';
import {MdPatternValidator, MdMinValueValidator, MdNumberRequiredValidator, MdMaxValueValidator, MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES, Validators, FormBuilder, Control, ControlGroup, ControlArray, FORM_BINDINGS, AbstractControl} from 'angular2/common';
import {CrudService}   from '../services/crud.service';
//import {Artist}              from './track';
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
  selector: 'track-form',
  template: require('!jade!./track_form.jade')(),
  styles: [require('./form.scss')],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, SpinnerComponent],
  viewBindings: [FORM_BINDINGS],
  providers: [ApiService]
})
export class TrackForm implements OnInit {



  track: any;
  show: Boolean = false;
  trackForm: ControlGroup;
  public spinner_active: boolean = false;
  album: any

  form_action: number = FormAction.Create;
  new_track: any = {
    entities: [
      { class: ['album'] }
    ],
    properties: {

      album_id: 1,
      title: '',
      year: ''
    },
    class: ['track']
  };



  constructor(private fb: FormBuilder, private _crudService: CrudService, private _apiService: ApiService) {
    this._crudService.edit$.subscribe(object => this.onEdit(object));
    this._crudService.create$.subscribe(object => this.onCreate(object));


    this.trackForm = fb.group({
      //'track':fb.group({
      title: [undefined, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      time: [undefined, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],

      // genre_id: [undefined, validate]
      // /tracks_attributes: new ControlArray(this.ctrlAlbums)
    })

    console.log('this.FB', this.fb);
    console.log('trackForm.control');

  }

  ngOnInit() {
    //this.titleCtrl = this.trackForm.controls['track'].controls['title'];

    this.track = this.new_track;

    this._crudService.show_details$.subscribe(object => this.onObjectShow(object));
    console.log('Track Form started')
  }

  ngAfterViewInit() {


  }
  onEdit(object: any) {
    console.log('onEFIT TRACK', object);
    if (object.item.class[0] == 'track') {
      this.form_action = FormAction.Update
      this.album = object.related.album[0]
      this.show = true;
      this.track = object.item as any;

    }
  }

  onCreate(object: any) {
    // this.track = null;
    // this.track = <Artist>object;
    console.log('object in TRACK FORM', object);
    if (object.list_type == 'track') {
      console.log('ALBUM CREATED RUN')
      this.form_action = FormAction.Create
      this.album = object.album
      this.show = true;
      this.track = {
        entities: [
          { class: ['album'] },
        ],
        properties: {

          album_id: this.album.properties.id,
          title: '',
          time: ''
        },
        class: ['track']
      };

    }
  }




  onObjectShow(object: any) {

    console.log('track onObjectShow in form', this.track)
    console.log('this.trackForm.value ON SELECT', this.trackForm.value)
    console.log('FORMBUILDER trackForm', this.trackForm)

  }



  handleForm(track: any) {

    console.log('track in UYPDATE', track)
    console.log('this.trackForm.value', this.trackForm.value)
    let track_payload = {
      track: this.trackForm.value
    }

    track_payload.track.album_id = this.album.properties.id
    console.log('track_paylod in track_form   ', track_payload);

    var uri: string;
    var action: string;
    if (this.form_action == FormAction.Create) {
      uri = 'tracks'
      action = 'post'

    } else {
      uri = `tracks/${this.track.properties.id}`
      action = 'put'
    }
    //var uri = `tracks/${this.track.properties.id}`;
    this.spinner_active = true;
    this._apiService.req(action,
                                uri,
                                {},
                                track_payload,
                                { Authorization: `Bearer ${localStorage.getItem('id_token')}` }
                                )
      .map(response => <any>response.json())
      .subscribe(
      response => this.updateSuccess(response),
      error => this.updateError = <any>error
      );
  }

  updateSuccess(response: any) {
    //this.tracks = response.entities;

    this.spinner_active = false;
    if (this.form_action == FormAction.Create) {
      this._crudService.create_success(response)

      console.log('CREAT HANDLED');
    } else {
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