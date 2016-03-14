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
//import {Artist}              from './artist';
var api_service_1 = require('../services/api.service');
var details_service_1 = require('../services/details.service');
var keys_values_pipe_1 = require('../utils/keys_values.pipe');
var _ = require('lodash');
var DetailsShow = (function () {
    function DetailsShow(_apiService, _detailsService) {
        this._apiService = _apiService;
        this._detailsService = _detailsService;
        this.selected_object_class = '';
        this.related_classes = [];
        this._selected_object_relations = {};
    }
    //paging_config: IPaginationInstance;
    DetailsShow.prototype.ngOnInit = function () {
        var _this = this;
        this._detailsService.show_details$.subscribe(function (object) { return _this.onObjectShow(object); });
        console.log('DetailsShow started');
        this._detailsService.update$.subscribe(function (object) { return _this.onObjectShow(object); });
        this.selected_object = {
            class: ['artist'],
            properties: {
                //id: 1,
                title: ''
            }
        };
        this.selected_object_class = this.selected_object.class[0];
        //this.selected_object = null as any;
    };
    DetailsShow.prototype.onObjectShow = function (object) {
        this.selected_object = object;
        this.selected_object_class = this.selected_object.class[0];
        this.selected_object_relations = object;
        console.log('object show in DetailsShowCmp', object);
    };
    Object.defineProperty(DetailsShow.prototype, "selected_object_relations", {
        set: function (object) {
            this.related_classes = _.uniq(_.map(this.selected_object.entities, function (e) { return e.class[0]; }));
            var class_to_related = {};
            _(this.related_classes).forEach(function (cl) {
                class_to_related[cl] = _.filter(object.entities, function (e) { return e.class[0] == cl; });
            });
            this._selected_object_relations = class_to_related;
            console.log('_selected_object_relations', this._selected_object_relations);
            //console.log('this._selected_object_relations[genre].properties.title', this._selected_object_relations['genre'][0].properies);
        },
        enumerable: true,
        configurable: true
    });
    DetailsShow.prototype.raiseDelete = function (object) {
        this._detailsService.delete(object);
    };
    DetailsShow.prototype.raiseList = function (object) {
        this._detailsService.list(object);
    };
    DetailsShow.prototype.edit = function (object) {
        this._detailsService.edit(object);
    };
    DetailsShow = __decorate([
        core_1.Component({
            selector: 'details-show',
            template: require('!jade!./details_show.jade')(),
            styles: [require('./details.scss')],
            //directives: [PaginationControlsCmp],
            //pipes: [PaginatePipe],
            directives: [],
            providers: [api_service_1.ApiService],
            pipes: [keys_values_pipe_1.KeysValuesPipe]
        }), 
        __metadata('design:paramtypes', [api_service_1.ApiService, details_service_1.DetailsService])
    ], DetailsShow);
    return DetailsShow;
}());
exports.DetailsShow = DetailsShow;
//# sourceMappingURL=details_show.cmp.js.map