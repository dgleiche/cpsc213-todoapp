// Controllers should go here. No controllers
// in the server.js please.

const todoModels = require('../models/todo.js');

/**
 * Controller that renders a list of tasks
 * @param  {Request} req - An express request object
 * @param  {Response} res - An express response object
 * @returns undefined
 */
async function list(req, res) {
    const db = req.app.get('db');
    let result = {
        tasks: [],
        error: null,
    };

    todoModels.getTasks(db, (tasks, error) => {
        res.render('todo-list', tasks);
    });
}

function insertTask(req, res) {
  const db = req.app.get('db');

  const newTask = req.body.title;

	todoModels.insertTask(db, newTask, () => {
		res.redirect('/');
	});
}

module.exports = {
    list,
    insertTask
};
