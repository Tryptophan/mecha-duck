import React, { Component } from 'react';
import wheel from './wheel.png';

export default class Driver extends Component {
  render() {
    return (
      <div>
        <div className='Map' />
        <div className='Controls'>
          <div className='Speed'>

          </div>
          <div className='Wheel'>
            <img src={wheel} />
          </div>
        </div>
      </div>
    );
  }
}