import { Cache } from '@src/helpers/cache';
import * as faker from 'faker';

interface Sample {
  val: number;
}

describe('Cache', () => {
  test('simple', async () => {
    const cache = new Cache<Sample>();
    const id = `test-${faker.random.alphaNumeric(8)}`;
    const val = faker.random.number();

    expect(await cache.has(id)).toBeFalsy();

    await cache.set(id, { val });
    expect(await cache.has(id)).toBeTruthy();

    const found = await cache.get(id);
    expect(found).not.toBeUndefined();
    expect((found as Sample).val).toEqual(val);

    await cache.delete(id);
    expect(await cache.has(id)).toBeFalsy();
  });
});
