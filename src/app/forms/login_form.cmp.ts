import {View, Component, OnInit, AfterViewInit,
  AfterViewChecked} from 'angular2/core';
import {MdPatternValidator, MdMinValueValidator, MdNumberRequiredValidator, MdMaxValueValidator, MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES, Validators, FormBuilder, Control, ControlGroup, ControlArray, FORM_BINDINGS, AbstractControl} from 'angular2/common';
import {SpinnerComponent} from '../utils/spinner.cmp';
import {ApiService}       from '../services/api.service';
import * as _ from 'lodash';
import * as pluralize from 'pluralize'
import {LoginPayload}           from '../login_payload';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, RouteParams} from 'angular2/router';

const validate = c => {
  if (!c.value || c.value == 'undefined') {
    console.log('required');
    //return { required: true };
    return null;
  };
  return null;
}


@Component({
  selector: 'login-form',
  template: require('!jade!./login_form.jade')(),
  styles: [require('./form.scss')],
  viewBindings: [FORM_BINDINGS],
  providers: [ApiService],
  directives: [
               MATERIAL_DIRECTIVES,
               ROUTER_DIRECTIVES,
               FORM_DIRECTIVES,
               SpinnerComponent
   ]
})
export class LoginForm implements OnInit {

  login: any;
  loginForm: ControlGroup;
  public spinner_active: boolean = false;
  new_login: any = {
    email: '',
    password: ''
  };

  constructor(private fb: FormBuilder, private _apiService: ApiService, private _router: Router) {

    this.loginForm = fb.group({
      email: [undefined, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      password: [undefined, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])]
    })
  }

  ngOnInit() {
    this.login = this.new_login;
  }


  handleForm(login: any) {
    let login_payload = {
       auth: this.loginForm.value
       }

    this.spinner_active = true;
    this._apiService.get_jwt(login_payload)
       .map(response => <any>response.json())
       .subscribe(
          jwt => this.loginSuccess(jwt),
          error =>  this.loginError = <any>error
      );
  }

  loginSuccess(jwt: any) {
    this.spinner_active = false;
    localStorage.setItem('id_token',jwt.token);
    localStorage.setItem('user_email',jwt.user.email);
    localStorage.setItem('user_id',jwt.user.id);
    this._router.navigate(['/MMList']);
  };

  loginError(error: any) {
    console.log('Login error', error);
  };

}