import { Spec } from '..';
import { doesNotThrow } from 'assert';
import { app } from '../..';
import { Workers } from '../../app/modules/workers';

export const appSpecs: Spec = {};

appSpecs[`app.init should start without throwing`] = done => {
    doesNotThrow(() => {
        app.init().then(() => {
            Workers.init();
            done();
        });
    }, TypeError);
};