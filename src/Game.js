const createPiece = (side, type) => ({
  id: Math.random().toString(),
  type: type,
  side: side,
  isRemoved: false
})

export const generateChessBoard = () => {
  const chessBoard = [];
  for (let x = 0; x < 8; x++) {
    chessBoard.push([]);
    for (let y = 0; y < 8; y++) {
      chessBoard[x].push(null);
    }
  }
  const pieces = {};
  const first = createPiece('white', 'knight');
  pieces[first.id] = first;
  chessBoard[0][0] = first.id;
  const second = createPiece('black', 'rook');
  pieces[second.id] = second;
  chessBoard[7][0] = second.id;
  const third = createPiece('white', 'king');
  pieces[third.id] = third;
  chessBoard[1][2] = third.id;
  const four = createPiece('white', 'bishop');
  pieces[four.id] = four;
  chessBoard[1][5] = four.id;
  const five = createPiece('white', 'pawn');
  pieces[five.id] = five;
  chessBoard[7][7] = five.id;
  return {
    layout: chessBoard,
    pieces
  };
}

export const isValidSquare = (type, side, from, to) => {
  const dx = from.x - to.x;
  const dy = from.y - to.y;
  switch (type) {
    case 'knight':
      return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2);
    case 'rook':
      return (dx === 0 && Math.abs(dy) > 0) ||
        (dy === 0 && Math.abs(dx) > 0);
    case 'king':
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      return adx === 1 && ady === 1 || adx === 0 && ady === 1 || adx === 1 && ady === 0;
    case 'bishop':
      return (Math.abs(dx) / Math.abs(dy)) === 1;
    case 'queen':
      return ((Math.abs(dx) / Math.abs(dy)) === 1) || ((dx === 0 && Math.abs(dy) > 0) ||
        (dy === 0 && Math.abs(dx) > 0));
    case 'pawn': // TODO: if piece diagonal! // TODO: make what ever!
      const isAtStarting = from.x === 1 || from.x === 6;
      const direction = (side === 'white' ? 1 : -1);
      return dy === 0 && (dx === direction || (isAtStarting && dx === 2 * direction));
    default:
      return false;
  }
}