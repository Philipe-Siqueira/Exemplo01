const express = require('express');
const app = express();
const appName = 'Modulo01';
const port = 3000;
app.use(express.json());

const techs = ['Javascript','Node.js','ReactJs','React Native','CSS3', 'HTML5'];


app.get('/', (req,res) =>{
  res.send('Para testar os metodos use a rota /techs');
});

app.use((req,res,next) =>{
  console.log(`Requisição: ${req.url} Método: ${req.method}`);
  return next();
});

function checkTechsExists(req, res, next) {
  if(!req.body.tech){
    return req.status(400).json({error: "User undefined on body request"})
  }
  return next();
}

function checkTechsInArray(req, res, next) {
  const user = techs[req.body.index];
  if(!user){
    return req.status(400).json({error: "User does not exists"})
  }
  req.user = user;
  return next();
}

app.get('/techs', (req,res) =>{
  res.json(techs);
});

app.get('/techs/:index', checkTechsInArray, (req,res) =>{
  return res.json(req.user);
});

app.post('/techs', checkTechsExists, (req,res) =>{
  const { tech } = req.body;

  techs.push(tech);
  return res.json(techs);
});

app.put('/techs/:index', checkTechsInArray ,checkTechsExists, (req,res) =>{
  const { tech } = req.body;
  const { index } = req.params;

  techs[index] = tech;
  return res.json(techs);
});

app.delete('/techs/:index', checkTechsInArray, (req,res) =>{
  const { index } = req.params;
  
  techs.splice(index, 1);

  return res.json({message: "Delete ok"});
});

app.listen(port, ()=>{
	console.log(`Serviço: ${appName} ativo na porta: ${port}`);
});
