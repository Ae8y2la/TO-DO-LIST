import inquirer from 'inquirer';
import chalk from 'chalk';

// Task structure and task list
type Task = { description: string; completed: boolean };
const tasks: Task[] = [];

// ASCII art with a "To-Do List" heading
function displayHeading() {
  console.log(
    chalk.cyanBright.bold(`
    __________        ____  ____        __    _______________   
    /_  __/ __ \      / __ \/ __ \      / /   /  _/ ___/_  __/   
     / / / / / /_____/ / / / / / /_____/ /    / / \__ \ / /      
    / / / /_/ /_____/ /_/ / /_/ /_____/ /____/ / ___/ // /       
   /_/  \____/     /_____/\____/     /_____/___//____//_/        
                                                                    
 Welcome to your personal To-Do List!
  `)
  );
}

// Function to display tasks
function displayTasks() {
  console.log('\nHere’s what you need to do:');
  if (tasks.length === 0) {
    console.log(chalk.yellow('No tasks available.'));
  } else {
    tasks.forEach((task, index) => {
      const status = task.completed ? chalk.green('✔️ Done') : chalk.red('❌ Not done');
      console.log(`- ${index + 1}. ${task.description} [${status}]`);
    });
  }
}

async function main() {
  displayHeading(); // Show the ASCII art heading

  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do today?',
        choices: [
          '📝 Add a new task',  // Paper and pencil emoji
          '✔️ Mark a task as done',  // Tick emoji
          '👁️ Show me my tasks',  // Eye emoji
          '💭 View my to-do list',  // Thought bubble emoji
          '🗑️ Delete a task',  // Bin emoji
          '🚪 Exit',  // Exit sign emoji
        ],
      },
    ]);

    if (action === '📝 Add a new task') {
      const { description } = await inquirer.prompt([
        {
          type: 'input',
          name: 'description',
          message: 'What do you need to get done?',
        },
      ]);

      tasks.push({ description, completed: false });
      console.log(chalk.greenBright('\nGreat! Your task has been added.'));
    } else if (action === '✔️ Mark a task as done') {
      if (tasks.length === 0) {
        console.log(chalk.yellow('\nYou don’t have any tasks to complete.'));
      } else {
        const { taskIndex } = await inquirer.prompt([
          {
            type: 'list',
            name: 'taskIndex',
            message: 'Which task did you finish?',
            choices: tasks.map((task, index) => ({
              name: `${index + 1}. ${task.description} (${task.completed ? '✔️' : '❌'})`,
              value: index,
            })),
          },
        ]);

        tasks[taskIndex].completed = true; // Fixed misplaced period
        console.log(chalk.green('\nNice job! You marked a task as done.'));
      }
    } else if (action === '👁️ Show me my tasks') {
      displayTasks();
    } else if (action === '💭 View my to-do list') {
      const { updateOrView } = await inquirer.prompt([
        {
          type: 'list',
          name: 'updateOrView',
          message: 'Would you like to update or just view your to-do list?',
          choices: ['Just view', 'Update a task'],
        },
      ]);

      if (updateOrView === 'Just view') {
        displayTasks();
      } else if (updateOrView === 'Update a task') {
        const { taskIndex, newDescription } = await inquirer.prompt([
          {
            type: 'list',
            name: 'taskIndex',
            message: 'Which task would you like to update?',
            choices: tasks.map((task, index) => ({
              name: `${index + 1}. ${task.description} (${task.completed ? '✔️' : '❌'})`,
              value: index,
            })),
          },
          {
            type: 'input',
            name: 'newDescription',
            message: 'Enter the new description:',
          },
        ]);

        tasks[taskIndex].description = newDescription;
        console.log(chalk.green(`\nTask ${taskIndex + 1} updated successfully.`));
      }
    } else if (action === '🗑️ Delete a task') {
      if (tasks.length === 0) {
        console.log(chalk.yellow('\nYou don’t have any tasks to delete.'));
      } else {
        const { taskIndex } = await inquirer.prompt([
          {
            type: 'list',
            name: 'taskIndex',
            message: 'Which task would you like to delete?',
            choices: tasks.map((task, index) => ({
              name: `${index + 1}. ${task.description} (${task.completed ? '✔️' : '❌'})`,
              value: index,
            })),
          },
        ]);

        tasks.splice(taskIndex, 1);
        console.log(chalk.green('\nTask deleted successfully.'));
      }
    } else if (action === '🚪 Exit') {
      console.log(chalk.blue('\nOkay, see you next time!'));
      break; // Exit the loop
    }
  }
}

main(); // Start the CLI

      