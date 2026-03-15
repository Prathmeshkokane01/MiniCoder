let currentDifficulty = "Easy";
let currentStep = 0;
let currentTopicIndex = 0;

// Mission Data (10 for each)
const missions = {
    Easy: [
        { title: "Power Source", task: "Create <b>power = 100</b>", check: "power = 100", info: "Power stored!", hint: "Try: power = 100", tech: "Assignment (=) stores values." },
        { title: "Shield Status", task: "Set <b>shield = 50</b>", check: "shield = 50", info: "Shield Active!", hint: "Try: shield = 50", tech: "Integers represent whole numbers." },
        { title: "Hero Name", task: "Variable: <b>hero = 'Arjuna'</b>", check: "hero = 'Arjuna'", info: "Identified!", hint: "Use quotes: hero = 'Arjuna'", tech: "Strings are text wrapped in quotes." },
        { title: "Arrow Count", task: "Set <b>arrows = 500</b>", check: "arrows = 500", info: "Quiver Loaded!", hint: "Try: arrows = 500", tech: "Large integers store numeric data." },
        { title: "Mission Active", task: "Boolean: <b>active = True</b>", check: "active = True", info: "Mission Start!", hint: "Capital T: active = True", tech: "Booleans represent True or False." },
        { title: "Chariot Speed", task: "Decimal: <b>speed = 45.5</b>", check: "speed = 45.5", info: "Acceleration!", hint: "Try: speed = 45.5", tech: "Floats are numbers with decimals." },
        { title: "Victory Sum", task: "Sum: <b>result = 10 + 20</b>", check: "result = 10 + 20", info: "Calculated!", hint: "Try: result = 10 + 20", tech: "Math operators perform arithmetic." },
        { title: "Secret Pin", task: "Set <b>pin = 1234</b>", check: "pin = 1234", info: "Access Granted!", hint: "Try: pin = 1234", tech: "Numeric values act as keys." },
        { title: "Team Pandava", task: "Set <b>team = 'Five'</b>", check: "team = 'Five'", info: "Recruited!", hint: "Try: team = 'Five'", tech: "Strings can hold textual IDs." },
        { title: "Final Energy", task: "Multiply: <b>energy = 5 * 20</b>", check: "energy = 5 * 20", info: "Max Level!", hint: "Use *: energy = 5 * 20", tech: "The * operator multiplies values." }
    ],
    Moderate: [
        { title: "Health Gate", task: "Check: <b>if health < 20:</b>", check: "if health < 20:", info: "Decision Made!", hint: "End with a colon: if health < 20:", tech: "If-statements allow conditional logic." },
        { title: "Strike Loop", task: "Loop 10: <b>for i in range(10):</b>", check: "for i in range(10):", info: "Multi-Strike!", hint: "Try: for i in range(10):", tech: "For-loops repeat code blocks." }
    ],
    High: [
        { title: "Divine Strike", task: "Function: <b>def attack():</b>", check: "def attack():", info: "Move Learned!", hint: "Try: def attack():", tech: "Functions define reusable code blocks." }
    ]
};

// Hanuman Topics
const topics = [
    `<h2>Intro to Python</h2><p>Python is simple and powerful. It gives instructions to computers.</p><pre>print("Hello World")</pre>`,
    `<h2>Print Statement</h2><p>The print() function shows messages on the screen.</p><pre>print("Welcome!")</pre>`,
    `<h2>Variables</h2><p>A variable is a container that stores info like numbers or text.</p><pre>name = "Ram"</pre>`,
    `<h2>Data Types</h2><p>Common types: Integer (10), Float (10.5), String ("Text"), Boolean (True).</p>`,
    `<h2>Input</h2><p>input() lets the user enter information into the program.</p><pre>x = input()</pre>`,
    `<h2>Operators</h2><p>Perform math: +, -, *, /.</p><pre>print(10 + 5)</pre>`
];

// Navigation Logic
function showRegister() { document.getElementById("registerForm").style.display="block"; document.getElementById("loginForm").style.display="none"; document.getElementById("regTab").classList.add("active"); document.getElementById("logTab").classList.remove("active"); }
function showLogin() { document.getElementById("registerForm").style.display="none"; document.getElementById("loginForm").style.display="block"; document.getElementById("logTab").classList.add("active"); document.getElementById("regTab").classList.remove("active"); }
function login(e) { e.preventDefault(); if (document.getElementById("user").value === "coder" && document.getElementById("pass").value === "1234") { document.getElementById("authPage").classList.add("hidden"); document.getElementById("teamPage").classList.remove("hidden"); } else { alert("Use: coder / 1234"); } }
function selectTeam(t) { document.getElementById("teamPage").classList.add("hidden"); document.getElementById("difficultyPage").classList.remove("hidden"); document.getElementById("teamLogo").src = (t==='karan') ? 'karan.png' : 'arjun.png'; }
function selectDifficulty(l) { currentDifficulty = l; currentStep = 0; document.getElementById("difficultyPage").classList.add("hidden"); document.getElementById("dashboard").classList.remove("hidden"); document.getElementById("diffTag").innerText = "Level: "+l; document.getElementById("difficultyLabel").innerText = "Difficulty: "+l; }

// Learning Logic
function startLearning() { document.getElementById("dashboard").classList.add("hidden"); document.getElementById("learningPage").classList.remove("hidden"); currentTopicIndex = 0; animateHanuman(); }
function animateHanuman() {
    let h = document.getElementById("hanumanImg");
    let box = document.getElementById("learningContentBox");
    box.style.display = "none";
    h.classList.remove("hanuman-slide");
    setTimeout(() => {
        h.classList.add("hanuman-slide");
        setTimeout(() => { box.innerHTML = topics[currentTopicIndex]; box.style.display = "block"; }, 1300);
    }, 50);
}
function nextTopic() { if (currentTopicIndex < topics.length - 1) { currentTopicIndex++; animateHanuman(); } }
function prevTopic() { if (currentTopicIndex > 0) { currentTopicIndex--; animateHanuman(); } }

// Code Mission Logic
function startWriteCode() { document.getElementById("dashboard").classList.add("hidden"); document.getElementById("editorPage").classList.remove("hidden"); loadMission(); }
function loadMission() {
    const m = missions[currentDifficulty][currentStep];
    document.getElementById("questTitle").innerText = m.title;
    document.getElementById("objectiveText").innerHTML = m.task;
    document.getElementById("questionNum").innerText = `${currentStep+1}/10`;
    document.getElementById("codeEditor").value = "";
    document.getElementById("outputConsole").innerText = ">_ Waiting for code...";
}
function evaluateCode() {
    const code = document.getElementById("codeEditor").value.trim();
    const m = missions[currentDifficulty][currentStep];
    if (code.includes(m.check)) {
        document.getElementById("modalDesc").innerText = m.info;
        document.getElementById("infoModal").classList.remove("hidden");
    } else {
        document.getElementById("hintText").innerText = m.hint;
        document.getElementById("techInfo").innerText = "Tech: " + m.tech;
        document.getElementById("hintModal").classList.remove("hidden");
    }
}
function closeModal() { document.getElementById("infoModal").classList.add("hidden"); currentStep++; if (currentStep < 10 && currentStep < missions[currentDifficulty].length) loadMission(); else goHome(); }
function closeHint() { document.getElementById("hintModal").classList.add("hidden"); }
function goHome() { document.getElementById("editorPage").classList.add("hidden"); document.getElementById("learningPage").classList.add("hidden"); document.getElementById("dashboard").classList.remove("hidden"); }
function togglePassword(id) { const i = document.getElementById(id); i.type = (i.type === "password") ? "text" : "password"; }