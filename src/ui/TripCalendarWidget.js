import moment from "moment";
import SelectionModel from "../core/selectionModel.js";
import { buildMonthGrid } from "../core/calendarModel.js";
import { normalizeDay } from "../core/dateRules.js";
import renderCalendar from "./renderCalendar.js";

function formatHuman(dateLike) {
  const d = normalizeDay(dateLike);
  if (!d) return "";
  return d.format("DD.MM.YYYY");
}

export default class TripCalendarWidget {
  constructor({
    calendarEl,
    departInput,
    returnInput,
    roundtripToggle,
    returnField,
    today = moment().startOf("day"),
  }) {
    this.calendarEl = calendarEl;
    this.departInput = departInput;
    this.returnInput = returnInput;
    this.roundtripToggle = roundtripToggle;
    this.returnField = returnField;

    this.model = new SelectionModel({ today });

    this.onDocClick = this.onDocClick.bind(this);
    this.onCalendarClick = this.onCalendarClick.bind(this);
    this.onDepartFocus = this.onDepartFocus.bind(this);
    this.onReturnFocus = this.onReturnFocus.bind(this);
    this.onToggle = this.onToggle.bind(this);

    this.bind();
    this.syncRoundtripUI();
    this.render();
    this.syncInputs();
  }

  bind() {
    document.addEventListener("click", this.onDocClick);
    this.calendarEl.addEventListener("click", this.onCalendarClick);
    this.departInput.addEventListener("click", this.onDepartFocus);
    this.returnInput.addEventListener("click", this.onReturnFocus);
    this.roundtripToggle.addEventListener("change", this.onToggle);
  }

  destroy() {
    document.removeEventListener("click", this.onDocClick);
    this.calendarEl.removeEventListener("click", this.onCalendarClick);
    this.departInput.removeEventListener("click", this.onDepartFocus);
    this.returnInput.removeEventListener("click", this.onReturnFocus);
    this.roundtripToggle.removeEventListener("change", this.onToggle);
  }

  open() {
    this.calendarEl.classList.add("calendar--open");
    this.calendarEl.setAttribute("aria-hidden", "false");
  }

  close() {
    this.calendarEl.classList.remove("calendar--open");
    this.calendarEl.setAttribute("aria-hidden", "true");
  }

  isOpen() {
    return this.calendarEl.classList.contains("calendar--open");
  }

  onDocClick(e) {
    const path = typeof e.composedPath === "function" ? e.composedPath() : null;

    const clickedInside = path
      ? path.includes(this.calendarEl) ||
        path.includes(this.departInput) ||
        path.includes(this.returnInput) ||
        path.includes(this.roundtripToggle)
      : this.calendarEl.contains(e.target) ||
        this.departInput.contains(e.target) ||
        this.returnInput.contains(e.target) ||
        this.roundtripToggle.contains(e.target);

    if (!clickedInside && this.isOpen()) {
      this.close();
    }
  }

  onDepartFocus() {
    this.model.setActiveField("depart");
    this.model.setCurrentMonth(this.model.departDate || this.model.today);
    this.render();
    this.open();
  }

  onReturnFocus() {
    if (!this.model.roundtrip) return;
    this.model.setActiveField("return");
    this.model.setCurrentMonth(
      this.model.returnDate || this.model.departDate || this.model.today,
    );
    this.render();
    this.open();
  }

  onToggle() {
    this.model.setRoundtrip(this.roundtripToggle.checked);
    this.syncRoundtripUI();
    this.syncInputs();
    this.render();
  }

  onCalendarClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { action } = e.target.dataset;
    if (action === "prev") {
      this.model.prevMonth();
      this.render();
      return;
    }
    if (action === "next") {
      this.model.nextMonth();
      this.render();
      return;
    }

    const iso = e.target.dataset.date;
    if (!iso) return;

    const ok = this.model.selectDate(iso);
    if (!ok) return;

    this.model.setCurrentMonth(iso);

    this.syncInputs();
    this.render();

    if (!this.model.roundtrip || this.model.activeField === "return") {
      if (!this.model.roundtrip) this.close();
      if (this.model.roundtrip && this.model.returnDate) this.close();
    }
  }

  syncRoundtripUI() {
    if (this.model.roundtrip) {
      this.returnField.style.display = "";
      this.returnInput.disabled = false;
    } else {
      this.returnField.style.display = "none";
      this.returnInput.disabled = true;
    }
  }

  syncInputs() {
    this.departInput.value = formatHuman(this.model.departDate);
    this.returnInput.value = formatHuman(this.model.returnDate);
  }

  render() {
    const gridModel = buildMonthGrid({
      currentMonth: this.model.currentMonth,
      today: this.model.today,
      mode: this.model.activeField,
      departDate: this.model.departDate,
      returnDate: this.model.returnDate,
    });
    renderCalendar(this.calendarEl, gridModel);
  }
}
