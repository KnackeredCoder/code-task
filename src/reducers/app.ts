import { Sheep } from '../lib';
import { AppActions, AppActionType } from '../actions';
import { createSheep } from '../lib';

export interface AppState {
  field: Sheep[];
}

const initialState = {
  field: [] as Sheep[],
};

const getNextSheepId = (sheep: Sheep[]) => {
  return sheep.length + 1;
};

function reducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionType.ADD_SHEEP: {
      const { name, type } = action.payload;
      const { field } = state;

      const sheep = createSheep(getNextSheepId(field), name, type);

      return {
        field: [...field, sheep],
      };
    }
    case AppActionType.BRAND_SHEEP: {
      const { id } = action.payload;
      const { field } = state;

      const newField = field.reduce((a: Sheep[], v: Sheep) => {
        a.push(v.id === id ? { ...v, branded: true } : v);
        return a;
      }, []);

      return {
        field: newField,
      };
    }
    case AppActionType.CLEAR_FIELD: {
      return {
        field: [],
      };
    }
    default:
      return state;
  }
}

export default reducer;
