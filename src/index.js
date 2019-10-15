const express = require('express');
const app = express();
const appName = 'Modulo01';
const port = 80;
app.use(express.json());

const projects = [
  {id:"0", title:"BootCamp RocketSeat", tasks:["Ver Modulos","Fazer Desafios"]},
  {id:"1", title:"Estudar Inglês", tasks:["Assistir aulas", "Praticar Speak"]},
  {id:"2", title:"Cuidar da saude", tasks:["Fazer exercicios","Rever Alimentação"]},
  {id:"3", title:"Cuidar da apresentação", tasks:["Falar melhor","Vestir-se melhor"]},
  {id:"4", title:"Popular GitHub", tasks:["Publicar exercicios", "Publicar Exemplos"]}
];

//Rota inicial
app.get('/', (req,res) =>{
  res.send('SEJA BEM VINDO! \n Para testar os metodos use a rota /projects.'
  +'\n Metodos que não forem GET use Insomnia ou Postman.');
});

//Midware
app.use((req,res,next) =>{
  console.log(`Requisição: ${req.url} Método: ${req.method}`);
  return next();
});

//Verifica se Existe o projeto
function checkProjectsExists(req, res, next) {
  if(!req.body.id){
    return res.status(400).json({error: "User undefined on body request"})
  }
  return next();
}

function checkProjectsInArray(req, res, next) {
  const project = projects[req.params.index];
  if(!project){
    return res.status(400).json({error: "User does not exists"})
  }
  req.project = project;
  return next();
}

app.get('/projects', (req,res) =>{
  res.json(projects);
});

app.get('/projects/:index', checkProjectsInArray, (req,res) =>{
  
  return res.json(req.project);
});

app.post('/projects', checkProjectsExists, (req,res) =>{
  const { id, title, tasks } = req.body;
  
  let project = {id, title, tasks};
  //console.log(JSON.stringify(project))
  projects.push(project);
  return res.json(projects);
});

app.put('/projects/:index', checkProjectsInArray ,checkProjectsExists, (req,res) =>{
  const { id, title, tasks } = req.body;
  const { index } = req.params;

  let project = {id, title, tasks};
  projects[index] = project;
  return res.json(projects);
});

app.delete('/projects/:index', checkProjectsInArray, (req,res) =>{
  const { index } = req.params;
  
  projects.splice(index, 1);

  return res.json({message: "Delete ok"});
});

app.listen(port, ()=>{
	console.log(`Serviço: ${appName} ativo na porta: ${port}`);
});
