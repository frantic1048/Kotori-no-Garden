(function() {
  function toggleClass(el,className){
    for(var i = 1;i < arguments.length;++i){
      clsname = arguments[i];
      if(el.classList.contains(clsname)){
        el.classList.add(clsname);
      }
      else{
        el.classList.remove(className);
      }
    }
    return 0;
  }

  function setClass(el,className){
    for(var i = 1;i < arguments.length;++i){
      clsname = arguments[i];
      if(!(el.classList.contains(clsname))){
        el.classList.add(clsname);
      }
    }
    return 0;
  }

  function unsetClass(el,className){
    for(var i = 1;i < arguments.length;++i){
      clsname = arguments[i];
      if(el.classList.contains(clsname)){
        el.classList.remove(clsname);
      }
    }

    return 0;
  }

  function navChange(scrYPos){
    var nav = document.getElementById("navbar");
    console.log("pageYOffset = " + scrYPos);
    var ww = ((scrYPos % 6000)/1000);
    unsetClass(nav,"state1","state2","state3","state4","state5","state6");
    if (0 < ww && ww < 1) {
      console.log(ww);
      setClass(nav,"state1");
    }
    else if (1 < ww && ww < 2) {
      console.log(ww);
      setClass(nav,"state2");
    }
    else if (2 < ww && ww < 3) {
      console.log(ww);
      setClass(nav,"state3");
    }
    else if (3 < ww && ww < 4) {
      console.log(ww);
      setClass(nav,"state4");
    }
    else if (4 < ww && ww < 5) {
      console.log(ww);
      setClass(nav,"state5");
    }
    else if (5 < ww && ww < 6) {
      console.log(ww);
      setClass(nav,"state6");
    }
  }

  function scrolling(ev){
    navChange(window.pageYOffset);
  }

  window.addEventListener("scroll",scrolling,false);
}());
