import { Sheep, SheepType } from '../lib';
import { createAction } from './action';

export enum AppActionType {
  ADD_SHEEP = '@sheep/ADD',
  BRAND_SHEEP = '@sheep/BRAND',
  BREED_SHEEP = '@sheep/BREED',
  CLEAR_FIELD = '@sheep/CLEAR',
}

export const AppActions = {
  addSheep: (name: string, type: SheepType) =>
    createAction(AppActionType.ADD_SHEEP, { name, type }),
  brandSheep: (sheep: Sheep) =>
    createAction(AppActionType.BRAND_SHEEP, { id: sheep.id }),
  clearField: () => createAction(AppActionType.CLEAR_FIELD),
};

export type AppActions = ReturnType<typeof AppActions[keyof typeof AppActions]>;
