import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";

// @Component({selector: 'wf'})
// @View({
//   templateUrl: require('!jade!./artists.jade')(),
//   styleUrls: ['./artists.scss'],
//   directives: [MATERIAL_DIRECTIVES]
//   // styles: [require('./artists.scss')],
//   // template: require('!jade!./artists.jade')()
// })

@Component({
  selector: 'wf',
  template: require('!jade!./whiteframe.jade')(),
  styles: [require('./artists.scss')]
 })

export class Whiteframe {
    constructor() {  }

    ngOnInit() {
        console.log('hello from Whiteframe');
    }

}