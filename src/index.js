// const server = require('./server')
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dayjs from 'dayjs';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
const port = process.env.PORT | 3000;

let musicsList = [
  {
    title: 'Grande amore',
    artist: 'Il Volo',
  },
  {
    title: 'Eres Todo Para Mi',
    artist: 'Petra Berger',
  },
  {
    title: 'Finna Vivencita',
    artist: 'Petra Berger',
  },
];

class Music {
  constructor(title, artist, status) {
    this.title = title;
    this.artist = artist;
    this.status = status;
  }

  statusResp() {
    return this.status;
  }

  getMusics() {
    return musicsList;
  }

  save() {
    const exists = musicsList.filter((music) => music.title === this.title);
    if (!exists.length) {
      musicsList.push({
        title: this.title,
        artist: this.artist,
      });
      this.status = true;
    } else {
      this.status = false;
      console.log('Musica já existe');
    }
  }
}

class MyMusics {
  constructor(array) {
    this.titles = array.map((msc) => msc.title);
    this.artists = array.map((msc) => msc.artist);
  }

  getAllTitles() {
    return this.titles;
  }

  getAllArtists() {
    // return [...new Set(this.artists)];
    return this.artists;
  }
}

class Artist {
  constructor(name, musics) {
    this.name = name;
    this.musics = musics;
  }

  info() {
    return {
      name: this.name,
      musics: this.musics[0],
    };
  }
}

app.get('/', (req, res) => {
  res.send(musicsList);
});

// console.log(handler.getAllArtists())
app.get('/artists', (req, res) => {
  const artists = [];

  const handler = new MyMusics(musicsList);

  handler.getAllArtists().map((art) => {
    const newArt = new Artist(
      art,
      musicsList.filter((msc) => msc.artist === art),
    );

    artists.push(newArt);
    // console.log(newArt.info());
  });
  res.send(artists);
});
app.get('/titles', (req, res) => {
  const handler = new MyMusics(musicsList);

  res.send(handler.getAllTitles());
});

app.post('/', (req, res) => {
  const newMusic = new Music(req.body.title, req.body.artist);
  newMusic.save();
  res.send(musicsList) | res.send('Algo deu errado');
});

app.delete('/', (req, res) => {
  musicsList = musicsList.filter((msc) => msc.title !== req.body.title);
  res.send(musicsList) | res.send('Algo deu errado');
});

app.listen(port, () => {
  console.log(`Running in port ${port}`);
});
