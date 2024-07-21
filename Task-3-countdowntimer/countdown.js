let timer;
let time = 0;
let running = false;

function startTimer() {
  if (!running) {
    running = true;
    timer = setInterval(updateTimer, 10); 
  }
}

function stopTimer() {
  running = false;
  clearInterval(timer);
}

function resetTimer() {
  running = false;
  clearInterval(timer);
  time = 0;
  updateDisplay();
}

function updateTimer() {
  time++;
  updateDisplay();
}

function updateDisplay() {
  const milliseconds = time % 100;
  const seconds = Math.floor(time / 100) % 60;
  const minutes = Math.floor(time / 6000);
  document.getElementById('timer').innerText = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(milliseconds) {
  return milliseconds < 10 ? `0${milliseconds}` : milliseconds;
}
