import { MOVE_PIECE, REMOVE_PIECE } from '../actiontypes/pieces';

export const movePiece = (id, from, to) => ({
  type: MOVE_PIECE,
  id,
  from,
  to
});

export const removePiece = id => ({
  type: REMOVE_PIECE,
  id
});