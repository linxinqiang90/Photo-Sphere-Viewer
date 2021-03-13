import { bound } from '.';

export class Dynamic {

  static STOP = 0;
  static INFINITE = 1;
  static POSITION = 2;

  constructor(fn, min = -Infinity, max = Infinity) {
    this.fn = fn;
    this.mode = Dynamic.STOP;
    this.speed = 0;
    this.speedMult = 1;
    this.currentSpeed = 0;
    this.target = 0;
    this.current = 0;
    this.min = min;
    this.max = max;
  }

  /**
   * Defines the target position
   */
  goto(position, speedMult = 1) {
    this.mode = Dynamic.POSITION;
    this.target = bound(position, this.min, this.max);
    this.speedMult = speedMult;
  }

  /**
   * Increase/decrease the target position
   */
  step(val, speedMult = 1) {
    if (this.mode === Dynamic.INFINITE) {
      this.target = this.current;
    }
    this.goto(this.target + val, speedMult);
  }

  /**
   * Starts infinite movement
   */
  roll(invert = false, speedMult = 1) {
    this.mode = Dynamic.INFINITE;
    this.target = invert ? -Infinity : Infinity;
    this.speedMult = speedMult;
  }

  /**
   * Stops movement
   */
  stop() {
    this.mode = Dynamic.STOP;
  }

  /**
   * Define the current position and immediately stops movement
   */
  setCurrent(current) {
    this.current = current;
    this.target = current;
    this.mode = Dynamic.STOP;
  }

  update(elapsed) {
    // in position mode switch to stop mode when in the decceleration window
    if (this.mode === Dynamic.POSITION) {
      const dstStop = this.currentSpeed * this.currentSpeed / (this.speed * this.speedMult * 4);
      if (Math.abs(this.target - this.current) < dstStop) {
        this.mode = Dynamic.STOP;
      }
    }

    // compute speed
    const targetSpeed = this.mode === Dynamic.STOP ? 0 : this.speed * this.speedMult;
    if (this.currentSpeed < targetSpeed) {
      this.currentSpeed = Math.min(targetSpeed, this.currentSpeed + elapsed / 1000 * this.speed * this.speedMult * 2);
    }
    else if (this.currentSpeed > targetSpeed) {
      this.currentSpeed = Math.max(targetSpeed, this.currentSpeed - elapsed / 1000 * this.speed * this.speedMult * 2);
    }

    // compute new position
    let next = null;
    if (this.current > this.target && this.currentSpeed) {
      next = Math.max(this.target, this.current - this.currentSpeed * elapsed / 1000);
    }
    else if (this.current < this.target && this.currentSpeed) {
      next = Math.min(this.target, this.current + this.currentSpeed * elapsed / 1000);
    }

    // apply value
    if (next !== null) {
      next = bound(next, this.min, this.max);
      if (next !== this.current) {
        this.current = next;
        if (this.fn) {
          this.fn(this.current);
        }
        return true;
      }
    }

    return false;
  }

}
