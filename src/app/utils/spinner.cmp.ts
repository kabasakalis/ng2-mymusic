'use strict';

import {Component, Input, OnDestroy} from 'angular2/core';

@Component({
    selector: 'my-spinner',
    template: require('!jade!./spinner.jade')(),
    styles: [require('./spinner.scss')]
})
export class SpinnerComponent implements OnDestroy {
    private currentTimeout: number;
    private isDelayedRunning: boolean = false;

    @Input()
    public delay: number = 0;

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
           this.isDelayedRunning = false;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}