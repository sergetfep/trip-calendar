import "./css/style.css";
import TripCalendarWidget from "./ui/TripCalendarWidget.js";
import "./assets/favicon.ico";

const calendarEl = document.getElementById("calendar");
const departInput = document.getElementById("depart");
const returnInput = document.getElementById("return");
const roundtripToggle = document.getElementById("roundtrip");
const returnField = document.getElementById("return-field");

// eslint-disable-next-line no-new
new TripCalendarWidget({
  calendarEl,
  departInput,
  returnInput,
  roundtripToggle,
  returnField,
});
