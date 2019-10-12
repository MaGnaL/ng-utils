import {onlyOne} from './only-one.function';

describe('onlyOne', () => {
  it('should work', () => {
    expect(onlyOne(['foo'])).toBe('foo', 'single positive');
    expect(onlyOne(['foo', 'bar'])).toBe(null, 'multiple positive');

    expect(onlyOne(['foo'])).not.toBe(null, 'single negative');
    expect(onlyOne(['foo', 'bar'])).not.toBe('foo', 'multiple negative');
  });
});
