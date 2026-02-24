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
    title.innerHTML = "Sit or Stand?";

    desc.innerHTML = `
<span class="code-comment">//everyone begins standing</span><br><br>

<span class="code-key running-loop">while</span> <span class="code-cond">(countdown is not 0)</span> {<br>
&nbsp;&nbsp;<span class="code-act">watch the teacher</span><br><br>

&nbsp;&nbsp;<span class="code-key">if</span> <span class="code-cond">(right hand is raised)</span> {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-act">stand</span><br>
&nbsp;&nbsp;}<br><br>

&nbsp;&nbsp;<span class="code-key">if</span> <span class="code-cond">(left hand is raised)</span> {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-act">sit</span><br>
&nbsp;&nbsp;}<br><br>

&nbsp;&nbsp;<span class="code-key">if</span> <span class="code-cond">(wrong move)</span> {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-act">eliminated</span><br>
&nbsp;&nbsp;}<br><br>

&nbsp;&nbsp;<span class="code-act">countdown decreases</span><br>
}<br><br>
`;
  }

  if (game === "game2") {
    title.innerHTML = "Counting Loop";

    desc.innerHTML = `
    <span class="code-cond">number is 100</span><br>
    <span class="code-comment">//students take turns in order</span><br><br>

    <span class="code-key running-loop">while</span> <span class="code-cond">(number is above 0)</span> {<br>
    &nbsp;&nbsp;<span class="code-act">say the current value of number</span><br>
    &nbsp;&nbsp;<span class="code-act">generate a random number</span><br>
    &nbsp;&nbsp;<span class="code-act">subtract it in your mind</span><br>
    &nbsp;&nbsp;<span class="code-act">next student continues</span><br><br>

    &nbsp;&nbsp;<span class="code-key">if</span> <span class="code-cond">(wrong number is said)</span> {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-act">eliminated</span><br>
    &nbsp;&nbsp;}<br>
    }<br><br>
    `;

    rngBox.classList.remove("d-none");

    rngBtn.onclick = () => {
      const random = Math.floor(Math.random() * 9) + 1;
      rngNumber.innerHTML = random;
    };
  }

  if (game === "game3") {
    title.innerHTML = "Color Reaction Loop";

    desc.innerHTML = `
  <span class="code-comment">// reaction test</span><br><br>

  <span class="code-key running-loop">while</span> <span class="code-cond">(screen shows blue or black)</span> {<br>
  &nbsp;&nbsp;<span class="code-act">clap once</span><br>
  &nbsp;&nbsp;<span class="code-act">pause for 1 second</span><br><br>
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

  &nbsp;&nbsp;<span class="code-key">if</span> <span class="code-cond">(someone says wrong number)</span> {<br>
  &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-act">eliminated</span><br>
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
  "#2563eb",
  "#000000",
  "#172554", // midnight blue
  "#27272a", // soft black
  "#ff0000", // red
  "#22c55e", // green
  "#facc15", // yellow
  "#a855f7", // purple
  "#ffffff", // white
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

      const pause = Math.random() * 3000 + 5000;

      setTimeout(runShuffleCycle, pause);
    }
  }, 70);
}
