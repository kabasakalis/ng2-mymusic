"use strict";
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
//import { ARTISTS } from './mock-artists';
var _ = require('lodash');
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.req = function (_method, _url, _params, _body, _headers) {
        var method = _method ? _method : 'get';
        var url = (_url && !_.startsWith(_url, 'http')) ? ApiService.API_BASE_URL + _url : _url;
        var headers = new http_2.Headers(Object.assign(ApiService.DEFAULT_HEADERS, _headers));
        var body = _body ? JSON.stringify(_body) : JSON.stringify(new Object);
        var search = new http_2.URLSearchParams();
        for (var param in _params) {
            if (_params.hasOwnProperty(param)) {
                var value = _params[param];
                search.append(param, value);
            }
        }
        var request_options_args = {
            method: method,
            url: url,
            body: body,
            search: search,
            headers: headers
        };
        var request_options = new http_2.RequestOptions(request_options_args);
        var request = new http_2.Request(request_options);
        return this.http.request(request);
        //.do(data => console.log(data)) // eyeball results in the console
        //.catch(this.handleError(error,src,caught));
    };
    ApiService.API_BASE_URL = 'http://api.app.me:3000/v1/';
    ApiService.DEFAULT_HEADERS = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTc2MDM5MDQsImF1ZCI6Ik15IE11c2ljIFVzZXJzIiwiaWQiOjEsImVtYWlsIjoia2FiYXNha2FsaXNAZ21haWwuY29tIn0.AmA5b0Lc3XmKq50eJzsvK32qWpP4c62pZdMNPYezNXs'
    };
    ApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=api.service.js.map