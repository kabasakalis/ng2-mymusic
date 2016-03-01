var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
 * Angular 2 decorators and services
 */
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var common_1 = require('angular2/common');
// import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
var router_active_1 = require('./directives/router-active');
var home_1 = require('./home/home');
/*
 * App Component
 * Top Level Component
 */
var App = (function () {
    function App() {
        this.angularclassLogo = 'assets/img/angularclass-avatar.png';
        this.name = 'Angular 2 Webpack';
        this.url = 'https://twitter.com/AngularClass';
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            providers: common_1.FORM_PROVIDERS.slice(),
            directives: router_1.ROUTER_DIRECTIVES.concat([router_active_1.RouterActive]),
            pipes: [],
            styles: [require('./app.scss')],
            template: require('!jade!./app.jade')()
        }),
        router_1.RouteConfig([
            { path: '/', component: home_1.Home, name: 'Home' },
            { path: '/artists', loader: function () { return require('./artists/artists')('Artists'); }, name: 'Artists' },
            // Async load a component using Webpack's require with es6-promise-loader
            { path: '/about', loader: function () { return require('./about/about')('About'); }, name: 'About' },
            { path: '/**', redirectTo: ['Home'] }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
exports.App = App;
/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
//# sourceMappingURL=app.js.map