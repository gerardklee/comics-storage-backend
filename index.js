// node set up
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const app = express();

// application set up
const port = 4000;

// db
const db = require('./db');
const pool = db.createPool();
db.migrate(pool);

// application

// cors
app.use(cors({
  "credentials": true,
  "optionsSuccessStatus": 200
}));

app.use(express.json());       
app.use(express.urlencoded()); 
app.use(cookieSession({
  name: 'session',
  secure: false,
  httpOnly: false,
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

app.post('/login', async (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1 AND password=$2', [userEmail, userPassword]);    
    if (result.rowCount === 0) {
      res.json({
        success: false
      });
      return;
    }
  } catch(err) {
    res.json({
      success: false
    });
    console.log(err);
    return;
  } 

  res.json({
    success: true
  });

  req.session.user = userEmail;
  console.log(req.session.user);
  req.session.now = Date.now();
});

app.post('/register', async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  try {
    const result = await pool.query('INSERT INTO users (email, password) VALUES($1, $2)', [userEmail, userPassword]);
  } catch(err) {
    res.json({
      success: false
    });
    console.log(err);
    return;
  }

  res.json({
    success: true
  });

});

app.listen(port, () => console.log(`listening on ${port}!`));
