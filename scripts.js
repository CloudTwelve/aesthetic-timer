const placesToDonateTo = [
  ["https://irusa.org/middle-east/palestine/", "Palestine"],
  ["https://www.launchgood.com/communitypage/syria_1#!/community/syria_1/", "Syria"],
  ["https://sapa-usa.org/", "Sudan"],
  ["https://www.launchgood.com/v4/campaign/empowering_rohingya_children_through_education?", "Rohingyan Children"],
  ["https://www.launchgood.com/v4/campaign/mercy_bakery_yemen_5?src=internal_comm_page_support", "Yemen"],
  ["https://www.launchgood.com/v4/campaign/feeding_the_fasting_one_mile_at_a_time?src=internal_search_discover_homeless", "NYC's Homeless"],
  ["https://www.launchgood.com/v4/campaign/water_wells_for_uganda?src=internal_search_discover_uganda", "Wells in Uganda"],
  ["https://www.launchgood.com/v4/campaign/palestine_mothers_and_babies?src=internal_discover", "Palestinian Mothers and Babies"]
];

const aesthetics = [
  ["General", "Caprasimo", "url('images/General.png')", "normal"],
  ["Dark", "Inter", "url('images/Dark.png')","900"],
  ["Cottagecore", "Playfair Display", "url('images/Cottagecore.png')", "800"],
  ["y2k", "LXGW Marker Gothic", "url('images/Y2K.png')", "normal"],
  ["Vintage", "Savate", "url('images/Vintage.png')", "normal"],
  ["Soft Girl", "Libre Baskerville", "url('images/SoftGirl.png')", "normal"]
];

const playClass = "fa-solid fa-play fa-4x";
const pauseClass = "fa-solid fa-pause fa-4x";

let currentTheme;

