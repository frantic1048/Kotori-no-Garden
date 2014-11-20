var classModer = new function () {
  //class modifier

  // xxxActive
  // toogle/add/remove "avtive" class.
  // need at least 1 argument.(a DOM element)
  // single argument (array)          : [DOM element,DOM element...]
  // multi arguments (DOM elements)   : DOM element,DOM element...


  this.toggleActive = function() {
    for(var i = 0;i < arguments.length;++i){
      var el = arguments[i];
      if (!(el.classList.contains('active'))){
        el.classList.add('active');
      }
      else{
        el.classList.remove('active');
      }
    }
    return 0;
  };

  this.setActive = function () {
    for(var i = 0;i < arguments.length;++i){
      var el = arguments[i];
      if(!(el.classList.contains('active'))){
        el.classList.add('active');
      }
    }
    return 0;
  };

  this.unsetActive = function () {
    for(var i = 0;i < arguments.length;++i){
      var el = arguments[i];
      if(el.classList.contains('active')){
        el.classList.remove('active');
      }
    }
    return 0;
  };
};

var dragBra = new function () {
  var movingEl = null,   //被拖动的元素
      triggerEl = null,  //触发拖动的元素
      lastElPos = {top:null,left:null}, //拖动开始时被拖动的元素位置
      lastMousePos = {x:null,y:null},   ////拖动开始时鼠标位置
      isMoving = false;

  var draggingBra = function (ev) {
    if (isMoving) {
      movingEl.style.top  = (lastElPos.top  + ev.clientY - lastMousePos.y).toString() + 'px';
      movingEl.style.left = (lastElPos.left + ev.clientX - lastMousePos.x).toString() + 'px';
      try {window.getSelection().removeAllRanges();} catch(e) {;}//避免拖动的时候产生选区
    }
  };

  var startDragBra = function (ev) {
    classModer.setActive(movingEl);
    isMoving = true;


    lastMousePos.x = ev.clientX;
    lastMousePos.y = ev.clientY;

    lastElPos.top = movingEl.getBoundingClientRect().top + (movingEl.style.position == 'absolute' ? window.scrollY : 0 );
    lastElPos.left = movingEl.getBoundingClientRect().left + (movingEl.style.position == 'absolute' ? window.scrollX : 0 );
  };

  var stopDragBra = function (ev) {
    classModer.unsetActive(movingEl);
    isMoving = false;
  };

  var getTarget = function () {
    //get elements
    movingEl = document.querySelector('#hana-svg');
    triggerEl = document.querySelector('#hana');
  };

  var bindEvent = function () {
    //bind event func
    triggerEl.addEventListener('mousedown', startDragBra);
    window.addEventListener('mouseup', stopDragBra);
    window.addEventListener('mousemove', draggingBra);
  };

  this.init = function () {
    getTarget();
    bindEvent();
  };

  this.setAbsoluteDrag = function (el) {
    movingEl.style.top  = (movingEl.getBoundingClientRect().top + window.scrollY).toString() + 'px';
    movingEl.style.left = (movingEl.getBoundingClientRect().left + window.scrollX).toString() + 'px';
    movingEl.style.position = 'absolute';
    (function (btns) {
      classModer.setActive(btns[0]);
      classModer.unsetActive(btns[1]);
    })(document.getElementById('drag-panel').children);
  };
  this.setFixedDrag = function () {
    movingEl.style.top  = movingEl.getBoundingClientRect().top.toString() + 'px';
    movingEl.style.left = movingEl.getBoundingClientRect().left.toString() + 'px';
    movingEl.style.position = 'fixed';
    (function (btns) {
      classModer.setActive(btns[1]);
      classModer.unsetActive(btns[0]);
    })(document.getElementById('drag-panel').children);
  };
};
