import React, { Component } from 'react';
import wheel from './wheel.png';
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

    this.socket = io('http://localhost:8080');

    console.log(this.socket);
  }

  render() {
    return (
      <div>
        <input type='text' onChange={this.handleSpeedChange} value={this.state.speed} />
        <input type='text' onChange={this.handleWheelChange} value={this.state.angle} />
      </div>
    );
  }

  handleSpeedChange = event => {
    this.setState({
      speed: event.target.value
    });
    // console.log(event.target.value);
    this.socket.emit('speed', event.target.value);
  }

  handleWheelChange = event => {
    this.setState({
      angle: event.target.value
    });
    this.socket.emit('angle', event.target.value);
  }
}