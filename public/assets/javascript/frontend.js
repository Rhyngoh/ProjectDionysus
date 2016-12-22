/*
 * Demo of https://github.com/isuttell/sine-waves
 */

var width = 300;
var height = 300;
var amplitude = 20;
var speed = 1;
var ease = 'SineInOut';

var waves = [
  {
    timeModifer: 2,
    lineWidth: 1,
    amplitude: amplitude / 2,
    wavelength: 100,
    segmentLength: 1,
    type: 'Sawtooth',
  },
  {
    timeModifer: 2,
    lineWidth: 1,
    amplitude: -amplitude,
    wavelength: 100,
    segmentLength: 1,
    type: 'Sawtooth',
  },
  {
    timeModifer: 2,
    lineWidth: 1,
    amplitude: -amplitude,
    wavelength: 100,
    segmentLength: 1,
    type: 'Square',
  }
];

var resize = function() {
  var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
  gradient.addColorStop(0,"rgba(0, 128, 255, 0.5)");
  gradient.addColorStop(0.5,"rgba(255, 255, 255, 0.5)");
  gradient.addColorStop(1,"rgba(0, 128, 255, 0.5)");

  var index = -1;
  var length = this.waves.length;
    while(++index < length){
    this.waves[index].strokeStyle = gradient;
  }

  // Clean Up
  index = void 0;
  length = void 0;
  gradient = void 0;
};

new SineWaves({
  el: document.getElementById('bottom-waves'),

  speed: speed,
  width: width,
  height: height,
  ease: ease,
  waves: waves,
  rotate: 0,
  resizeEvent: resize
});

new SineWaves({
  el: document.getElementById('top-waves'),

  speed: -speed,
  width: width,
  height: height,
  ease: ease,
  waves: waves,
  rotate: 0,
  resizeEvent: resize
});

new SineWaves({
  el: document.getElementById('left-waves'),

  speed: speed,
  width: height,
  height: width,
  ease: ease,
  waves: waves,
  rotate: 90,
  resizeEvent: resize
});

new SineWaves({
  el: document.getElementById('right-waves'),

  speed: -speed,
  width: height,
  height: width,
  ease: ease,
  waves: waves,
  rotate: 90,
  resizeEvent: resize
});
