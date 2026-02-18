import moment from 'moment';
import { normalizeDay, isDepartAllowed, isReturnAllowed } from './dateRules.js';

export default class SelectionModel {
  constructor({ today = moment().startOf('day') } = {}) {
    this.today = normalizeDay(today);
    this.roundtrip = true;
    this.activeField = 'depart';
    this.currentMonth = this.today.clone();
    this.departDate = null;
    this.returnDate = null;
  }

  setRoundtrip(value) {
    this.roundtrip = Boolean(value);
    if (!this.roundtrip) {
      this.returnDate = null;
      this.activeField = 'depart';
    }
  }

  setActiveField(field) {
    if (field === 'depart' || field === 'return') {
      this.activeField = field;
    }
  }

  setCurrentMonth(monthLike) {
    this.currentMonth = normalizeDay(monthLike) || this.today.clone();
  }

  nextMonth() {
    this.currentMonth = this.currentMonth.clone().add(1, 'month');
  }

  prevMonth() {
    this.currentMonth = this.currentMonth.clone().subtract(1, 'month');
  }

  selectDate(dateLike) {
    const d = normalizeDay(dateLike);
    if (!d) return false;

    if (this.activeField === 'return' && this.roundtrip) {
      if (!isReturnAllowed(d, this.today, this.departDate)) return false;
      this.returnDate = d;
      return true;
    }

    if (!isDepartAllowed(d, this.today)) return false;
    this.departDate = d;

    if (this.returnDate && this.returnDate.isBefore(this.departDate, 'day')) {
      this.returnDate = null;
    }

    if (this.roundtrip) {
      this.activeField = 'return';
    }

    return true;
  }
}
