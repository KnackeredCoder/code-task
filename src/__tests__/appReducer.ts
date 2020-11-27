import { AppActions } from '../actions';
import appReducer from '../reducers/app';

describe('app reducer', () => {
  it('should return state with a sheep added when given the ADD_SHEEP action', () => {
    const state = appReducer(undefined, AppActions.addSheep('Test', 'male'));

    expect(state.field).toHaveLength(1);
    expect(state.field[0].id).toBe(1);
    expect(state.field[0].name).toBe('Test');
    expect(state.field[0].type).toBe('male');
  });

  it('should return state with a branded sheep when given the BRAND_SHEEP action', () => {
    const initialState = appReducer(
      undefined,
      AppActions.addSheep('Test', 'male'),
    );
    const state = appReducer(
      initialState,
      AppActions.brandSheep(initialState.field[0]),
    );

    expect(state.field).toHaveLength(1);
    expect(state.field[0].id).toBe(1);
    expect(state.field[0].name).toBe('Test');
    expect(state.field[0].type).toBe('male');
    expect(state.field[0].branded).toBe(true);
  });

  it('should return empty field state given the CLEAR_FIELD action', () => {
    const initialState = appReducer(
      undefined,
      AppActions.addSheep('Test', 'male'),
    );
    const state = appReducer(initialState, AppActions.clearField());

    expect(state.field).toHaveLength(0);
  });
});
