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
//import {PaginatePipe, PaginationControlsCmp, PAGINATION_DIRECTIVES, PaginationService} from 'ng2-pagination';
var ng2_pagination_1 = require('ng2-pagination');
var ArtistIndex = (function () {
    function ArtistIndex(_apiService, _detailsService) {
        var _this = this;
        this._apiService = _apiService;
        this._detailsService = _detailsService;
        this.page = 1;
        this._detailsService.update$.subscribe(function (object) { return _this.onArtistUpdate(object); });
    }
    // @Output() artist_details = new EventEmitter<Artist>();
    //paging_config: IPaginationInstance;
    ArtistIndex.prototype.ngOnInit = function () { this.getArtists(1); };
    ArtistIndex.prototype.onArtistUpdate = function (object) {
        this.selected_object = object;
        this.selected_object_class = this.selected_object.class[0];
        if (this.selected_object.class[0])
            console.log('object in DetailsShowCmp', object);
    };
    //{ id: 'server', itemsPerPage: page_size, currentPage: page, totalItems: total_count }
    ArtistIndex.prototype.getArtists = function (page, page_size) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (page_size === void 0) { page_size = 12; }
        var params = { page: page, per: page_size };
        this._apiService.req('get', 'artists', params)
            .map(function (response) { return response.json(); })
            .subscribe(function (response) { return _this.success(response); }, function (error) { return _this.errorMessage = error; });
    };
    ArtistIndex.prototype.success = function (response) {
        this.artists = response.entities;
        console.log('ARTIST', this.artists);
        this.total_pages = response.total_pages;
        this.total_count = response.total_count;
        this.page_size = response.page_size;
    };
    ArtistIndex.prototype.show_details = function (artist) {
        this.selected_artist = artist;
        this._detailsService.show(artist);
        console.log('selected in ArtistIndex', this.selected_artist);
    };
    ArtistIndex = __decorate([
        core_1.Component({
            selector: 'artist-index',
            template: require('!jade!./artist-index.jade')(),
            styles: [require('./artist-index.scss')],
            //directives: [PaginationControlsCmp],
            pipes: [ng2_pagination_1.PaginatePipe],
            directives: [ng2_pagination_1.PAGINATION_DIRECTIVES],
            providers: [ng2_pagination_1.PaginationService, api_service_1.ApiService]
        }), 
        __metadata('design:paramtypes', [api_service_1.ApiService, details_service_1.DetailsService])
    ], ArtistIndex);
    return ArtistIndex;
}());
exports.ArtistIndex = ArtistIndex;
//# sourceMappingURL=artist-index.component.js.map