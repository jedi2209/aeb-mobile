//@flow

import {createEvent} from 'effector';

/**
 * Event is just a function which provide a way
 * to subscribe on its calls
 */

export const menuChange = createEvent('select menu');
