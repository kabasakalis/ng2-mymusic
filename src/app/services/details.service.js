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
var Observable_1 = require('rxjs/Observable');
//import { ARTISTS } from './mock-artists';
var DetailsService = (function () {
    function DetailsService() {
        this.show_details$ = new core_1.EventEmitter();
        this.edit$ = new core_1.EventEmitter();
        this.update$ = new core_1.EventEmitter();
        this.delete$ = new core_1.EventEmitter();
        this.list$ = new core_1.EventEmitter();
        this.create$ = new core_1.EventEmitter();
        this.create_success$ = new core_1.EventEmitter();
    }
    DetailsService.prototype.show = function (object) {
        this.show_details$.next(object);
        console.log('show in DetailsService', object);
    };
    DetailsService.prototype.edit = function (object) {
        this.edit$.next(object);
        console.log('edit in DetailsService', object);
    };
    DetailsService.prototype.update = function (object) {
        this.update$.next(object);
        console.log('update in DetailsService', object);
    };
    DetailsService.prototype.delete = function (object) {
        this.delete$.next(object);
        console.log('delete in DetailsService', object);
    };
    DetailsService.prototype.create = function (object) {
        this.create$.next(object);
        console.log('create in DetailsService', object);
    };
    DetailsService.prototype.create_success = function (object) {
        this.create_success$.next(object);
        console.log('create_success in DetailsService', object);
    };
    DetailsService.prototype.list = function (object) {
        this.list$.next(object);
        console.log('list in DetailsService', object);
    };
    // public delete(object: any): void {
    //   //this.show_details$.next(object);
    //   console.log('object delete in DetailsService', object);
    //   console.log('object class delete in DetailsService', object.class[0]);
    // }
    DetailsService.prototype.handleError = function (error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    DetailsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DetailsService);
    return DetailsService;
}());
exports.DetailsService = DetailsService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=details.service.js.map