var iWannaDrag = new function () {
  //Usege
  //for draghandler element,add a drag-handle-for propertie name,and set the value as the target element's id;
  //if leave blank value for drag-handle-for propertie,it means to be drag handler for itself
  //<... drag-handle-for="id-for-dragging-target" ...></...>
  var handleFor = 'drag-handle-for',
      handles = [],
      draggingElements = [];
  var startDrag = function (ev) {
    //push elment will be drag with it data to draggingElements
    (function (target) {
      draggingElements.push({'element' : target,
                             'initElmentPos' : {
                               'left' : target.getBoundingClientRect().left + (target.style.position == 'absolute' ? window.scrollX : 0 ),
                               'top' : target.getBoundingClientRect().top + (target.style.position == 'absolute' ? window.scrollY : 0 )
                              },
                              'initMousePos' : {
                                'x' :ev.clientX,
                                'y' :ev.clientY
                              }
                            });
    })
    (document.getElementById(ev.target.getAttribute(handleFor) || ev.target));
  };
  var durDrag = function (ev) {
    try {window.getSelection().removeAllRanges();} catch(e) {;}
    draggingElements.filter(function (oDre) {
      oDre.element.style.left = (oDre.initElmentPos.left + ev.clientX - oDre.initMousePos.x).toString() + 'px';
      oDre.element.style.top = (oDre.initElmentPos.top + ev.clientY - oDre.initMousePos.y).toString() + 'px';
    });
  };
  var stopDrag = function () { draggingElements = []; };
  this.init = function () {
    handles = Array.prototype.slice.call(document.querySelectorAll('[' + handleFor + ']'));
    Array.prototype.filter.call(handles,function (el) { el.addEventListener('mousedown',startDrag); });
    window.addEventListener('mousemove',durDrag);
    window.addEventListener('mouseup', stopDrag);
  };
};
var dradMod = new function () {
  this.setAbsoluteDrag = function (el) {
    el.style.top  = (el.getBoundingClientRect().top + window.scrollY).toString() + 'px';
    el.style.left = (el.getBoundingClientRect().left + window.scrollX).toString() + 'px';
    el.style.position = 'absolute';
    (function (btns) {
      classie.add(btns[0], 'active');
      classie.remove(btns[1], 'active');
    })(document.getElementById('drag-panel').children);
  };
  this.setFixedDrag = function (el) {
    el.style.top  = el.getBoundingClientRect().top.toString() + 'px';
    el.style.left = el.getBoundingClientRect().left.toString() + 'px';
    el.style.position = 'fixed';
    (function (btns) {
      classie.add(btns[1], 'active');
      classie.remove(btns[0], 'active');
    })(document.getElementById('drag-panel').children);
  };
};
