import { Base64 } from 'js-base64';

export const encodeCursor = (val: number) => {
  const s = `cursor${val}`;
  return Base64.encode(s);
};

export const decodeCursor = (cursor: string) => {
  const s = Base64.decode(cursor);
  const valstr = s.replace('cursor', '');
  try {
    return parseInt(valstr, 10);
  } catch (err) {
    return 1;
  }
};
