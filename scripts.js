const placesToDonateTo = [
  ["https://irusa.org/middle-east/palestine/", "Palestine"],
  ["https://www.launchgood.com/communitypage/syria_1#!/community/syria_1/", "Syria"],
  ["https://sapa-usa.org/", "Sudan"],
  ["https://www.launchgood.com/v4/campaign/empowering_rohingya_children_through_education?", "Rohingyan Children"],
  ["https://www.launchgood.com/v4/campaign/mercy_bakery_yemen_5?src=internal_comm_page_support", "Yemen"],
  ["https://www.launchgood.com/v4/campaign/los_angeles_wildfires_emergency_2025?src=internal_comm_page", "Los Angeles Wildfire Relief"],
  ["https://www.launchgood.com/v4/campaign/fuel_your_health_building_a_free_clinic_in_uganda?src=", "a Ugandan Clinic"],
  ["https://www.launchgood.com/v4/campaign/palestine_mothers_and_babies?src=internal_discover", "Palestinian Mothers and Babies"]
];

const aesthetics = [
  ["Sleek", "Inter", ""],
  ["Cottagecore", "Playfair Display", ""],
  ["y2k", "LXGW Marker Gothic", ""],
  ["Vintage", "Savate", ""],
  ["Soft Girl", "Caveat", ""],
  ["General", "Caprasimo", "images/General.png"]
]

const playClass = "fa-solid fa-play fa-4x";
const pauseClass = "fa-solid fa-pause fa-4x";

document.addEventListener("DOMContentLoaded", () => {
  let restartBtn = document.querySelector(".restart");
  let settingsBtn = document.querySelector(".settings");
  let playPauseBtn = document.querySelector(".play-pause");

  let lightbox = document.querySelector(".lightbox");
  let xBtn = document.querySelector(".x");
  let saveTimeBtn = document.querySelector(".save-time");

  let hrsInput = document.querySelector("#hrs");
  let minsInput = document.querySelector("#mins");
  let secsInput = document.querySelector("#secs");

  let donationLink = document.querySelector("#donation-link");
  let num = Math.floor(Math.random() * placesToDonateTo.length);
  let message = placesToDonateTo[num][1];
  donationLink.textContent = message;
  donationLink.href = placesToDonateTo[num][0];

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
    let hrs = Number(hrsInput.value);
    let mins = Number(minsInput.value);
    let secs = Number(secsInput.value);

    let minsIncorrect = Number(minsInput.value) >= 60;
    let secsIncorrect = Number(secsInput.value) >= 60;

    if (minsIncorrect || secsIncorrect) {
      alert("Minutes/seconds must not be greater than 60.");
      return -1;
    }

    localStorage.setItem("hours", hrs);
    localStorage.setItem("minutes", mins);
    localStorage.setItem("seconds", secs);

    hrsInput.value = "";
    minsInput.value = "";
    secsInput.value = "";  
  }

  settingsBtn.addEventListener("click", displayLightbox);

});