document.addEventListener("DOMContentLoaded", () => { 
  const renderTheme = () => {
    if (localStorage.getItem("currentTheme")) {
      currentTheme = localStorage.getItem("currentTheme");
    } else {
      currentTheme = 0;
    }
    if (currentTheme >= 6 || currentTheme < 0) {
      currentTheme = 0;
    }
    console.log(aesthetics[currentTheme][0] + " is current theme");
    body.style.backgroundImage = aesthetics[currentTheme][2];
    for (let i = 0; i < timerNums.length; i++) {
      timerNums[i].style.fontFamily = aesthetics[currentTheme][1];
      timerNums[i].style.fontWeight = aesthetics[currentTheme][3];
    }
    console.log("theme rendered!");
  }
  const changeTheme = (increase) => {
    increase ? currentTheme++ : currentTheme--;
    if (currentTheme > aesthetics.length) {
      currentTheme = 0;
    } else if (currentTheme < 0) {
      currentTheme = aesthetics.length - 1;
    }
    localStorage.setItem("currentTheme", currentTheme);
    console.log("current theme: " + aesthetics[currentTheme][0])
    renderTheme();
  }
  const displayLightbox = () => {
    lightbox.style.display = "block";
    xBtn.addEventListener("click", hideLightbox);
    console.log("lightbox displayed!");
    saveTimeBtn.addEventListener("click", handleTimerChange);
  }

  const hideLightbox = () => {
    xBtn.removeEventListener("click", hideLightbox);
    lightbox.style.display = "none";
  }

  const handleTimerChange = () => {
    pauseTimer();

    let hrs = Number(hrsInput.value);
    let mins = Number(minsInput.value);
    let secs = Number(secsInput.value);

    let minsIncorrect = Number(minsInput.value) >= 60;
    let secsIncorrect = Number(secsInput.value) >= 60;

    let hrsZero = Number(minsInput.value) == 0;
    let minsZero = Number(minsInput.value) == 0;
    let secsZero = Number(minsInput.value) == 0;

    if (minsIncorrect || secsIncorrect) {
      alert("Minutes/seconds must not be greater than 60.");
      return -1;
    } else if (hrsZero && minsZero && secsZero) {
      alert("Hours, minutes, and seconds cannot all be zero.");
      return -1;
    }

    localStorage.setItem("totalSecs", (hrs * 60 * 60) + (mins * 60) + (secs));
    localStorage.setItem("secsLeft", (hrs * 60 * 60) + (mins * 60) + (secs));

    hrsInput.value = "";
    minsInput.value = "";
    secsInput.value = "";
    
    updateDisplay();
  }

  const playTimer = () => {
    timerRun = setInterval(updateTime, 1000);
  }

  const pauseTimer = () => {
    clearInterval(timerRun);
  }

  const updateTime = () => {
    let currentTime = localStorage.getItem("secsLeft");
    currentTime--;
    localStorage.setItem("secsLeft", currentTime);
    console.log(currentTime + " current time (s)");
    updateDisplay();
  }

  const updateDisplay = () => {
    if (!localStorage.getItem("totalSecs")) { // check for saved timer
      localStorage.setItem("totalSecs", 5 * 60) // 5 minutes default
    }

    if (!localStorage.getItem("secsLeft")) { // check for running timer
      localStorage.setItem("secsLeft", localStorage.getItem("totalSecs")); // set equal to above default timer
    }

    let currentTime = localStorage.getItem("secsLeft");
    if (currentTime < (60 * 60)) {
      hrsColon.textContent = "";
    } else {
      hrsColon.textContent = ":";
    }

    let hours = Math.floor(currentTime / 3600);
    if (hours < 10 && hours != 0) {
      hours = "0" + hours;
    } else if (hours == 0) {
      hours = "";
    }
    hrsDisplay.textContent = hours;

    currentTime = currentTime - (Number(hours) * 3600);

    let mins = Math.floor(currentTime / 60);
    if (mins < 10) {
      mins = "0" + mins;
    }
    minsDisplay.textContent = mins;

    let secs = currentTime % 60;
    if (secs < 10) {
      secs = "0" + secs;
    }
    secsDisplay.textContent = secs;
  }

  const resetDisplay = () => {
    pauseTimer();
    let totalSeconds = localStorage.getItem("totalSecs");
    localStorage.setItem("secsLeft", totalSeconds);
    updateDisplay();
  }

  let timerRun;

  let body = document.querySelector("body");

  let timerNums = document.querySelector(".timer").children;

  let hrsDisplay = document.querySelector(".hrs");
  let minsDisplay = document.querySelector(".mins");
  let secsDisplay = document.querySelector(".secs");

  let hrsColon = document.querySelector("#c-hrs");

  let restartBtn = document.querySelector(".restart");
  let settingsBtn = document.querySelector(".settings");
  let playPauseBtn = document.querySelector(".play-pause");
  let playPauseIcon = document.querySelector("#play-pause-icon");

  let rightBtn = document.querySelector(".right");
  let leftBtn = document.querySelector(".left");

  let lightbox = document.querySelector(".lightbox");
  let xBtn = document.querySelector(".x");
  let saveTimeBtn = document.querySelector(".save-time");
  let sizeBtn = document.querySelector("#sizes");
  let clearBtn = document.querySelector(".danger-btn");

  let hrsInput = document.querySelector("#hrs");
  let minsInput = document.querySelector("#mins");
  let secsInput = document.querySelector("#secs");

  let donationLink = document.querySelector("#donation-link");
  let num = Math.floor(Math.random() * placesToDonateTo.length);
  let message = placesToDonateTo[num][1];
  donationLink.textContent = message;
  donationLink.href = placesToDonateTo[num][0];

  playPauseIcon.className = playClass;
  updateDisplay();
  renderTheme();

  settingsBtn.addEventListener("click", displayLightbox);
  playPauseBtn.addEventListener("click", () => {
    if (playPauseIcon.className == playClass) {
      playTimer();
      playPauseIcon.className = pauseClass;
    } else {
      pauseTimer();
      playPauseIcon.className = playClass;
    }
  });
  restartBtn.addEventListener("click", resetDisplay);
  rightBtn.addEventListener("click", () => {
    changeTheme(true);
  });
  leftBtn.addEventListener("click", () => {
    changeTheme(false);
  });
  sizeBtn.addEventListener("change", (event) => {
    console.log("change in size!");
    let size;
    console.log(event.target.value);
    switch (event.target.value) {
      case "small":
        size = "6rem";
        break;
      case "medium":
        size = "8rem";
        break;
      case "large":
        size = "10rem";
        break;
      case "huge":
        size = "12rem";
    }

    console.log(size);

    for (let i = 0; i < timerNums.length; i++) {
      timerNums[i].style.fontSize = size;
    }
  });
  clearBtn.addEventListener("click", () => {
    console.log('Clear clicked');
    pauseTimer();
    localStorage.clear();
    renderTheme();
    updateDisplay();
  });
});
