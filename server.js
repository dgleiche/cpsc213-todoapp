const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const exphbs = require('express-handlebars');
const app = express();
const db = new sqlite3.Database(process.env.DATABASE);
const path = require('path');
var bodyParser = require('body-parser');
const tasksControllers = require('./controllers/tasks.js');
const todoModels = require('./models/todo.js');

// Configure the template/view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Use this to parse the body of post requests
app.use(bodyParser.json())

// Use this to server static files from the 'static' directory
app.use('/static', express.static('static'))

// Our homepage---just send the index.html file
app.get('/', tasksControllers.list);

// Our API for posting new chats
app.post('/api/chats', (req, res) => {
	const chatBody = req.body.body;
	db.all('INSERT INTO chats (body) VALUES (?)', chatBody, function(err, rows){
		// Return a 500 status if there was an error, otherwise success status
		res.send(err ? 500 : 200);
	});
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Running server on port ${port}`);
	app.set('db', db);
	todoModels.createTasks(db);
});
