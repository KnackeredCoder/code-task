import {
  createBreeding,
  createSheep,
  selectUnbrandedSheep,
  Sheep,
} from '../lib';

describe('selectUnbrandedSheep', () => {
  it('should return an unbranded sheep in the given array', () => {
    const field: Sheep[] = Array.from({ length: 5 }, (_, i) => {
      const sheep = createSheep(
        i,
        i.toString(),
        i % 2 === 0 ? 'male' : 'female',
      );
      sheep.branded = i === 2;

      return sheep;
    });

    const unbrandedSheep = selectUnbrandedSheep(field) as Sheep[];
    expect(unbrandedSheep).toHaveLength(1);
    expect(unbrandedSheep[0].branded).toBe(false);
  });

  it('should return an empty array if there are no unbranded sheep', () => {
    const field: Sheep[] = Array.from({ length: 5 }, (_, i) => {
      const sheep = createSheep(
        i,
        i.toString(),
        i % 2 === 0 ? 'male' : 'female',
      );
      sheep.branded = true;

      return sheep;
    });

    const unbrandedSheep = selectUnbrandedSheep(field) as Sheep[];
    expect(unbrandedSheep).toHaveLength(0);
  });

  it('should return an empty array for an empty field', () => {
    const unbrandedSheep = selectUnbrandedSheep([]) as Sheep[];
    expect(unbrandedSheep).toHaveLength(0);
  });
});

describe('breed', () => {
  const breed = createBreeding(() => true);

  it('should cause breeding given a definite chance with a diverse population', () => {
    const field = [createSheep(1, '1', 'male'), createSheep(2, '2', 'female')];

    const newSheep = breed(field);
    expect(newSheep).toHaveLength(1);
    expect(newSheep[0].name).toEqual('Bred Sheep');
  });

  it('should not cause breeding given a definite chance with an all male population', () => {
    const field = [createSheep(1, '1', 'male'), createSheep(2, '2', 'male')];

    const newSheep = breed(field);
    expect(newSheep).toHaveLength(0);
  });

  it('should not cause breeding given a definite chance with an all female population', () => {
    const field = [
      createSheep(1, '1', 'female'),
      createSheep(2, '2', 'female'),
    ];

    const newSheep = breed(field);
    expect(newSheep).toHaveLength(0);
  });

  it('should not cause breeding given no chance with a diverse population', () => {
    const field = [createSheep(1, '1', 'male'), createSheep(2, '2', 'female')];
    const noChanceBreed = createBreeding(() => false);

    const newSheep = noChanceBreed(field);
    expect(newSheep).toHaveLength(0);
  });
});
