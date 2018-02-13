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

    const q1 = await db.none(createTasksQuery);
  } catch(e) {
    console.log("ERROR CREATING TASKS TABLE " + e);

    return false;
  }

  return true;
}

async function getTasks(db) {
    let tasks = [];
    let error = null;
    try {
        // TODO: Fill in the query
        const query = 'SELECT * FROM tasks;';
        tasks = await db.any(query);
    } catch (e) {
        // If there was an error, make the movies an
        // empty array and return the error.
        tasks = [];
        error = e;
    }
    return {
        tasks,
        error,
    };
}

async function setCompleted(db, id) {
  try {
    const updateTaskQuery = 'UPDATE tasks SET is_completed = $1 WHERE id = $2', [true, id]);
    const q1 = await db.none(updateTaskQuery);
  } catch (e) {
    console.log("ERROR UPDATING TABLE " + e);

    return false;
  }

  return true;
}


module.exports = {
    createTasks,
    getTasks,
    setCompleted,
};
