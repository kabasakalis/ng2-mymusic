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
  selector: 'genre-form',
  template: require('!jade!./genre_form.jade')(),
  styles: [require('./form.scss')],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, SpinnerComponent],
  viewBindings: [FORM_BINDINGS],
  providers: [ApiService]
})
export class GenreForm implements OnInit {
  genre: any;
  //genres: any[];
  show: Boolean = false;
  genreForm: ControlGroup;
  public spinner_active: boolean = false;

  form_action: number = FormAction.Create;
  new_genre: any = {
    entities: [
      { class: ['artists'] },
    ],
    properties: {

      title: '',
    },
    class: ['genre']
  };



  constructor(private fb: FormBuilder, private _crudService: CrudService, private _apiService: ApiService) {
    this._crudService.edit$.subscribe(object => this.onEdit(object));
    this._crudService.create$.subscribe(object => this.onCreate(object));
    this.genreForm = fb.group({
      //'genre':fb.group({
      title: [undefined, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])]
    })
  }

  ngOnInit() {
    this.genre = this.new_genre;
    //this._crudService.show_details$.subscribe(object => this.onObjectShow(object));
  }


  onEdit(object: any) {
    if (object.item.class[0] == 'genre') {
    this.form_action= FormAction.Update
    this.show = true;
    this.genre = object.item as any;
  }
  }

  onCreate(object: any) {
    if (object.list_type == 'genre') {
    this.form_action = FormAction.Create
    this.show = true;
    this.genre = {
      entities: [
        { class: ['artists'] },
      ],
      properties: {

        title: '',
      },
      class: ['genre']
    };
  }
  }


  handleForm(genre: any) {

    console.log('genre in UYPDATE', genre)
    console.log('this.genreForm.value', this.genreForm.value)
    let genre_payload = {
       genre: this.genreForm.value
       }
    console.log('genre_paylod in genre_form   ', genre_payload);

    var uri:string;
    var action: string;
    if (this.form_action== FormAction.Create) {
      uri='genres'
      action='post'

    } else
    {
      uri = `genres/${this.genre.properties.id}`
      action='put'
    }
    //var uri = `genres/${this.genre.properties.id}`;
    this.spinner_active = true;
    this._apiService.req(action,
                                uri,
                                {},
                                genre_payload,
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
  };

  updateError(error: any) {
    console.log('Update Error', error);
  };

}