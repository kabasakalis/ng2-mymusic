var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var http_2 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
//import { ARTISTS } from './mock-artists';
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.req = function (url, _headers, _options) {
        if (url === void 0) { url = ''; }
        if (_headers === void 0) { _headers = ApiService.DEFAULT_HEADERS; }
        if (_options === void 0) { _options = {}; }
        console.log('_options', _options);
        //let _headers = Object.assign(ApiService.DEFAULT_HEADERS, _headers);
        var option_params = Object.assign({ headers: _headers }, _options);
        var options = new http_2.RequestOptions(option_params);
        var search_params = new http_2.URLSearchParams();
        options.search = search_params;
        console.log('options', options);
        // return this.http.get(ApiService.API_BASE_URL + uri, options)
        //   .map(res => <any>res.json())
        //   .do(data => console.log(data)) // eyeball results in the console
        //   .catch(this.handleError);
        // return this.http.request(ApiService.API_BASE_URL + uri, options)
        //   .map(res => <any>res.json())
        //   .do(data => console.log(data)) // eyeball results in the console
        //   .catch(this.handleError);
        var method = method ? method : 'get';
        var url = url ? ApiService.API_BASE_URL + url || ApiService.API_BASE_URL
            :
                //let headers = new Headers(_headers)
                let, body = {};
        var search = new http_2.URLSearchParams();
        search.append('page', '6');
        var request_options_args = {
            method: method,
            url: url,
            body: null,
            search: search,
            headers: new http_2.Headers(ApiService.DEFAULT_HEADERS)
        };
        var request_options = new http_2.RequestOptions(request_options_args);
        var request = new http_2.Request(request_options);
        return this.http.request(request)
            .map(function (res) { return res.json(); })
            .do(function (data) { return console.log(data); }) // eyeball results in the console
            .catch(this.handleError);
    };
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
    ApiService.prototype.handleError = function (error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ApiService.API_BASE_URL = 'http://api.app.me:3000/v1/';
    ApiService.DEFAULT_HEADERS = {
        'Content-Type': 'application/siren',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTY4MzY0NTIsImF1ZCI6Ik15IE11c2ljIFVzZXJzIiwiaWQiOjEsImVtYWlsIjoia2FiYXNha2FsaXNAZ21haWwuY29tIn0.acBYbFDIHKqUriN5mJ1esDB-8DyAcnRvHl8nGVAPSBk'
    };
    ApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApiService);
    return ApiService;
})();
exports.ApiService = ApiService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=api.service.js.map