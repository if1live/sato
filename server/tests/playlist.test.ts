import {
  PlayList,
  PlayListItem,
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
