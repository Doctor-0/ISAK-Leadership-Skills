/**
 * Checks to see if there is a hash in window.location.hash
 *
 * Hashes can contain up to numLevels many points. Each point dictates
 * what is highlight and everything below it. For example:
 *  > hash = '#2,3&3,2&4,1'
 * means that shard 2 section 3 and all below it are highlighted.
 *
 * Assumes that there is always a hash
 *
 * @param  {String}
 * @return {[[int, int]]]} [If the hash is empty it returns an empty array,
 *                          otherwise it returns an array of points to highlight]
 */
function getHash() {
  let hash = window.location.hash;
  hash = hash.slice(1); //Removes the '#'
  return hash.split('&').map((points) => points.split(',').map((point) => parseInt(point))); //Converts the hash into int arrays
}

function setHash(curCoords) {
  let hash = getHash();
  hash[curCoords[0]] = curCoords;
  window.location.hash = ptsToString(hash, '&');
}

//** Implementation of sessionStorage **//
// function getJSON(){
//   let tempJSON = window.sessionStorage.getItem('json');
//   return JSON.parse(tempJSON);
// }
//
// function setJSON(coords){
//   let tempJSON = getJSON();
//
//   if(tempJSON === null){
//     tempJSON = {
//       0:[0,0],
//       1:[1,0],
//       2:[2,0],
//       3:[3,0],
//       4:[4,0]
//     };
//   }
//   if(coords){
//     tempJSON[coords[0]] = coords[1];
//   }
//
//   setHash(tempJSON);
//   window.sessionStorage.setItem('json', JSON.stringify(tempJSON));
// }
