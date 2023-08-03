// Function to update the timer display
function updateTimerDisplay(time) {
  const timerElement = document.getElementById("timer");
  timerElement.innerText = time;
}

// Function to start the timer
function startTimer() {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  const interval = setInterval(() => {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    updateTimerDisplay(formattedTime);
  }, 1000); // Update the timer every second

  // Function to stop the timer
  function stopTimer() {
    clearInterval(interval);
  }

  return stopTimer;
}

// Call startTimer() to start the timer
const stopTimerFunction = startTimer();

// To stop the timer, call stopTimerFunction()
// For example: stopTimerFunction();
stopTimerFunction();
// startTimer();
