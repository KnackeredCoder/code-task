import { getRandomNumber, getFiftyFifty } from './random';
import { pipe } from './function';

export type SheepType = 'male' | 'female';

export interface Sheep {
  id: number;
  name: string;
  type: SheepType;
  branded: boolean;
}

export function createSheep(id: number, name: string, type: SheepType): Sheep {
  return {
    id,
    name,
    type,
    branded: false,
  };
}

const selectSheepAtRandom = (sheep: Sheep[]): Sheep[] => {
  if (sheep.length === 0) return [];

  const index = getRandomNumber(0, sheep.length - 1);
  return [sheep[index]];
};

const selectMaleSheep = pipe(
  (sheep: Sheep[]) => sheep.filter(x => x.type === 'male' && !x.branded),
  selectSheepAtRandom,
);

const selectFemaleSheep = pipe(
  (sheep: Sheep[]) => sheep.filter(x => x.type === 'female' && !x.branded),
  selectSheepAtRandom,
);

export const selectUnbrandedSheep = pipe(
  (sheep: Sheep[]) => sheep.filter(x => !x.branded),
  selectSheepAtRandom,
);

export const createBreeding = (chanceFunc: () => boolean) => {
  return (sheep: Sheep[]) => {
    const male = selectMaleSheep(sheep) as Sheep[];
    const female = selectFemaleSheep(sheep) as Sheep[];
    const chance = chanceFunc();

    if (!chance || male.length === 0 || female.length === 0) return [];

    return [createSheep(0, `Bred Sheep`, getFiftyFifty() ? 'female' : 'male')];
  };
};

export const breed = createBreeding(getFiftyFifty);
