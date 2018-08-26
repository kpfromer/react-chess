import React, { Component } from 'react'
import Square from './Square';
import Piece from './Piece';
import { connect } from 'react-redux';

import styles from './Board.module.css';
// import { PropTypes } from 'prop-types';
import { movePiece, removePiece } from './actions/pieces';
import { isValidSquare } from './Game';

export class Board extends Component {

  // static propTypes = {
  //   pieces: PropTypes.array
  // }

  state = {
    moving: null
  }

  movePiece = (id, fromX, fromY) => (toX, toY) => this.props.movePiece(id, { fromX, fromY }, { toX, toY });

  getPieceAtXY = (x, y) => { // Make redux state simpler? 
    if (!!this.props.layout[x][y]) {
      return this.props.pieces[this.props.layout[x][y]];
    }
    return null;
  }

  canMove = (x, y) => {
    const isMoving = this.state.moving !== null;

    if (isMoving) {
      const { moving } = this.state;
      const isValid = isValidSquare(moving.type, moving.side, moving.from, { x, y });
      const pieceAtXY = this.getPieceAtXY(x, y);
      const isNotOnFriendlySquare = !pieceAtXY || pieceAtXY.side !== moving.side;

      return isValid && isNotOnFriendlySquare;
    }

    return false;
  };

  startMove = (id, type, side, fromX, fromY) => {
    this.setState({
      moving: {
        id,
        type,
        side,
        from: { x: fromX, y: fromY }
      }
    })
  }

  cancelMove = () => {
    this.setState({ moving: null });
  }

  finishMove = (toX, toY) => {
    if (this.canMove(toX, toY)) {
      const { id, from } = this.state.moving;
      const pieceAtXY = this.getPieceAtXY(toX, toY);
      if (pieceAtXY) {
        this.props.removePiece(pieceAtXY.id);
      }
      this.props.movePiece(id, from, { x: toX, y: toY });
    }
    this.cancelMove();
  }

  renderPiece = (x, y) => {
    const pieceId = this.props.layout[x][y];
    if (pieceId) {
      const { type, side } = this.props.pieces[pieceId];
      return <Piece 
        type={type} 
        black={side === 'black'} 
        onClick={() => this.startMove(pieceId, type, side, x, y)}
      />
    }
  }

  renderSquares = () => {
    const squares = [];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const key = x * 8 + y;
        const black = (x + y) % 2 === 1;
        const highlight = this.canMove(x, y);
        squares.push(
          <Square
            key={key}
            black={black}
            highlight={highlight}
            onClick={() => this.finishMove(x, y)}
          >
            {this.renderPiece(x, y)}
          </Square>
        );
      }
    }
    return squares;
  }

  render() {
    return (
      <div className={styles.board}>
        {this.renderSquares()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  layout: state.pieces.layout,
  pieces: state.pieces.pieces
});

const mapDispatchToProps = {
  movePiece,
  removePiece
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);