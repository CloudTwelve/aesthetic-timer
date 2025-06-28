const aesthetics = [
  ["General", "Caprasimo", "url('images/General.png')", "normal"],
  ["Dark", "Inter", "url('images/Dark.png')","900"],
  ["Cottagecore", "Playfair Display", "url('images/Cottagecore.png')", "800"],
  ["y2k", "LXGW Marker Gothic", "url('images/Y2K.png')", "normal"],
  ["Vintage", "Savate", "url('images/Vintage.png')", "normal"],
  ["Soft Girl", "Libre Baskerville", "url('images/SoftGirl.png')", "normal"]
];

let currentTheme;
let dashBoardTitle;

if (localStorage.getItem("currentTheme")) {
  currentTheme = localStorage.getItem("currentTheme");
} else {
  currentTheme = 0;
}

if (localStorage.getItem("dashboardTitle")) {
  dashboardTitle = localStorage.getItem("dashboardTitle");
} else {
  dashboardTitle = "[Name your Dashboard!]";
}

document.addEventListener("DOMContentLoaded", () => {
    const blinkTitle = () => {
      title.style.display = "none";
      setTimeout(() => {
        title.style.display = "inline-block";
      }, 400);
    };

    const renderCustomization = () => {
      body.style.backgroundImage = aesthetics[currentTheme][2];
      title.style.fontFamily = aesthetics[currentTheme][1];
      title.style.fontWeight = aesthetics[currentTheme][3];
      title.textContent = dashboardTitle;
    }

    const handleTitleClick = () => {
      if (!titleClicked) {
        console.log("title clicked!");
      intervalBlinkTitle = setInterval(blinkTitle, 1800);
      title.textContent = title.textContent.trim();
      document.addEventListener("keydown", handleTitleInput);
      } else {
        finishTitleInput();
      }
      titleClicked = true;
    };

    const handleTitleInput = (event) => {
      console.log(event.key);
      if (event.key == "Backspace") {
        console.log("backspaced");
        console.log(title.textContent + ".");
        title.textContent = title.textContent.slice(0,-1);
      } else if (event.key == "Enter") {
        finishTitleInput();
      } else if (event.key == "Shift") {
        console.log("shift in possibilities")
      } else {
        console.log("yup, " + event.key + " pressed alright");
        title.textContent += event.key;
      }
    };

    const finishTitleInput = () => {
      console.log("enter pressed");
      clearInterval(intervalBlinkTitle);
      title.removeEventListener("click", handleTitleClick);
      document.removeEventListener("keydown", handleTitleInput);
      titleClicked = false;
      localStorage.setItem("dashboardTitle", title.textContent);
    };

    let body = document.querySelector("body");
    let title = document.querySelector(".title");
    let main = document.querySelector(".main");

    let titleClicked = false;
    let intervalBlinkTitle;

    let plusIcon = document.createElement("i");
    plusIcon.classList.add("fa-solid", "fa-plus", "plus-icon");

    let createNew = document.createElement("div");
    createNew.classList.add("create-new");
    createNew.innerHTML = '<span class="cn-text standard">Create a new goal!</span>';
    createNew.appendChild(plusIcon);

    let editingGoal = false;

    renderCustomization();

    if (!(document.querySelector(".create-new") || editingGoal)) {
      let containerFirst = main.firstChild;
      main.insertBefore(createNew, containerFirst);
      console.log("createNew appended");
    }

    title.addEventListener("click", handleTitleClick);
});
