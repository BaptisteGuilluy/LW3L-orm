import express from 'express';
import Task from './models/Mot.js';
import Mot from './models/Mot.js';

const app = express();
app.use(express.urlencoded({ extended: true }));


app.post("/add", async function (req, res) {
  const mot = new Mot();
  mot.nom_francais = req.body.nom_francais
  mot.trad = req.body.trad
  await mot.save();
  res.redirect('/');
});

app.get("/delete/:id", async function (req, res) {
  await Mot.delete({ id: req.params.id });
  res.redirect('/');
});

app.get("/", async function (req, res) {
  const liste_mot = await Mot.loadMany();
  res.render('Testyourself.ejs', { liste_mot, result: "" });
});

app.post("/submit", async function (req, res) {
  let bon = toString(Mot.nom_francais).length
  let test = 0
  let result =""

  for (i in Mot.nom_francais)
    if (i in req.body.nom_francais)
      test+=1
  if(test=bon)
    result= "good"
  else
    result="wrong"
  res.render('Testyourself.ejs',{result});
});

app.post("/redirect", async function (req, res) {
  const mot_liste = await Mot.loadMany();
  res.redirect('/add');
});


app.listen(3000, function(){
  console.log("Server ok");
});

