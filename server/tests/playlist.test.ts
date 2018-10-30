import {
  PlayList,
  PlayListItem,
  RandomGenerator,
  TextLoader,
} from '@src/playlist';
import * as faker from 'faker';

const makeId = () => faker.random.alphaNumeric(8);


describe('PlayList', () => {
  test('push', () => {
    const playlist = new PlayList();
    const item = new PlayListItem(makeId());

    playlist.push(item);
    expect(playlist.length).toEqual(1);
  });

  test('clear', () => {
    const playlist = new PlayList();
    const item = new PlayListItem(makeId());
    playlist.push(item);

    playlist.clear();
    expect(playlist.length).toEqual(0);
  });
});

describe('RandomGenerator', () => {
  test('random', () => {
    for (let i = 0; i < 10; i++) {
      const queueSize = 1;
      const retry = 10;
      const gen = new RandomGenerator(queueSize, retry);
      const v1 = gen.random({ min: 0, max: 1 });
      const v2 = gen.random({ min: 0, max: 1 });
      expect(v1).not.toEqual(v2);
    }
  });
});

describe('TextLoader#load', () => {
  test('line', () => {
    const text = `asdf`;
    const loader = new TextLoader(text);
    const items = loader.load();
    expect(items).toHaveLength(1);
  });

  test('simple', () => {
    const text = `
    # comment
    // comment
    asdf
    qwer
    `;
    const loader = new TextLoader(text);
    const items = loader.load();
    expect(items).toHaveLength(2);
  });
});
