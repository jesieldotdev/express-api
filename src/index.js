
// const server = require('./server')
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
const port = process.env.PORT | 3000;



const musicsList = [
  {
    title: "Grande amore",
    artist: "Il Volo",
  },
  {
    title: "Eres Todo Para Mi",
    artist: "Petra Berger",
  },
];

class Music {
    constructor(title, artist, status) {
      this.title = title;
      this.artist = artist;
      this.status = status;
    }

    statusResp(){
        return this.status
    }
  
    save(){
        const exists = musicsList.filter((music) => music.title === this.title)
        if(exists.length === 0){
            musicsList.push({
                title: this.title,
                artist: this.artist
            })
            this.status = "Musica adicionada"
        }else{
            this.status = "Musica já existe"
            console.log("Musica já existe")
        }
        
    }

    
  }

app.get("/", (req, res) => {
  res.send(musicsList);
});

app.post('/', (req, res) => {

    const newMusic = new Music(req.body.title, req.body.artist)
    newMusic.save()
    res.send(newMusic.statusResp())
})

app.listen(port, () => {
  console.log(`Running in port ${port}`);
});
