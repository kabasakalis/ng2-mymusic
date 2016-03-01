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
//import {PaginatePipe, PaginationControlsCmp, PAGINATION_DIRECTIVES, PaginationService} from 'ng2-pagination';
var ng2_pagination_1 = require('ng2-pagination');
var ArtistIndex = (function () {
    function ArtistIndex(_apiService) {
        this._apiService = _apiService;
    }
    ArtistIndex.prototype.ngOnInit = function () { this.getArtists(); };
    ArtistIndex.prototype.getArtists = function () {
        var _this = this;
        this._apiService.req({}, {}, { 'page': 5 })
            .subscribe(function (artists) { return _this.artists = artists.entities; }, function (error) { return _this.errorMessage = error; });
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
        __metadata('design:paramtypes', [api_service_1.ApiService])
    ], ArtistIndex);
    return ArtistIndex;
})();
exports.ArtistIndex = ArtistIndex;
//# sourceMappingURL=artist-index.component.js.map