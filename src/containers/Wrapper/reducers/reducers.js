import { combineReducers } from "redux";
import movies from './movies';
import totals from './totals';

export default combineReducers({
  movies,
  totals
});
