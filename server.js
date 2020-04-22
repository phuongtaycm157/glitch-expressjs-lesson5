// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var todos = [
  {id: 1, todo: 'Đi chợ'},
  {id: 2, todo: 'Nấu cơm'},
  {id: 3, todo: 'Rửa bát'},
  {id: 4, todo: 'Học code tại CodersX'}
]

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.render('index', {
    name: 'Nishi'
  })
});
app.get('/todos', function(req, res) {
  // handling data if it exist
  var matchTodos;
  if (req.query.q) {
    var q = req.query.q;
    matchTodos = todos.filter((todo) => {
      return todo.todo.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    });
  }
  
	res.render('todos/index', {
    todos: (matchTodos != undefined ? matchTodos : todos)
  })
});

app.post('/todos/create', function(req, res) {
  todos.push(req.body);
  res.redirect('/todos');
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});