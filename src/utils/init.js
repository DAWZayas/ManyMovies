import { setDefaultUsers }  from '../actions';
import configureStore from '../store';
import { defaultUsers } from './examples';


export default function init() {
  const store = configureStore();
  store.dispatch(setDefaultUsers(defaultUsers));
  return store;
}
