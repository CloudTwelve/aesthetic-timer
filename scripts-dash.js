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
  const renderPage = () => {
    renderCustomization();
    renderCreateNew();
    renderGoals();
  }
    const blinkTitle = () => {
      title.style.display = "none";
      setTimeout(() => {
        title.style.display = "inline-block";
      }, 400);
    };

    const renderCreateNew = () => {
      if (!(document.querySelector(".create-new") || editingGoal)) {
        containerFirst = main.firstChild;
        if (containerFirst) {
          main.insertBefore(createNew, containerFirst);
          console.log("createNew appended");
        } else {
          main.appendChild(createNew);
        }
      }
    }

    const renderGoals = () => {
      main.innerHTML = "";
      renderCreateNew();
      let numGoals;

      if (localStorage.getItem("goal-list")) {
        numGoals = localStorage.getItem("goal-list").length;
      } else {
        return -1;
      }

      console.log(localStorage.getItem("goal-list"));
      let goalsList = JSON.parse(localStorage.getItem("goal-list"));

      for (let key in goalsList) {
        let goal = existingGoal.cloneNode();
        let goalTop = document.createElement("div");
        goalTop.classList.add("goal-top", "standard");
        goalTop.innerText = key;
        let goalBottom = document.createElement("div");
        goalBottom.classList.add("goal-bottom", "standard");
        goalBottom.innerText = goalsList[key];
        goal.appendChild(goalTop);
        goal.appendChild(goalBottom);
        main.appendChild(goal);
      }
    }

    const renderCustomization = () => {
      if (currentTheme >= 6 || currentTheme < 0) {
      currentTheme = 0;
      }
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

    const handleCreatenewClick = () => {
      main.removeChild(createNew);
      containerFirst = main.firstChild;
      editingGoal = true;
      
      if (containerFirst) {
        main.insertBefore(goal, containerFirst);
      } else {
        main.appendChild(goal);
      }

      submitGoalBtn.addEventListener("click", submitGoal);
    }

    const submitGoal = () => {
      let newGoalTitle = goalInputTitle.value.toString();
      let newGoalContent = goalInputContent.value.toString();
      goalInputTitle.value = "";
      goalInputContent.value = "";

      console.log(newGoalTitle + " " + newGoalContent);

      if (!(newGoalTitle && newGoalContent)) {
        alert("Goal title and description must not be empty.");
      }

      let goalsObject;

      if (localStorage.getItem("goal-list")) {
        console.log("exists!");
        console.log(localStorage.getItem("goal-list"));
        goalsObject = JSON.parse(localStorage.getItem("goal-list"));
        goalsObject[newGoalTitle] = newGoalContent;
        localStorage.setItem("goal-list", JSON.stringify(goalsObject));
      } else {
        console.log("doesn't exist");
        let goalsObject = {};
        goalsObject[newGoalTitle] = newGoalContent;
        console.log(goalsObject[newGoalTitle]);
        console.log(goalsObject);
        console.log(JSON.stringify(goalsObject));
        localStorage.setItem("goal-list", JSON.stringify(goalsObject));
      }

      main.removeChild(goal);
      editingGoal = false;
      renderPage();
    }

    let body = document.querySelector("body");
    let title = document.querySelector(".title");
    let main = document.querySelector(".main");

    let titleClicked = false;
    let intervalBlinkTitle;

    let plusIcon = document.createElement("i");
    plusIcon.classList.add("fa-solid", "fa-plus", "plus-icon", "fa-lg");
    plusIcon.id = "new-plus";

    let createNew = document.createElement("div");
    createNew.classList.add("create-new");
    createNew.innerHTML = '<span class="cn-text standard">Create a new goal!</span>';
    createNew.appendChild(plusIcon);

    let goal = document.createElement("div");
    goal.classList.add("goal");
    goal.id = "new-goal";
    let topGoalNew = document.createElement("div");
    topGoalNew.classList.add("goal-top", "standard");
    let goalInputTitle = document.createElement("input");
    goalInputTitle.id = "goal-name";
    goalInputTitle.placeholder = "[Goal name here]";
    topGoalNew.appendChild(goalInputTitle);
    let submitGoalBtn = document.createElement("div");
    topGoalNew.appendChild(submitGoalBtn);
    let bottomGoalNew = document.createElement("div");
    bottomGoalNew.classList.add("goal-bottom", "standard");
    let goalInputContent = document.createElement("input");
    goalInputContent.id = "goal-specs";
    goalInputContent.placeholder = "[Goal description here]";
    bottomGoalNew.appendChild(goalInputContent);
    let plusIconSubmit = plusIcon.cloneNode();
    plusIconSubmit.classList.remove("fa-lg");
    plusIconSubmit.classList.add("fa-2xs");
    submitGoalBtn.appendChild(plusIconSubmit);
    submitGoalBtn.firstChild.id = "submit-plus";
    goal.appendChild(topGoalNew);
    goal.appendChild(bottomGoalNew);

    let existingGoal = document.createElement("div");
    existingGoal.classList.add("goal");

    let editingGoal = false;
    let containerFirst;

    renderPage();

    title.addEventListener("click", handleTitleClick);
    createNew.addEventListener("click", handleCreatenewClick);
});
