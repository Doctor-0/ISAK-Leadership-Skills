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
  let hash = window.location.hash.slice(1),
      feats = hash.split('&'),
      curTitle = feats.pop();
  feats = feats.map((points) => points.split(',').map((point) => parseInt(point))); //Converts the hash into int arrays
  feats.push(curTitle.replace(/%20/g, ' '));
  return feats
}

function setHash(curCoords, newTitle) {
  let hash = getHash(),
      title = hash.pop();
  hash[curCoords[0]] = curCoords;
  window.location.hash = ptsToString(hash, '&') + '&' + (newTitle?newTitle:title);
}

function setTitle(text) {
  let hash = getHash();
      hash.pop();
  let output = ptsToString(hash, '&');
  window.location.hash = output + '&' + text;
}
