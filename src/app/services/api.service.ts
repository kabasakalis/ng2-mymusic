import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Request, RequestOptions, RequestOptionsArgs, Headers, URLSearchParams, RequestMethod} from 'angular2/http';
import {LoginPayload}           from '../login_payload';
import {Observable}     from 'rxjs/Observable';
import * as _ from 'lodash';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

@Injectable()
export class ApiService {
  static API_BASE_URL = 'http://api.app.me:3000/v1/'
  public default_headers :any = {
    'Content-Type' : 'application/json',
    'Accept': 'application/json',
    'Authorization':  ''
  };

  constructor(private http: Http) {}

  get_jwt(login: LoginPayload) {
    return this.req('post', 'auth', {}, login);
  }

  req(_method: string, _url: string, _params?: Object, _body?: Object, _headers?: Object) {

    let method = _method ? _method : 'get'
    let url = (_url && !_.startsWith(_url, 'http')) ? ApiService.API_BASE_URL + _url : _url
    let headers = new Headers(Object.assign(this.default_headers, _headers))
    let body = _body ? JSON.stringify(_body) : JSON.stringify(new Object)
    let search = new URLSearchParams()
    for (var param in _params) {
      if (_params.hasOwnProperty(param)) {
          var value = _params[param];
          search.append(param, value)
      }
    }

    let request_options_args: RequestOptionsArgs = {
      method: method,
      url: url,
      body: body,
      search: search,
      headers: headers
    };

    let request_options = new RequestOptions(request_options_args)
    let request = new Request(request_options);

    return this.http.request(request)
  }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/