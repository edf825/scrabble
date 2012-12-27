function switchArea() {
  if (this.parentNode.id == 'rack') {
    window.document.getElementById('board').appendChild(this);
  }
  else if (this.parentNode.id == 'board') {;
    window.document.getElementById('rack').appendChild(this);
  }  
}

window.onload = function() { 
  alert('on load');
  var tiles = document.getElementsByClassName('tile');
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', switchArea);
  }
}

alert('outside function body');
  