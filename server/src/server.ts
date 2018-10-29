import express from 'express';
import { PlayList } from './PlayList';
import { AudioStream } from './AudioStream';
import * as youtube from './youtube';
import { Player } from './Player';

export const app = express();

const playlist = new PlayList();

// TODO 플레이리스트를 긁어서 제목같은거 저장해두기
// TODO video url은 재생 직전에 획득하도록 고치기
// short  for test
// const urls = [
//   'https://www.youtube.com/watch?v=a8c5wmeOL9o',
//   'https://www.youtube.com/watch?v=sJgDYdA8dio',
//   'https://www.youtube.com/watch?v=xzpndHtdl9A',
// ];

// dummy
const urls = [
  'https://www.youtube.com/watch?v=JOUyhE-9bBs',
  'https://www.youtube.com/watch?v=WNk6tpHXpw4',
];
urls.map((x) => playlist.enqueue(x));



const player = new Player(new AudioStream(), playlist);

app.get('/status', (req, res) => {
  const current = player.current ? youtube.toJson(player.current) : null;
  res.send({
    ok: true,
    current,
  });
});

app.get('/command/play', async (req, res) => {
  const item = playlist.random();
  if (item) {
    const result = await player.play(item);
    res.send({
      ok: result,
    });
  } else {
    res.send({
      ok: false,
      message: 'empty playlist',
    });
  }
});

app.get('/command/stop', async (req, res) => {
  const result = await player.stop();
  res.send({
    ok: result,
  });
});

app.get('/playlist/', (req, res) => {
  res.send(playlist.toJson());
});

app.get('/playlist/sync', (req, res) => {
  // TODO google drive
  res.send({
    ok: true,
  })
});
