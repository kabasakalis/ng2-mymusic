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
var api_service_1 = require('../services/api.service');
var details_service_1 = require('../services/details.service');
// import {
//   // Location,
//   // Router,
//   // RouteRegistry,
//   // RouterLink,
//   // RouterOutlet,
//   // Route,
//   RouteParams,
//   // ComponentInstruction,
//   //ROUTER_DIRECTIVES
// } from 'angular2/router';
//import {RouteParams, Router, Location, ROUTER_PROVIDERS} from 'angular2/router';
var router_1 = require('angular2/router');
var ng2_pagination_1 = require('ng2-pagination');
var _ = require('lodash');
var pluralize = require('pluralize');
var MMList = (function () {
    function MMList(
        // private _router:Router,
        //_routeParams : RouteParams,
        zone, _apiService, _detailsService) {
        this._apiService = _apiService;
        this._detailsService = _detailsService;
        this.list_type = 'artist';
        this.list_type_singular = 'artist';
        this.list_uri = 'artists';
        this.page = 1;
        this.zone = zone;
    }
    // @Output() artist_details = new EventEmitter<Artist>();
    //paging_config: IPaginationInstance;
    MMList.prototype.ngOnInit = function () {
        //let list_type = this._routeParams
        // console.log('type', list_type)
        var _this = this;
        this.getList('artists', 1);
        this._detailsService.update$.subscribe(function (object) { return _this.onItemUpdate(object); });
        this._detailsService.delete$.subscribe(function (object) { return _this.onItemDelete(object); });
        this._detailsService.create_success$.subscribe(function (object) { return _this.onCreateSuccess(object); });
        this._detailsService.list$.subscribe(function (object) { return _this.onList(object); });
    };
    MMList.prototype.raiseCreate = function (object) {
        this._detailsService.create(object);
        console.log('CREA');
    };
    MMList.prototype.find_in_list = function (object) {
        console.log('object', object);
        return _.find(this.list, function (a) { return a.properties.id == object.properties.id; });
    };
    MMList.prototype.find_in_list_by_id = function (id) {
        console.log('id', id);
        var a = _.find(this.list, function (a) {
            // console.log('a.properties.id', a.properties.id);
            // console.log('EQAU', a.properties.id == id);
            return (a.properties.id == id);
        });
        console.log('A', a);
        return a;
    };
    MMList.prototype.delete_from_list = function (object) {
        console.log('delete_from_list OBJECT', object);
        if (object != undefined) {
            console.log('delete_from_list LIST BEFORE REMOVAL', this.list);
            var _list = this.list;
            _.remove(_list, function (a) {
                return a.properties.id == object.properties.id;
            });
            this.list = _list;
            console.log('delete_from_list _list AFTER REMOVAL', _list);
            console.log('delete_from_list LIST AFTER REMOVAL', this.list);
        }
    };
    MMList.prototype.add_to_list = function (object) {
        //console.log('add_to_list LIST BEFORE ADD', this.list);
        this.list = _.concat(this.list, object);
        //this.list.push(object)
        //console.log('add_to_list LIST AFTER ADD', this.list);
    };
    MMList.prototype.onItemUpdate = function (object) {
        this.delete_from_list(this.find_in_list(object));
        this.add_to_list(object);
    };
    MMList.prototype.onCreateSuccess = function (object) {
        console.log('CREATE SUCCESS TRIGGR');
        this.add_to_list(object);
    };
    MMList.prototype.onItemDelete = function (object) {
        var _this = this;
        console.log('Lthis.selected_item onItemDelete', this.selected_item);
        var resource_uri = pluralize.plural(object.class[0]);
        var deleted_item = this.selected_item;
        if (item_to_delete)
            var item_to_delete = this.find_in_list_by_id(deleted_item.properties.id);
        this.delete_from_list(item_to_delete);
        this._apiService.req('delete', resource_uri + '/' + object.properties.id)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            //this.zone.runOutsideAngular(() => {
            console.log('SUCCESSFUL DELETE CALLBACK', _this);
            //});
        }, function (err) { return _this.onDeleteError(err); }, function () { return _this.onDeleteCompleted(); });
    };
    // onDeleteSuccess(res) {
    //   //this.delete_from_list(this.find_in_list(this.selected_item as any))
    //   let item_to_delete = this.find_in_list_by_id(res.id)
    //   console.log('item_to_delete', item_to_delete);
    //   //console.log('LIST BEFORE REMOVAL', this.list);
    //   //this.delete_from_list(item_to_delete)
    //   console.log('onDeleteSuccess LIST BEFORE REMOVAL', this.list);
    //   //this.list.splice(this.list.indexOf(item_to_delete), 1)
    //   _.remove(this.list, function(a: any) {
    //     return a.properties.id == item_to_delete.properties.id;
    //       });
    //   console.log('onDeleteSuccess LIST AFTER REMOVAL', this.list);
    //   //console.log('LIST AFTER REMOVAL', this.list);
    //   console.log('onDeleteSuccess!!', res);
    //   // this.zone.run(() => {
    //   //            });
    // }
    MMList.prototype.onDeleteError = function (err) {
        console.log('ERROR IN DELETE', err);
    };
    MMList.prototype.onDeleteCompleted = function () {
        console.log('Delete Completed');
        // console.log('LIST BEFORE REMOVAL', this.list);
        // console.log('Lthis.selected_item BEFORE REMOVAL', this.selected_item);
        // console.log('LIST AFTER REMOVAL', this.list);
        // console.log('ITEM DELETED successfully!!', res);
    };
    MMList.prototype.onList = function (resource) {
        console.log('ONLIST', resource);
        this.list_uri = _.split(resource.uri, '/page', 2)[0];
        this.list_type_singular = resource.type;
        this.list_type = pluralize.plural(resource.type);
        this.getList(resource.uri);
    };
    MMList.prototype.set_owner_for_list_items = function () {
        this.list_items_owner = _.find(this.list[0].entities, function (e) { return e.hasOwnProperty('properties'); });
        console.log('OWNER', _.find(this.list[0].entities, function (e) { return e.hasOwnProperty('properties'); }));
    };
    MMList.prototype.getList = function (resource_uri, page, page_size, query_params) {
        var _this = this;
        if (resource_uri === void 0) { resource_uri = 'artists'; }
        if (page === void 0) { page = 1; }
        if (page_size === void 0) { page_size = 12; }
        if (query_params === void 0) { query_params = {}; }
        //this.list_type = list_type;
        //console.log('query_params', query_params);
        var params = _.merge({ page: page, per: page_size }, query_params);
        // /console.log('params', params);
        this._apiService.req('get', resource_uri, params)
            .map(function (response) { return response.json(); })
            .subscribe(function (response) { return _this.onListSuccess(response); }, function (error) { return _this.errorMessage = error; });
    };
    MMList.prototype.onListSuccess = function (response) {
        this.list = response.entities;
        console.log('LIST SUCCESS', this.list);
        console.log('LIST SUCCESS FIRST', this.list[0]);
        this.total_pages = response.total_pages;
        this.total_count = response.total_count;
        this.page_size = response.page_size;
        this.set_owner_for_list_items();
        this.list_type = response.entities[0].class[0];
    };
    MMList.prototype.show_details = function (item) {
        this.selected_item = item;
        if (item.class[0] == 'artist') {
            this.current_artist = item;
        }
        this._detailsService.show(item);
        console.log('selected in List', this.selected_item);
        console.log('THIS ON SHOW_DETAILSList', this);
        //console.log('current Artist proper', this.current_artist.properties.title);
    };
    MMList = __decorate([
        core_1.Component({
            selector: 'list',
            template: require('!jade!./list.jade')(),
            styles: [require('./list.scss')],
            pipes: [ng2_pagination_1.PaginatePipe],
            directives: [ng2_pagination_1.PAGINATION_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
            providers: [ng2_pagination_1.PaginationService, api_service_1.ApiService].concat(router_1.ROUTER_PROVIDERS)
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, api_service_1.ApiService, details_service_1.DetailsService])
    ], MMList);
    return MMList;
}());
exports.MMList = MMList;
//# sourceMappingURL=list.cmp.js.map