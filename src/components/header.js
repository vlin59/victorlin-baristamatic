import React, { Component } from 'react';

export default class header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 onClick={this.props.handleClick}>Barista-matic</h1>
      </div>
    );
  }
}