// postgres, sqlite

const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());       
app.use(express.urlencoded()); 
app.use(cookieSession({
  name: 'session',
  secret: "abcd",
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(express.static(__dirname + '/pics'));

let comicbooks = [
    {
      url: "https://comic.naver.com/webtoon/list.nhn?titleId=733766&weekday=mon",
      title: "Tough Life",
      image: "http://localhost:4000/tough_life.png"
    },
    {
      url: "https://comic.naver.com/webtoon/list.nhn?titleId=702608&weekday=tue",
      title: "Random People",
      image: "http://localhost:4000/random_people.png"
    },
    {
      url: "https://comic.naver.com/webtoon/list.nhn?titleId=651673&weekday=wed",
      title: "Yumi's Cells",
      image: "http://localhost:4000/yumi.png"
    },
    {
      url: "https://comic.naver.com/webtoon/list.nhn?titleId=570503&weekday=thu",
      title: "Romance Revolution",
      image: "http://localhost:4000/romance_revolution.png"
    },
    {
      url: "https://comic.naver.com/webtoon/list.nhn?titleId=641253&weekday=fri",
      title: "Lookism",
      image: "http://localhost:4000/lookism.png"
    },
    {
      url: "https://comic.naver.com/webtoon/list.nhn?titleId=650305&weekday=sat",
      title: "Tigers",
      image: "http://localhost:4000/tigers.png"
    },
    {
      url: "https://comic.naver.com/webtoon/list.nhn?titleId=736277&weekday=sun",
      title: "Fight School",
      image: "http://localhost:4000/learn_fight.png"
    }
  ];
 
app.get('/', (req, res) => res.json({
  user: req.session.user,
  comicbooks: comicbooks
}));

app.post('/login', (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  let success = true;
  req.session.user = userEmail;
  res.json({
    success: success
  });
});

app.listen(port, () => console.log(`listening on ${port}!`));

