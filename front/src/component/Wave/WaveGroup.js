import { wave } from './wave.js';

export class WaveGroup {
  constructor(color) {
    this.totalWaves = 3;
    this.totalPoints = 5;
    this.waves = [];
    this.color = [
      'rgba(255,199,0,0.2)',
      'rgba(0,255,255,0.2)',
      'rgba(255,255,0,0.2)'
    ];

    for (let i = 0; i < this.totalWaves; i++) {
      const wave1 = new wave(i, this.totalPoints, this.color[i]);
      this.waves[i] = wave1;
    }
    console.log('waves ', this.waves);
  }

  resize(stateWidth, stateHeight) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(stateWidth, stateHeight);
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}
