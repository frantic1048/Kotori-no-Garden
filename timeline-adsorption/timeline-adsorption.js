
var SVGxmlns = 'http://www.w3.org/2000/svg';

var SVGHelper = {};

Object.defineProperties(
  SVGHelper,
  {
    'valueOf':{
      'get':function ( ) {return this.el;}
    },
    'x':{
      enumerable:true,
      configurable:false,
      'set':function (v) {this.el.setAttribute('x',v);},
      'get':function ( ) {return this.el.getAttribute('x');}
    },
    'y':{
      enumerable:true,
      configurable:false,
      'set':function (v) {this.el.setAttribute('y',v);},
      'get':function ( ) {return this.el.getAttribute('y');}
    },
    'height':{
      enumerable:true,
      configurable:false,
      'set':function (v) {this.el.setAttribute('height',v);},
      'get':function ( ) {return this.el.getAttribute('height');}
    },
    'width':{
      enumerable:true,
      configurable:false,
      'set':function (v) {this.el.setAttribute('width',v);},
      'get':function ( ) {return this.el.getAttribute('width');}
    }
  }
);

var timeline = Object.create(SVGHelper),
    timelineBase = Object.create(SVGHelper),
    timelineSelected = Object.create(SVGHelper),
    timelinePointer = Object.create(SVGHelper);

function getParentWidth (el) {
  return el.parentElement.clientWidth || el.parentElement.getAttribute('width');
}

function getParentHeight (el) {
  return el.parentElement.clientHeight || el.parentElement.getAttribute('height');
}

function pointerHandler(ev) {
  timelinePointer.x = ev.clientX - timelineBase.rect.left;
}

function clickHandler(ev) {
  var x = parseInt(ev.clientX, 10) - parseInt(timelineBase.rect.left, 10),
      l = parseInt(timelineSelected.x, 10),
      r = parseInt(timelineSelected.width, 10) + parseInt(timelineSelected.x, 10);
  
  // 假设分成10等分
  var xr = Math.round((x / parseFloat(timelineBase.width)) * 10);
  x = Math.round(xr * (parseFloat(timelineBase.width) / 10));
  
  if ( x <= l ) {
    // ____|___======______
    timelineSelected.width = r - x;
    timelineSelected.x = x;
  }
  else if ( x > l && x <= r ) {
    // ________===|===______
    // 戳左半动左边界，戳右半动右边界
    if ( x - l >= (r - l) / 2) {
      // 右侧
      timelineSelected.width = x - l;
    } 
    else {
      // 左侧
      timelineSelected.width = r - x;
      timelineSelected.x = x;
    }    
  }
  else if ( x > r) {
    // _______======___|___
    timelineSelected.width = x - l;
  }
}

function $(something) {console.log(something);}

function init () {
  timeline.el = document.getElementById('bar'); 
  timelinePointer.el = document.getElementById('timeline-pointer');
  timelineSelected.el = document.getElementById('timeline-selected');
  timelineBase.el = document.getElementById('timeline-base');
  
  timelineBase.rect = timelineBase.el.getBoundingClientRect();
  
  timeline.width = getParentWidth(timeline.el);
  timeline.el.setAttribute('viewBox','0 0 '+ timeline.width + ' ' + timeline.height);
  timelineBase.width = getParentWidth(timelineBase.el);
  
  timeline.el.addEventListener('mousemove',pointerHandler);
  timeline.el.addEventListener('click',clickHandler);
}

init();