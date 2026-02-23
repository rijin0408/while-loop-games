function showGame(game) {
  const modal = document.getElementById("gameModal");
  const title = document.getElementById("gameTitle");
  const desc = document.getElementById("gameDesc");
  const colorBox = document.getElementById("colorBox");
  const startBtn = document.getElementById("startColorGame");
  const rngBox = document.getElementById("rngBox");
  const rngNumber = document.getElementById("rngNumber");
  const rngBtn = document.getElementById("rngBtn");
  rngBox.classList.add("d-none");

  modal.classList.remove("d-none");

  colorBox.classList.add("d-none");
  startBtn.classList.add("d-none");

  if (game === "game1") {
    title.innerHTML = "While I Face You";

    desc.innerHTML = `
  <span class="code-key running-loop">while</span> <span class="code-cond">(teacher is facing class)</span> {<br>
  &nbsp;&nbsp;<span class="code-act">stand</span><br><br>

  &nbsp;&nbsp;<span class="code-key">if</span> <span class="code-cond">(teacher turns away)</span> {<br>
  &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-act">sit fast</span><br>
  &nbsp;&nbsp;}<br>
  }<br><br>

  <span class="code-comment">// wrong move = eliminated</span>
  `;
  }

  if (game === "game2") {
    title.innerHTML = "Counting Loop";

    desc.innerHTML = `
  <span class="code-cond">start at 100</span><br><br>

  <span class="code-key running-loop">while</span> <span class="code-cond">(number is above 0)</span> {<br>
  &nbsp;&nbsp;<span class="code-act">say the number</span><br>
  &nbsp;&nbsp;<span class="code-act">wait for random number</span><br>
  &nbsp;&nbsp;<span class="code-act">subtract it in your mind</span><br><br>

  &nbsp;&nbsp;<span class="code-key">if</span> <span class="code-cond">(someone says wrong number)</span> {<br>
  &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-act">eliminated</span><br>
  &nbsp;&nbsp;}<br>
  }<br>
  `;

    rngBox.classList.remove("d-none");

    rngBtn.onclick = () => {
      const random = Math.floor(Math.random() * 9) + 1;
      rngNumber.innerHTML = "-" + random;
    };
  }

  if (game === "game3") {
    title.innerHTML = "Color Reaction Loop";

    desc.innerHTML = `
  <span class="code-comment">// reaction test</span><br><br>

  <span class="code-key running-loop">while</span> <span class="code-cond">(screen shows blue or black)</span> {<br>
  &nbsp;&nbsp;<span class="code-act">tap desk</span><br><br>

  &nbsp;&nbsp;<span class="code-key">if</span> <span class="code-cond">(color changes)</span> {<br>
  &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-act">stop immediately</span><br>
  &nbsp;&nbsp;}<br>
  }<br><br>

  <span class="code-comment">// wrong timing = eliminated</span>
  `;

    colorBox.classList.remove("d-none");
    startBtn.classList.remove("d-none");
    startBtn.onclick = startColorLoop;
  }

  if (game === "game4") {
    title.innerHTML = "Guess Until Correct";

    desc.innerHTML = `
  <span class="code-cond">secret number is hidden</span><br><br>

  <span class="code-key running-loop">while</span> <span class="code-cond">(guess is not correct)</span> {<br>
  &nbsp;&nbsp;<span class="code-act">students guess</span><br><br>

  &nbsp;&nbsp;<span class="code-key">if</span> <span class="code-cond">(correct guess)</span> {<br>
  &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-act">you are safe</span><br>
  &nbsp;&nbsp;}<br>
  }<br>
  `;
  }
}

function closeGame() {
  const modal = document.getElementById("gameModal");
  const content = document.querySelector(".game-modal-content");

  modal.classList.add("closing");
  content.classList.add("closing");

  setTimeout(() => {
    modal.classList.add("d-none");
    modal.classList.remove("closing");
    content.classList.remove("closing");
  }, 300);
}

/* selection animation */
function animateSelection(selectedCard) {
  const cards = document.querySelectorAll(".game-card-long");

  cards.forEach((card) => {
    if (card === selectedCard) {
      card.classList.add("selected");
    } else {
      card.classList.add("faded");
    }
  });
}

function selectGame(card, game) {
  const cards = document.querySelectorAll(".game-card-long");

  // reset styles
  cards.forEach((c) => {
    c.classList.remove("selected", "faded");
  });

  // highlight clicked briefly
  card.classList.add("selected");

  setTimeout(() => {
    showGame(game);

    // reset ALL cards back after modal opens
    cards.forEach((c) => {
      c.classList.remove("selected", "faded");
    });
  }, 250);
}

/* COLOR GAME */
let running = false;

const colors = [
  "#2563eb", // blue safe
  "#000000", // black safe
  "#ff0000",
  "#22c55e",
  "#facc15",
  "#a855f7",
  "#ffffff",
];

function startColorLoop() {
  running = true;
  runShuffleCycle();
  colorBox.classList.add("running", "active");
  colorBox.classList.remove("running", "active");
}

function runShuffleCycle() {
  if (!running) return;

  const box = document.getElementById("colorBox");

  let shuffleTimes = Math.floor(Math.random() * 15) + 10;
  let count = 0;

  const shuffle = setInterval(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.backgroundColor = randomColor;
    count++;

    if (count >= shuffleTimes) {
      clearInterval(shuffle);

      const finalColor = colors[Math.floor(Math.random() * colors.length)];
      box.style.backgroundColor = finalColor;

      const pause = Math.random() * 3000 + 400;
      setTimeout(runShuffleCycle, pause);
    }
  }, 70);
}
