import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Piece extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'king',
      'queen',
      'knight',
      'bishop',
      'rook',
      'pawn'
    ]).isRequired,
    black: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }

  getPieceEmoji = () => {
    switch (this.props.type) {
      case 'king':
        return '♔';
      case 'queen':
        return '♕';
      case 'knight':
        return '♘';
      case 'bishop':
        return '♗';
      case 'rook':
        return '♖';
      case 'pawn':
        return '♙';
    }
  }

  handleClick = event => {
    event.stopPropagation();
    this.props.onClick();
  }

  render() {
    return (
      <div
        style={{
          color: this.props.black ? 'black' : 'white'
        }}
        onClick={this.handleClick}
      >
        {this.getPieceEmoji()}
      </div>
    )
  }
}
