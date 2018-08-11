$(document).ready(function() {
  const id = '#svg-pentagon',
        numLevels = 8;
  //Sets the initial hash
  if(window.location.hash == ""){
    window.location.hash = '0,0&0,0&0,0&0,0&0,0';
  }

  let points = generatePentagon(425, 500, id, numLevels, 1.05, 0.85, getHash(window.location.hash));

  //3. Set width and height of frame point on points
  $("#J-svg-pentagon").attr({
    width: points[1][0], //points[1][0] is the right-most point
    height: points[2][1] //points[2][1] || points[3][1] is the bottom-most point
  });

  // Adds the level labels
  for(let i=0;i<4;i++){
      let el = makeSVG('text', {
        x:223.125,
        y:(53.125*i),
        class: 'level'
      })
      el.textContent = 4-i;
      $("#J-svg-pentagon").append(el);
  }

  // Sets the popup window with 'coaching questions' when clicked
  function onClick(e) {
    let $popup = document.getElementById('popup-' + e.target.classList[1]);
    $popup.classList.toggle('hide');
  }

  // Sets the hovering effect
  const opacity=0.15;

  function updateShardsCascade(shard_id, val=1) {
    for(let i=shard_id[1];i<=numLevels;i++){
      $('.shard-' + shard_id[0] + i).attr('opacity', val);
    }
  }

  $(".close-button").click(function(e) {
    document.getElementById(e.target.parentNode.id).classList.toggle('hide');
  });

  // Awareness
  $(".awareness").click(onClick);
  $(".awareness").hover(function(e) {
    $(".level").attr('opacity', opacity)
     updateShardsCascade([0,0], opacity); //Connecting
     updateShardsCascade([2,0], opacity); //Self-Disciplined
     updateShardsCascade([3,0], opacity); //Creative
  }, function(e) {
    $(".level").attr('opacity', 1)
    updateShardsCascade([0,0]); //Action-Taking
    updateShardsCascade([2,0]); //Awareness
    updateShardsCascade([3,0]); //Awareness
  });

  // Connecting
  $(".connecting").click(onClick);
  $(".connecting").hover(function(e) {
    $(".level").attr('opacity', opacity)
     updateShardsCascade([2,0], opacity); //Self-Disciplined
     updateShardsCascade([3,0], opacity); //Creative
     updateShardsCascade([4,0], opacity); //Awareness
  }, function(e) {
    $(".level").attr('opacity', 1)
    updateShardsCascade([2,0]); //Self-Disciplined
    updateShardsCascade([3,0]); //Creative
    updateShardsCascade([4,0]); //Awareness
  });

  // Creative
  $(".creative").click(onClick);
  $(".creative").hover(function(e) {
    $(".level").attr('opacity', opacity)
     updateShardsCascade([0,0], opacity); //Connecting
     updateShardsCascade([4,0], opacity); //Awareness
  }, function(e) {
    $(".level").attr('opacity', 1)
    updateShardsCascade([0,0]); //Action-Taking
    updateShardsCascade([4,0]); //Awareness
  });

  // Action
  $(".action").click(onClick);
  $(".action").hover(function(e) {
    $(".level").attr('opacity', opacity)
     updateShardsCascade([0,0], opacity); //Connecting
     updateShardsCascade([3,0], opacity); //Creative
     updateShardsCascade([4,0], opacity); //Awareness
  }, function(e) {
    $(".level").attr('opacity', 1)
    updateShardsCascade([0,0]); //Connecting
    updateShardsCascade([3,0]); //Creative
    updateShardsCascade([4,0]); //Awareness
  });

  // Disciplined
  $(".disciplined").click(onClick);
  $(".disciplined").hover(function(e) {
    $(".level").attr('opacity', opacity)
     updateShardsCascade([0,0], opacity); //Connecting
     updateShardsCascade([1,0], opacity); //Action-Taking
     updateShardsCascade([3,0], opacity); //Creative
  }, function(e) {
    $(".level").attr('opacity', 1)
    updateShardsCascade([0,0]); //Connecting
    updateShardsCascade([1,0]); //Action-Taking
    updateShardsCascade([3,0]); //Creative
  });
})
