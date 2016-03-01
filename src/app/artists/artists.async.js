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
var router_1 = require('angular2/router');
var artist_index_component_1 = require('./artist-index.component');
//import {ShowComponent} from './show.component';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */
console.log('`Artists` component loaded asynchronously');
var Artists = (function () {
    function Artists() {
    }
    Artists.prototype.ngOnInit = function () {
        console.log('hello `Artists` component');
    };
    Artists = __decorate([
        router_1.RouteConfig([
            { path: '/', loader: function () { return require('./artists')('Artists'); }, name: 'Artists' },
            // Async load a component using Webpack's require with es6-promise-loader
            //{ path: '/show', loader: () => require('./show')('Show'), name: 'Show' },
            { path: '/**', redirectTo: ['Artists'] }
        ]),
        core_1.Component({
            selector: 'artists',
            //template: `kabasakalis@gmail.com`
            template: require('!jade!./artists.jade')(),
            directives: [artist_index_component_1.ArtistIndex],
        }), 
        __metadata('design:paramtypes', [])
    ], Artists);
    return Artists;
})();
exports.Artists = Artists;
//# sourceMappingURL=artists.async.js.map