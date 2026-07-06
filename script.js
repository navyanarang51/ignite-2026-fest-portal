// DOM SELECTOR
const glow = document.querySelector(".cursor-glow");

// EVENT HANDLING: Mouse movement effect
document.addEventListener("mousemove", function (event) {
  glow.style.left = event.clientX + "px";
  glow.style.top = event.clientY + "px";
});

// TAB SWITCHING FUNCTION
function openTab(tabId, clickedButton) {
  const allTabs = document.querySelectorAll(".tab");
  const allButtons = document.querySelectorAll(".nav-btn");

  allTabs.forEach(function (tab) {
    tab.classList.remove("active");
  });

  allButtons.forEach(function (button) {
    button.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
  clickedButton.classList.add("active");
}

// 4. ARENA SWITCHING FUNCTION
function openArena(arenaId, clickedButton) {
  const allArenaSections = document.querySelectorAll(".arena-section");
  const allArenaButtons = document.querySelectorAll(".arena-btn");

  allArenaSections.forEach(function (section) {
    section.classList.remove("active");
  });

  allArenaButtons.forEach(function (button) {
    button.classList.remove("active");
  });

  document.getElementById(arenaId).classList.add("active");
  clickedButton.classList.add("active");
}

// 5. OBJECT + ARRAYS
const events = {
  tech: [
    "Hackathon",
    "Coding Battle",
    "Web Development",
    "App Development",
    "Debugging Challenge",
    "UI/UX Design",
  ],

  cultural: [
    "Solo Dance",
    "Group Dance",
    "Singing",
    "Fashion Show",
    "Poetry Slam",
  ],

  gaming: [
    "BGMI Tournament",
    "Valorant Clash",
    "FIFA Showdown",
    "Chess Battle",
  ],

  literary: ["Debate", "Creative Writing", "Quiz", "Open Mic"],
};

// 6. DYNAMIC EVENT CARDS USING LOOP
// backticks allow multi-line strings and variable interpolation
function loadEvents() {
  for (let category in events) {
    const eventContainer = document.getElementById(category);

    eventContainer.innerHTML = "";

    events[category].forEach(function (eventName) {
      eventContainer.innerHTML += ` 

        <div class="event-card">
          <h3>${eventName}</h3>
          <p>Register for ${eventName} and represent your college.</p>
          <button onclick="openEventForm('${eventName}')">Register</button>
        </div>
      `;
    });
  }
}

// 7. OPEN EVENT FORM + AUTO FILL
function openEventForm(eventName) {
  document.getElementById("eventBox").classList.remove("hidden");

  document.getElementById("eventTitle").innerText = "Register for " + eventName;
  document.getElementById("eventName").value = eventName;

  document.getElementById("eventPerson").value =
    localStorage.getItem("name") || "";

  document.getElementById("eventCollege").value =
    localStorage.getItem("college") || "";

  document.getElementById("eventEmail").value =
    localStorage.getItem("email") || "";

  document.getElementById("eventPhone").value =
    localStorage.getItem("phone") || "";

  document.getElementById("eventBox").scrollIntoView({
    behavior: "smooth",
  });
}

// 8. IF-ELSE: SHOW GROUP FIELDS
function toggleGroup() {
  const participationType = document.getElementById("type").value;

  if (participationType === "Group") {
    document.getElementById("groupBox").classList.remove("hidden");
  } else {
    document.getElementById("groupBox").classList.add("hidden");
  }
}

// 9. BASIC REGISTRATION FORM
document
  .getElementById("basicForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const college = document.getElementById("college").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const course = document.getElementById("course").value;
    const year = document.getElementById("year").value;
    const city = document.getElementById("city").value;

    localStorage.setItem("name", name);
    localStorage.setItem("college", college);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("course", course);
    localStorage.setItem("year", year);
    localStorage.setItem("city", city);

    const savedBox = document.getElementById("savedBox");
    savedBox.classList.remove("hidden");

    savedBox.innerHTML = `
    <h3>✅ Registration Saved</h3>
    <p>${name} from ${college}, ${year}, has been registered successfully.</p>
  `;

    alert("Basic registration saved!");
  });

// 10. EVENT FORM SUBMISSION
document
  .getElementById("eventForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Event registration submitted!");
  });

// 11. STAY COST CALCULATION
function calculateCost() {
  const roomPrice = Number(document.getElementById("room").value);
  const students = Number(document.getElementById("students").value);
  const arrivalDate = document.getElementById("arrival").value;
  const departureDate = document.getElementById("departure").value;

  if (!roomPrice || !students || !arrivalDate || !departureDate) {
    document.getElementById("cost").innerText = "₹0";
    return;
  }

  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);

  if (departure <= arrival) {
    document.getElementById("cost").innerText = "Invalid dates";
    return;
  }

  const oneDay = 1000 * 60 * 60 * 24;
  const nights = Math.ceil((departure - arrival) / oneDay);

  const totalCost = roomPrice * students * nights;

  document.getElementById("cost").innerText =
    `₹${totalCost} for ${students} student(s), ${nights} night(s)`;
}

// 12. STAY FORM SUBMISSION
document
  .getElementById("stayForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Stay request submitted!");
  });

// 13. COUNTDOWN TIMER
function startTimer() {
  // Set your fest date here
  const festDate = new Date("2026-09-15T09:00:00").getTime();

  const timer = setInterval(function () {
    const currentDate = new Date().getTime();
    const timeLeft = festDate - currentDate;

    if (timeLeft <= 0) {
      document.getElementById("timer").innerText = "🎉 Fest Started!";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    document.getElementById("timer").innerText =
      `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  }, 1000);
}

// Start the timer
startTimer();

// 14. DIGITAL ID CARD + QR CODE
function makeID() {
  const name = localStorage.getItem("name");
  const college = localStorage.getItem("college");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");

  if (!name || !college || !email || !phone) {
    alert("Please complete Basic Registration first.");
    return;
  }

  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const studentId = "IGNITE-2026-" + randomNumber;

  document.getElementById("cardName").innerText = name;
  document.getElementById("cardCollege").innerText = college;
  document.getElementById("cardEmail").innerText = email;
  document.getElementById("cardPhone").innerText = phone;
  document.getElementById("cardId").innerText = studentId;

  document.getElementById("card").classList.remove("hidden");

  document.getElementById("qrcode").innerHTML = "";

  new QRCode(document.getElementById("qrcode"), {
    text: `${studentId} | ${name} | ${college}`,
    width: 120,
    height: 120,
  });
}

// 15. FUNCTION CALLS
loadEvents();
startTimer();
