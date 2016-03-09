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
var router_1 = require('angular2/router');
var common_1 = require('angular2/common');
var details_default_cmp_1 = require('./details_default.cmp');
var details_show_cmp_1 = require('./details_show.cmp');
var Details = (function () {
    // users: Array<Object> = [];
    // searchTerm: Control = new Control();
    // We want an instance of router so we can route manually
    function Details(_router) {
        this._router = _router;
    }
    Details.prototype.ngOnInit = function () {
        //this._router.navigate(['DetailsShow']);
        // this._router.parent.navigate(['/About']);
    };
    Details.prototype.goDefault = function () {
        // Example of manual routing
        this._router.navigate(['DetailsDefault']);
    };
    Details = __decorate([
        core_1.Component({
            selector: 'details-root',
            providers: [common_1.FORM_PROVIDERS],
            template: require('!jade!./details.jade')(),
            directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES, details_show_cmp_1.DetailsShow, details_default_cmp_1.DetailsDefault],
            pipes: []
        }),
        router_1.RouteConfig([
            { path: '/', component: details_default_cmp_1.DetailsDefault, name: 'DetailsDefault', useAsDefault: true },
            { path: '/show', component: details_show_cmp_1.DetailsShow, name: 'DetailsShow' },
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], Details);
    return Details;
}());
exports.Details = Details;
//# sourceMappingURL=details.cmp.js.map