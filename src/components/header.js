import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className="header-text" onClick={this.props.handleClick}>Barista-matic</h1>
      </div>
    );
  }
}