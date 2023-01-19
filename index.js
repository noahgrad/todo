const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const bodyParser = require('body-parser');

let todos = [
  { id: 1, task: 'Learn Node.js' },
  { id: 2, task: 'Learn Express.js' },
  { id: 3, task: 'Learn MongoDB' },
];

app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  res.render('todos', { todos });
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

app.post('/todos', (req, res) => {
  const newTodo = { id: todos.length + 1, task: req.body.task };
  todos.push(newTodo);
  res.render('todos', { todos });
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) res.status(404).json({ message: 'Todo not found' });
  todo.task = req.body.task;
  res.render('todos', { todos });
});

app.delete('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) res.status(404).json({ message: 'Todo not found' });
  todos = todos.filter((t) => t.id !== parseInt(req.params.id));
  res.render('todos', { todos });
});

app.listen(port, () => {
  console.log("Todo API listening at http://localhost:${port}");
});