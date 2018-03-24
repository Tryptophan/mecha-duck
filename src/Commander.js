import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'

import io from 'socket.io-client'

export default class Commander extends Component {

  constructor(props) {
    super(props);
    this.state = {
      speed: 0,
      angle: 0
    }

    this.socket = io('http://10.42.0.1:8080');
  }

  render() {
    return (
      <div className='Controls'>
          <div className='Speed'>
            <Slider
              orientation='vertical'
              value={this.state.speed}
              onChange={this.handleSpeedChange}
            />
          </div>
          <div className='Wheel'>
            <div />
          </div>
        </div>
    );
  }

  handleSpeedChange = value => {
    this.setState({
      speed: value
    });
    this.socket.emit('speed', value);
  }

  handleWheelChange = event => {
    this.setState({
      angle: event.target.value
    });
    this.socket.emit('angle', event.target.value);
  }
}