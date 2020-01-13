//@flow
import {createStore} from 'effector';
import {getCurrentMenuItem} from './effect';
import {menuChange} from './event';

export const menu = createStore(getCurrentMenuItem()).on(
  menuChange,
  item => item
);
