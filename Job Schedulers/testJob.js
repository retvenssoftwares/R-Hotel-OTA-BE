const cron = require('node-cron');

// Define a cron job pattern to run every minute
const cronPattern = '* * * * *';

// Define the task you want to run
const myTask = () => {
  console.log('Task executed at', new Date().toLocaleTimeString());
  // Place your task logic here
};
const newTask = () => {
  console.log('New task executed at', new Date().toLocaleTimeString());
  // Place your task logic here
};

// Schedule the cron job to run the task every minute
const scheduledTask = cron.schedule(cronPattern, myTask);
const scheduledTask2 = cron.schedule(cronPattern, newTask);

// Start the cron job
scheduledTask.start();
// scheduledTask2.start();

// You can also stop the cron job if needed
// scheduledTask.stop();
