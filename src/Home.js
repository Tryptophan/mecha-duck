import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div><Link to='/driver' >I'm a driver!</Link></div>
        <div><Link to='/commander' >I'm a commander!</Link></div>
        <div><Link to='/navigator' >I'm a navigator!</Link></div>
      </div>
    );
  }
}