import {arrayify} from './arrayify.function';

describe('arrayify', () => {
  it('should work', () => {
    expect(arrayify('foo')).toEqual(['foo'], 'single positive');
    expect(arrayify(['foo', 'bar'])).toEqual(['foo', 'bar'], 'multiple positive');

    expect(arrayify('foo')).not.toBe(null, 'single negative');
    expect(arrayify(['foo', 'bar'])).not.toBe(null, 'multiple negative');
  });
});
