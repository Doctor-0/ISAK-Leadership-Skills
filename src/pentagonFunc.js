
const HIGH_LIGHT_COLOR = '#de6328';
const HIGH_LIGHT_COLOR_SUB = '#ad5529'
const NORMAL_COLOR = '#009b90';
const STROKE_COLOR = '#717073';

/**
 * Creates a pentagon at the given id with
 * @param  {int} x  [width of pentagon]
 * @param  {int} y  [height of pentagon]
 * @param  {string} id [id of SVG element to place pentagon]
 * @param  {int} numLevels [the number of shards per slice]
 * @param  {int} scaleX [scales in the x dimension] optional
 * @param  {int} scaleY [scales in the y dimension] optional
 * @param  {[[int, int]]} hashPoints [A set of points that are already highlighted]
 */
function generatePentagon (x, y, id, numLevels=0, scaleX=1, scaleY=1, hashPoints) {
  let startDate = new Date(); //DELETE

  let $svg = $(id);

  //Calculates the points of the pentagon with
  function genPentagonPoints(ptX=x, ptY=y, offSetX=0, offSetY=0){
    // 2. Points follow clockwise around the pentagon,
    // starting from the top most point

    let points = [[ptX/2, 0+offSetY], //Top most point
                  [ptX-offSetX, (ptY+offSetY/2)/2.5],
                  [((3*ptX)/4)-(offSetX/2), ptY-offSetY],
                  [(ptX/4)+(offSetX/2), ptY-offSetY],
                  [0+offSetX, (ptY+offSetY/2)/2.5]];
    points.forEach((point) => {
      point[0] *= scaleX;
      point[1] *= scaleY;
    });
    return points
  }

  let points = genPentagonPoints();

  //Calculate center
  let center = [(x*scaleX)/2, (y*scaleY)/2];

  console.log(center, points);

  //4. Generate the pentagon
  $svg.find('.pentagon').attr('points', ptsToString(points))

  // 5. Generate the individual shards shards pointsd on the {numShards}
  // Each shard uses the previous two points to calculate its' own
  // points.
  let shards = [];

  for(let i=1;i<=numLevels;i++){
    let offSetX_prev = Math.floor(((i-1)/numLevels)*(x/2)),
        offSetY_prev = Math.floor(((i-1)/numLevels)*(y/2)),
        offSetX_curr = Math.floor((i/numLevels)*(x/2)),
        offSetY_curr = Math.floor((i/numLevels)*(y/2))
        points_Prev = genPentagonPoints(x,y, offSetX_prev, offSetY_prev),
        points_Curr = genPentagonPoints(x,y, offSetX_curr, offSetY_curr)

    for(let j=0;j<points.length;j++){
      let a = j,                       //First point
          b = (j+1) % (points.length), //Second Point
          pointSet = [points_Prev[a],points_Prev[b]];

      // Checks if it needs to make triangles
      if(i >= numLevels-1 ){ // Only activates if it's the second to the last lvl
        pointSet = pointSet.concat([center]);
      } else {
        pointSet = pointSet.concat([points_Curr[b], points_Curr[a]]);
      }

      shards.push(makeSVG('polygon', {
        class: "shard shard-" + j + i,
        fill: NORMAL_COLOR,
        stroke: STROKE_COLOR,
        "stroke-dasharray": ((i+1) % 2 === 0) ? 0 : '4 4', // '4 4' indicates the spacing between lines in '0.5' row
        "stroke-width": ((i+1) % 2 === 0) ? 1 : 2, //0.4 + (numLevels - (i))*0.3, //mx+c => m = rate of change of thickness; c = starting thickness
        points: ptsToString(pointSet)
      }));

    }
  }

  /**
   * Updates the background color of a shard and cascades to lower shards
   * @param  {[int, int]} points [description]
   * @param  {String} color  [description]
   * @return {[type]}        [description]
   */
  function updateShardsCascade(shard_id, color, cap=0) {
    if(cap <= 0){
      for(let i=shard_id[1];i<=numLevels;i++){
        $('.shard-' + shard_id[0] + i).attr('fill', color);
      }
    } else {
      for(let i=1;i<cap;i++){
        $('.shard-' + shard_id[0] + i).attr('fill', color);
      }
    }
  }

  function onEnter(e) {
    let shard_id = getID(e.target);
    updateShardsCascade(shard_id, HIGH_LIGHT_COLOR);
  }

  function onLeave(e) {
    let shard_id = getID(e.target),
        currHash = getHash(),
        cap = currHash[shard_id[0]][1];
    updateShardsCascade(shard_id, NORMAL_COLOR, cap);
  }

  function onClick(e) {
    let shard_id = getID(e.target);
    setHash(shard_id);
  }

  function onDblClick(e) {
    let shard_id = getID(e.target);
    updateShardsCascade(shard_id, NORMAL_COLOR);
    shard_id[1] = 0;
    setHash(shard_id);
  }

  $svg.append(shards);
  $('.shard').hover(onEnter, onLeave); // Adds hover effect
  $('.shard').click(onClick); // Locks in the shard colors
  $('.shard').dblclick(onDblClick); // Resets the shard
  // Changes the background color of the background shards
  // based on the hashPoints array
  for(let i=0;i<hashPoints.length;i++){
    if(hashPoints[i][1] !== 0){
      updateShardsCascade(hashPoints[i], HIGH_LIGHT_COLOR);
    }
  }
  console.log('ms: ', (new Date()) - startDate,' | ', hashPoints);
  return points;
}

function generateText(points, id) {
  const textPoints = [];

  for(let i=0;i<points.length;i++){
    let a = i,                       //First point
        b = (i+1) % (points.length), //Second Point
        pointSet = [points[a],points[b]],
        mid = midPoint(pointSet);

    textPoints.push(mid);
  }

  return textPoints;
}
