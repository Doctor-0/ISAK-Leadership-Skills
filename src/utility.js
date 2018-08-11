/**
 * Checks that the points array has only two elements
 * @param  {[Array[][]]} points A 2D array containing two sub arrays that hold: x, y
 * @return {[bool]}        Returns true if points are only two
 */

function assertTwoPoints(points){
  if(points.length !== 2){
    throw("distanceBetweenPoints(): more than two points given");
    return false;
  } else if(points.length <= 1){
    throw("distanceBetweenPoints(): less than two points given");
    return false;
  } else {
    return true;
  }
}

/**
 * Calculates the euclidean distance between two points
 * @param  {[Array[][]]} points A 2D array containing two sub arrays that hold: x, y
 * @return {[int]}        The distance between the two points
 */

function distanceBetweenPoints(points){
  //console.log(points);
  if(assertTwoPoints(points)){
    a = points[0][0] - points[1][0];
    b = points[0][1] - points[1][1];
    return Math.sqrt(a*a + b*b);
  }
}

/**
 * Calculates the euclidean midPoint
 * @param  {[Array[][]]} points A 2D array containing two sub arrays that hold: x, y
 * @return {[Array]}        That hold the x and y values respectively
 */

function midPoint(points){
  if(assertTwoPoints(points)){
    a = (points[0][0] + points[1][0])/2;
    b = (points[0][1] + points[1][1])/2;
    return [a,b];
  }
}

/**
 * Makes an svg of a specific tag. See: https://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
 * @param  {[String]} tag   The type of svg element (e.g. 'circle', 'polygon', etc.)
 * @param  {[Object]} attrs An object containing pairs of each attribute and its' value
 * @return {[DOM Element]}  A DOM element that can be injected
 */
function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for(var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

/**
 * Converts an array of array of points, into a string
 * ex. [[223.125,0],[446.25,170],[334.6875,425]] => "223.125,0 446.25,170 334.6875,425"
 * @param  {Array[Array[int,int]]} pts An array of points
 * @return {String}     Points separating x and y with a
 *                      comma, and each point with a space.
 */
function ptsToString(pts, btwn=' '){
  return pts.map((point) => point.join(',')).join(btwn);
}

/**
 * Gets the id of a shard from its event
 * @param  {e.target} target [the event that was triggered]
 * @return {Array[Int]}   [an array of ints, where int[0] = slice #; int[1] = shard #]
 */
function getID(target){
  let id = target.classList[1].slice(-2).split('');
  return id.map((char)=> parseInt(char));
}
