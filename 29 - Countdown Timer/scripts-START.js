let countdown;
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function setTimer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds *1000;
  displayTimeLeft(seconds);
  displayTimeEnd(then);

  countdown = setInterval(() => {
    const left = Math.round((then - Date.now()) / 1000);
    if (left < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(left);
  },1000);
}

function displayTimeLeft(left) {
  const mins = Math.floor(left / 60);
  const secs = left % 60;
  const value = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  timeLeft.textContent = value;
  document.title = value;
}

function displayTimeEnd(timestamp) {
  const back = new Date(timestamp);
  const hour = back.getHours();
  const minute = back.getMinutes();
  endTime.textContent = `Back at ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;
}

buttons.forEach(b => b.addEventListener('click', function() {
  const secs = parseInt(this.dataset.time);
  setTimer(secs);
}));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  this.reset();
  setTimer(mins * 60);
})
