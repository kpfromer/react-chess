import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Square.module.css';

export default class Square extends Component {
  static propTypes = {
    black: PropTypes.bool.isRequired,
    highlight: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }

  handleClick = () => {
    // if (!this.props.children) { // If no pieces on square
      this.props.onClick(); // trigger click
    // }
  }

  renderHighlight = () => (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 1,
      opacity: 0.5,
      backgroundColor: 'yellow',
    }} />
  );

  render() {
    const { black, highlight } = this.props;
    const blackStyling = black ? styles.black : '';
    return (
      <div className={`${styles.square} ${blackStyling}`} onClick={this.handleClick}>
        {this.props.children}
        {highlight && this.renderHighlight()}
      </div>
    )
  }
}
