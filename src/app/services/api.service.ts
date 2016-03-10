import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Request, RequestOptions, RequestOptionsArgs, Headers, URLSearchParams, RequestMethod} from 'angular2/http';
import {Artist}           from '../artists/artist';
import {Observable}     from 'rxjs/Observable';
//import { ARTISTS } from './mock-artists';
import * as _ from 'lodash';

@Injectable()
export class ApiService {
  constructor(private http: Http) { }

  static API_BASE_URL = 'http://api.app.me:3000/v1/'
  static DEFAULT_HEADERS = {
    'Content-Type' : 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTc2OTA3MDksImF1ZCI6Ik15IE11c2ljIFVzZXJzIiwiaWQiOjEsImVtYWlsIjoia2FiYXNha2FsaXNAZ21haWwuY29tIn0.7PXFJWpgxLCcBawUdf05RWOIRMx6DCM5tkij4bojUmU'
  };

  req(_method: string, _url: string, _params?: Object, _body?: Object, _headers?: Object) {

    let method = _method ? _method : 'get'
    let url = (_url && !_.startsWith(_url, 'http')) ? ApiService.API_BASE_URL + _url : _url
    let headers = new Headers(Object.assign(ApiService.DEFAULT_HEADERS, _headers))
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

      //.do(data => console.log(data)) // eyeball results in the console
      //.catch(this.handleError(error,src,caught));
  }

  // addArtist(title: string): Observable<Artist> {

  //     let body = JSON.stringify({ title });
  //     let headers = new Headers({
  //         'Content-Type': 'application/siren',
  //         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTY2Njc1NTcsImF1ZCI6Ik15IE11c2ljIFVzZXJzIiwiaWQiOjEsImVtYWlsIjoia2FiYXNha2FsaXNAZ21haWwuY29tIn0.uLE4XkS_wdbky-JflBXtvd6UZLhntoBngcxr8TZ_DSU'
  //     });
  //     let options = new RequestOptions({ headers: headers });

  //     return this.http.post(this._artistsUrl, body, options)
  //         .map(res => <Artist>res.json().data)
  //         .catch(this.handleError)
  // }

  // private handleError(error,src,caught) {
  //   console.log(error,'error in handleError');
  //   console.log(src, 'src in handleError');
  //   console.log(caught, 'caught in handleError');
  //   // in a real world app, we may send the error to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   //console.error(error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/