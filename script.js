const form = document.getElementById("form");
const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");
const timersContainer = document.getElementById("activeTimers");

let timers = [];

function formatTime(totalSeconds) {
  totalSeconds = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join("  :  ");
}

function updateEmptyMessage() {
  const emptyMsg = document.getElementById("emptyMsg");
  if (timers.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
}

function playBeep() {
  const audio = new Audio(
    "https://www.soundjay.com/buttons/sounds/beep-07.mp3"
  );
  audio.play();
}

function createTimer(totalSeconds) {
  const timerDiv = document.createElement("div");
  const timeLeft = document.createElement("p");
  timeLeft.textContent = "Time Left :";
  timerDiv.classList.add("timer");

  const timeDisplay = document.createElement("span");
  timeDisplay.textContent = formatTime(totalSeconds);
  timeDisplay.classList.add("timeDisplay");

  const stopBtn = document.createElement("button");
  stopBtn.textContent = "Delete";
  stopBtn.classList.add("submit");

  timerDiv.appendChild(timeLeft);
  timerDiv.appendChild(timeDisplay);
  timerDiv.appendChild(stopBtn);
  timersContainer.appendChild(timerDiv);

  let remaining = totalSeconds;
  const interval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(interval);
      timeLeft.remove();
      timeDisplay.classList.add("timerEnd");
      timeDisplay.textContent = "Timer Is Up !";
      timerDiv.style.backgroundColor = " #f0f757";
      stopBtn.classList.add("stopBtn");
      timerDiv.style.justifyContent = "center";
      stopBtn.textContent = "Stop";
      playBeep();
    } else {
      timeDisplay.textContent = formatTime(remaining);
    }
  }, 1000);

  stopBtn.addEventListener("click", () => {
    timers = timers.filter((t) => t.interval !== interval);
    updateEmptyMessage();
    clearInterval(interval);
    timerDiv.remove();
  });

  timers.push({ interval, element: timerDiv });
  updateEmptyMessage();
}

function getTotalSeconds() {
  const h = parseInt(hh.value) || 0;
  const m = parseInt(mm.value) || 0;
  const s = parseInt(ss.value) || 0;

  const total = h * 3600 + m * 60 + s;
  return total > 0 ? total : null;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const total = getTotalSeconds();
  if (!total) {
    alert("Please enter a valid time greater than 0.");
    return;
  }
  createTimer(total);
  hh.value = mm.value = ss.value = "";
});
updateEmptyMessage();
