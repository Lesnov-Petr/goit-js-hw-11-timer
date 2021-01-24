class CountdownTimer {
  constructor(selector, targetDate) {
    this.selector = document.querySelector(selector);
    this.targetDate = new Date(targetDate);
    this.markup = this.createMarkup();
    this.refs = {
      days: document.querySelector('span[data-value="Days"]'),
      hours: document.querySelector('span[data-value="Hours"'),
      mins: document.querySelector('span[data-value="Minutes"]'),
      secs: document.querySelector('span[data-value="Seconds"]'),
    };
    this.startTimer = this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      const currentData = new Date();
      const deltaTime = this.targetDate - currentData;
      this.updateClockface(deltaTime);
    }, 1000);
  }

  updateClockface(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.mins.textContent = mins;
    this.refs.secs.textContent = secs;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  createMarkup() {
    const arrayDate = ['Days', 'Hours', 'Minutes', 'Seconds'];
    const arrayMarkup = [];

    arrayDate.forEach(el => {
      const blockField = document.createElement('div');
      blockField.classList.add('field');
      const spanTime = document.createElement('span');
      spanTime.classList.add('value');
      spanTime.setAttribute('data-value', el);
      const spanLabel = document.createElement('span');
      spanLabel.classList.add('label');
      spanLabel.textContent = el;
      blockField.append(spanTime, spanLabel);
      arrayMarkup.push(blockField);
    });
    this.selector.append(...arrayMarkup);
  }
}

const testTimer = new CountdownTimer('#timer-1', 'Jul 21, 2021');
