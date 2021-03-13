import { each } from '.';

export class MultiDynamic {

  set speed(speed) {
    each(this.dynamics, (d) => {
      d.speed = speed;
    });
  }

  constructor(dynamics, fn) {
    this.fn = fn;
    this.dynamics = dynamics;
  }

  goto(positions, speedMult = 1) {
    each(positions, (position, name) => {
      this.dynamics[name].goto(position, speedMult);
    });
  }

  step(steps, speedMult = 1) {
    each(steps, (step, name) => {
      this.dynamics[name].step(step, speedMult);
    });
  }

  roll(rolls, speedMult = 1) {
    each(rolls, (roll, name) => {
      this.dynamics[name].roll(roll, speedMult);
    });
  }

  stop() {
    each(this.dynamics, d => d.stop());
  }

  setCurrent(currents) {
    each(currents, (current, name) => {
      this.dynamics[name].setCurrent(current);
    });
  }

  update(elapsed) {
    let hasUpdates = false;
    const values = {};

    each(this.dynamics, (dynamic, name) => {
      hasUpdates |= dynamic.update(elapsed);
      values[name] = dynamic.current;
    });

    if (hasUpdates && this.fn) {
      this.fn(values);
    }

    return hasUpdates;
  }

}
