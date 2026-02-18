import moment from "moment";
import TripCalendarWidget from "../src/ui/TripCalendarWidget.js";

function setupDom() {
  document.body.innerHTML = `
    <div>
      <label><input id="roundtrip" type="checkbox" checked /></label>
      <div id="return-field"><input id="return" readonly /></div>
      <input id="depart" readonly />
      <div id="calendar"></div>
    </div>
  `;

  return {
    calendarEl: document.getElementById("calendar"),
    departInput: document.getElementById("depart"),
    returnInput: document.getElementById("return"),
    roundtripToggle: document.getElementById("roundtrip"),
    returnField: document.getElementById("return-field"),
  };
}

describe("TripCalendarWidget DOM", () => {
  test("opens on depart click and selects a valid date", () => {
    const els = setupDom();

    const widget = new TripCalendarWidget({
      ...els,
      today: moment("2026-02-17"),
    });

    els.departInput.click();
    expect(els.calendarEl.classList.contains("calendar--open")).toBe(true);

    const btn = els.calendarEl.querySelector('[data-date="2026-02-20"]');
    expect(btn).toBeTruthy();

    btn.click();
    expect(els.departInput.value).toBe("20.02.2026");

    widget.destroy();
  });

  test("disabled date click does not change depart", () => {
    const els = setupDom();

    const widget = new TripCalendarWidget({
      ...els,
      today: moment("2026-02-17"),
    });

    els.departInput.click();

    const disabledBtn = els.calendarEl.querySelector(
      '[data-date="2026-02-16"]',
    );
    expect(disabledBtn).toBeTruthy();
    expect(disabledBtn.disabled).toBe(true);

    disabledBtn.click();
    expect(els.departInput.value).toBe("");

    widget.destroy();
  });

  test("roundtrip off hides return and clears it", () => {
    const els = setupDom();

    const widget = new TripCalendarWidget({
      ...els,
      today: moment("2026-02-17"),
    });

    els.departInput.click();
    els.calendarEl.querySelector('[data-date="2026-02-20"]').click();
    els.returnInput.click();
    els.calendarEl.querySelector('[data-date="2026-02-22"]').click();

    expect(els.returnInput.value).toBe("22.02.2026");

    els.roundtripToggle.checked = false;
    els.roundtripToggle.dispatchEvent(new Event("change"));

    expect(els.returnField.style.display).toBe("none");
    expect(els.returnInput.value).toBe("");

    widget.destroy();
  });
});
