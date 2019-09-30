import { NegatePipe } from './negate.pipe';

describe('NegatePipe', () => {

  it('should work', () => {
    const pipe: NegatePipe = new NegatePipe();

    expect(pipe.transform(true)).toBe(false);
    expect(pipe.transform(false)).toBe(true);
  });
});
