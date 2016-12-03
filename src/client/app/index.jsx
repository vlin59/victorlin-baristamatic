import React from 'react';
import {render} from 'react-dom';

class Index extends React.Component {
  render () {
    return <p>  React!</p>;
  }
}

render(<Index/>, document.getElementById('app'));