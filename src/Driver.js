import React, { Component } from 'react';
import map from './map.png';

export default class Driver extends Component {
  render() {
    return (
      <div>
        <div className='Map' />
        <div className='Controls'>
          <div className='Speed' />
          <div className='Wheel' />
        </div>
      </div>
    );
  }
}