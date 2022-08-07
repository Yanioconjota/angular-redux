import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';

//Reference to the isLoading interface
export interface AppState {
   ui: ui.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
}
