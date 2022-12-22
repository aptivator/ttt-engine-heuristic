export function generateUniqueMoves(callback, iteractions, ...params) {
  for(var i = 0, moves = new Set(); i < iteractions; i++) {
    let {move} = callback(...params);
    moves.add(move);
  }

  return Array.from(moves);
}
