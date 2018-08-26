import { MOVE_PIECE, REMOVE_PIECE } from '../actiontypes/pieces';
import { generateChessBoard } from '../Game.js';
import cloneDeep from 'lodash/cloneDeep';

function pieces(state = generateChessBoard(), action) {
  switch (action.type) {
    case MOVE_PIECE:
      const newLayout = cloneDeep(state.layout);
      newLayout[action.from.x][action.from.y] = null;
      newLayout[action.to.x][action.to.y] = action.id;
      return {
        ...state,
        layout: newLayout
      };
    case REMOVE_PIECE:
      return {
        ...state,
        layout: [
          ...state.layout.map(pieces => pieces.map(piece => {
            if (piece !== null && piece.id === action.id) {
              return null;
            }
            return piece;
          }))
        ],
        pieces: {
          ...state.pieces,
          [action.id] : {
            ...state.pieces[action.id],
            isRemoved: true
          }
        }
      }
    default:
      return state;
  }
}

export default pieces;