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
var all_1 = require('ng2-material/all');
var common_1 = require('angular2/common');
var details_service_1 = require('../services/details.service');
var api_service_1 = require('../services/api.service');
var _ = require('lodash');
var validate = function (c) {
    if (!c.value || c.value == 'undefined') {
        console.log('required');
        //return { required: true };
        return null;
    }
    ;
    return null;
};
var ArtistForm = (function () {
    // albumTitleCtrl: Control = new Control('', Validators.compose([
    //   Validators.maxLength(20)
    // ]));
    // albumYearCtrl: Control = new Control('1988', Validators.compose([
    //   Validators.maxLength(20)
    // ]));
    // albumCtrlGroup: ControlGroup = new ControlGroup({
    //   title: this.albumTitleCtrl,
    //   year: this.albumYearCtrl
    // });
    // ctrlAlbums: ControlGroup[] = [
    //   //new ControlGroup({
    //      new ControlGroup({
    //       title: this.albumTitleCtrl,
    //       year: this.albumYearCtrl
    //     })
    //   //})
    // ];
    // ctrlAlbums: Control[] = [
    //   //new ControlGroup({
    //     this.albumTitleCtrl,
    //      this.albumYearCtrl
    //   //})
    // ];
    // //titleCtrl: Control;
    // titleCtrl: Control = new Control('', Validators.compose([
    //   Validators.required,
    //   Validators.maxLength(20)
    // ]));
    // countryCtrl: Control = new Control('', Validators.compose([
    //   Validators.required,
    //   Validators.maxLength(20)
    // ]));
    // genre_idCtrl: Control = new Control('', Validators.compose([
    //   Validators.required
    // ]));
    function ArtistForm(fb, _detailsService, _apiService) {
        var _this = this;
        this.fb = fb;
        this._detailsService = _detailsService;
        this._apiService = _apiService;
        this.show = false;
        this._detailsService.edit$.subscribe(function (object) { return _this.onEdit(object); });
        this.artistForm = fb.group({
            //'artist':fb.group({
            title: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    common_1.Validators.maxLength(30)
                ])],
            country: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    common_1.Validators.maxLength(30)
                ])],
            genre_id: [undefined, validate]
        });
        //this.genreControl = this.artistForm.controls['genre_id'];
        // this.artistForm= new ControlGroup({
        //   //'artist': new ControlGroup({
        //     'title': this.titleCtrl,
        //     'country': this.countryCtrl,
        //     //'genre_id': [undefined, validate],
        //     'albums_attributes': new ControlArray(this.ctrlAlbums)
        //   //})
        // });
        console.log('this.FB', this.fb);
        console.log('artistForm.control');
    }
    ArtistForm.prototype.ngOnInit = function () {
        var _this = this;
        //this.titleCtrl = this.artistForm.controls['artist'].controls['title'];
        this.artist = {
            entities: [
                { class: ['genre'] },
                { class: ['albums'] }
            ],
            properties: {
                id: 1092,
                genre_id: 3,
                title: 'KOKO',
                country: '4r4r4'
            },
            class: ['artist']
        };
        this.getGenres(1, 12);
        this._detailsService.show_details$.subscribe(function (object) { return _this.onObjectShow(object); });
        console.log('Artist Form started');
        // this.selected_object = {
        //   class: ['artist'],
        //   properties: {
        //     //id: 1,
        //     title: 'Select an Item From the list on the left.'
        //   }
        // };
        // this.selected_object_class = this.selected_object.class[0];
    };
    ArtistForm.prototype.onEdit = function (object) {
        this.artist = object;
        this.show = true;
    };
    // onGenreChange(value:string):void{
    //    console.log('genre_changed',value);
    //  }
    ArtistForm.prototype.onObjectShow = function (object) {
        this.artist = object;
        var artist_albums_data = _.find(this.artist.entities, function (o) { return o.class[0] == 'albums'; });
        this.artist_albums_url = (artist_albums_data != null) ? artist_albums_data.href : '';
        // console.log('artist_albums_data', artist_albums_data);
        // console.log('artist_albums_data == null', artist_albums_data == null);
        if (this.artist_albums_url != '') {
            this.getAlbums(1, 12);
        }
        else {
            this.artist_albums = [];
        }
        console.log('artist onObjectShow in form', this.artist);
        console.log('this.artistForm.value ON SELECT', this.artistForm.value);
        console.log('FORMBUILDER artistForm', this.artistForm);
    };
    ArtistForm.prototype.update = function (artist) {
        // this.selected_object = object
        // this.selected_object_class = this.selected_object.class[0]
        var _this = this;
        console.log('artist in UYPDATE', artist);
        console.log('this.artistForm.value', this.artistForm.value);
        var artist_payload = {
            artist: this.artistForm.value
        };
        //artist_payload.artist.id=this.artist.properties.id;
        //artist_payload.artist.albums_attributes = [{title: 'fgtestAlbum',year: 'dfdfff1921'}];
        //artist_payload.artist.genre_attributes = {title: 'GNREEEE'};
        console.log('artist_paylod in artist_form   ', artist_payload);
        var uri = "artists/" + this.artist.properties.id;
        this._apiService.req('put', uri, {}, artist_payload)
            .map(function (response) { return response.json(); })
            .subscribe(function (response) { return _this.updateSuccess(response); }, function (error) { return _this.updateError = error; });
    };
    ArtistForm.prototype.updateSuccess = function (response) {
        //this.artists = response.entities;
        console.log('SUCCESSFUL UPDATE', response);
        this._detailsService.update(response);
        //this.total_pages = response.total_pages;
        //this.total_count = response.total_count;
        //this.page_size = response.page_size;
    };
    ;
    ArtistForm.prototype.updateError = function (error) {
        //this.artists = response.entities;
        console.log('ERROR UPDATE', error);
        //this.total_pages = response.total_pages;
        //this.total_count = response.total_count;
        //this.page_size = response.page_size;
    };
    ;
    ArtistForm.prototype.getGenres = function (page, page_size) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (page_size === void 0) { page_size = 12; }
        var params = { page: page, per: page_size };
        this._apiService.req('get', 'genres', params)
            .map(function (response) { return response.json(); })
            .subscribe(function (response) { return _this.getGenresSuccess(response); }, function (error) { return _this.getGenresError = error; });
    };
    ArtistForm.prototype.getGenresSuccess = function (response) {
        //this.artists = response.entities;
        console.log('GENRES GET SUCCESSFUL ', response);
        //this.total_pages = response.total_pages;
        //this.total_count = response.total_count;
        //this.page_size = response.page_size;
        this.genres = response.entities;
        console.log('GENRES', this.genres);
    };
    ;
    ArtistForm.prototype.getGenresError = function (error) {
        //this.artists = response.entities;
        console.log('ERROR GET GENRES', error);
        //this.total_pages = response.total_pages;
        //this.total_count = response.total_count;
        //this.page_size = response.page_size;
    };
    ;
    ArtistForm.prototype.getAlbums = function (page, page_size) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (page_size === void 0) { page_size = 12; }
        var params = { page: page, per: page_size };
        this._apiService.req('get', this.artist_albums_url, params)
            .map(function (response) { return response.json(); })
            .subscribe(function (response) { return _this.getAlbumsSuccess(response); }, function (error) { return _this.getAlbumsError = error; });
    };
    ArtistForm.prototype.getAlbumsSuccess = function (response) {
        //this.artists = response.entities;
        console.log('GENRES GET SUCCESSFUL ', response);
        //this.total_pages = response.total_pages;
        //this.total_count = response.total_count;
        //this.page_size = response.page_size;
        this.artist_albums = response.entities;
        console.log('artist_albums', this.artist_albums);
        console.log('ALBUMS GET SUCCESS', this.artist_albums);
    };
    ;
    ArtistForm.prototype.getAlbumsError = function (error) {
        //this.artists = response.entities;
        console.log('ERROR GET ALBUMS', error);
        //this.total_pages = response.total_pages;
        //this.total_count = response.total_count;
        //this.page_size = response.page_size;
    };
    ;
    ArtistForm = __decorate([
        core_1.Component({
            selector: 'artist-form',
            template: require('!jade!./artist_form.jade')(),
            styles: [require('./artist_form.scss')],
            directives: [all_1.MATERIAL_DIRECTIVES, common_1.FORM_DIRECTIVES],
            viewBindings: [common_1.FORM_BINDINGS],
            providers: [api_service_1.ApiService]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, details_service_1.DetailsService, api_service_1.ApiService])
    ], ArtistForm);
    return ArtistForm;
}());
exports.ArtistForm = ArtistForm;
//# sourceMappingURL=artist_form.cmp.js.map