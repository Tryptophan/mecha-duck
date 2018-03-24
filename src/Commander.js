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

    const wheelStyle = {
      transform: 'rotate(' + this.state.angle + 'deg)'
    }

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
            <div style={wheelStyle} onMouseDown={this.handleAngleChange} />
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

  handleAngleChange = event => {

    let mouseStartX = event.clientX;
    let mouseStartY = event.clientY;

    document.onmousemove = event => {
      let x = -(mouseStartX - event.clientX);
      let y = mouseStartY - event.clientY;
      let deg = Math.atan2(x, y) * 180 / Math.PI;
      this.setState({
        angle: deg
      });
    }
    console.log(event);
    // this.setState({
    //   angle: event.target.value
    // });
    // this.socket.emit('angle', event.target.value);

    document.onmouseup = () => {
      document.onmouseup = undefined;
      document.onmousemove = undefined;
    }
    
  }
}