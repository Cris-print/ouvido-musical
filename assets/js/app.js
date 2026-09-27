const LEVELS = {
  basic: ["maior", "menor"],
  intermediate: ["maior", "menor", "sétima", "diminuta"],
  advanced: ["maior", "menor", "sétima", "diminuta", "maior7", "sus2", "sus4"]
};

const CHORD_LABELS = {
  maior: "Maior",
  menor: "Menor",
  sétima: "Sétima",
  diminuta: "Diminuta",
  maior7: "Maior com 7",
  sus2: "Sus2",
  sus4: "Sus4"
};

const state = {
  level: "basic",
  currentAnswer: null,
  score: 0,
  streak: 0,
  best: Number(localStorage.getItem("ouvido-musical-best") || 0),
  currentRoot: 60
};

const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const bestEl = document.getElementById("best");
const messageEl = document.getElementById("message");
const choicesEl = document.getElementById("choices");
const playBtn = document.getElementById("play-btn");

function setMessage(text, type = "neutral") {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
}

function updateScoreboard() {
  scoreEl.textContent = state.score;
  streakEl.textContent = state.streak;
  bestEl.textContent = state.best;
}

function saveBest() {
  const best = Math.max(state.best, state.score);
  state.best = best;
  localStorage.setItem("ouvido-musical-best", String(best));
  updateScoreboard();
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function setLevel(level) {
  state.level = level;
  document.querySelectorAll(".level-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.level === level);
  });
  state.currentAnswer = null;
  renderChoices();
  setMessage("Nível alterado. Toque um novo acorde.", "neutral");
}

function getIntervals(type) {
  const intervalsMap = {
    maior: [0, 4, 7],
    menor: [0, 3, 7],
    sétima: [0, 4, 7, 10],
    diminuta: [0, 3, 6],
    maior7: [0, 4, 7, 11],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7]
  };

  return intervalsMap[type] || [0, 4, 7];
}

function freqFromMidi(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function playChord(type, rootMidi = 60, duration = 1.2) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    setMessage("Seu navegador não suporta Web Audio API.", "bad");
    return;
  }

  const context = new AudioContextClass();
  const now = context.currentTime;
  const master = context.createGain();
  master.gain.value = 0.12;
  master.connect(context.destination);

  const notes = getIntervals(type);

  notes.forEach((offset) => {
    const osc = context.createOscillator();
    const gainNode = context.createGain();

    osc.type = "sine";
    osc.frequency.value = freqFromMidi(rootMidi + offset);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.22, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gainNode);
    gainNode.connect(master);

    osc.start(now);
    osc.stop(now + duration);
  });

  setTimeout(() => context.close(), duration * 1000 + 200);
}

function renderChoices() {
  choicesEl.innerHTML = "";

  LEVELS[state.level].forEach((type) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = CHORD_LABELS[type];
    button.dataset.choice = type;

    button.addEventListener("click", () => {
      if (!state.currentAnswer) {
        setMessage("Toque um acorde antes de responder.", "neutral");
        return;
      }

      const chosen = button.dataset.choice;
      const isCorrect = chosen === state.currentAnswer;

      button.classList.add(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        state.score += 1;
        state.streak += 1;
        setMessage("Acertou! 🎉", "good");
      } else {
        state.streak = 0;
        setMessage(`Errou! O acorde era ${CHORD_LABELS[state.currentAnswer]}.`, "bad");
      }

      saveBest();
      updateScoreboard();

      setTimeout(() => {
        button.classList.remove("correct", "wrong");
        state.currentAnswer = null;
      }, 700);
    });

    choicesEl.appendChild(button);
  });
}

function newRound() {
  const options = LEVELS[state.level];
  state.currentAnswer = randomChoice(options);
  state.currentRoot = 52 + Math.floor(Math.random() * 12);
  playChord(state.currentAnswer, state.currentRoot, 1.2);
  setMessage("Ouça o acorde e escolha a resposta.", "neutral");
}

playBtn.addEventListener("click", () => {
  newRound();
});

document.querySelectorAll(".level-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    setLevel(btn.dataset.level);
  });
});

updateScoreboard();
renderChoices();
setMessage("Selecione um nível e toque o primeiro acorde.", "neutral");
