// Movies model will go here. Functions
// should each take the db connection parameter
// as the first argument.

/**
 * Fetches all movies from database
 * @param  {PG Promise database connection} db
 * @returns {undefined}
 */

async function createTasks(db) {
  try {
    const createTasksQuery = `CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(255),
      is_completed BOOLEAN DEFAULT 0
    );`;

    await db.serialize(function() {
      db.run(createTasksQuery);
    });

  } catch(e) {
    console.log("ERROR CREATING TASKS TABLE " + e);

    return false;
  }

  return true;
}

function getTasks(db, callback) {
    let tasks = [];
    let error = null;

    const query = 'SELECT * FROM tasks;';

    db.all(query, function(err, rows) {
      tasks = rows;
      error = err;

      return callback({
        tasks,
        error
      });
    });
}

function insertTask(db, taskTitle, callback) {
  const query = 'INSERT INTO tasks (title) VALUES (?)'

  db.run(query, [taskTitle], function(err) {
    if (err) console.log(err.message);

    return callback();
  });
}

function setCompleted(db, id, callback) {
    const updateTaskQuery = 'UPDATE tasks SET is_completed = (?) WHERE id = (?)';

    db.run(updateTaskQuery, [true, id], function(err) {
      if (err) console.log(err.message);

      return callback();
    });
}


module.exports = {
    createTasks,
    getTasks,
    insertTask,
    setCompleted
};
