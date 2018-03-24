import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import io from 'socket.io-client'

export default class Driver extends Component {

  constructor(props) {
    super(props);
    this.state = {
      speed: 0,
      angle: 0
    }

    this.socket = io('http://localhost:8080');

    this.socket.on('connect', () => {
      this.socket.on('speed', data => {
        this.setState({
          speed: data
        });
      });

      this.socket.on('angle', data => {
        console.log(data);
        this.setState({
          angle: data
        });
      });
    });
  }

  render() {

    const wheelStyle = {
      transform: 'rotate(' + this.state.angle + 'deg)'
    }

    const bgStyle = {}

    if (this.state.speed >= 50) {
      bgStyle.backgroundColor = 'green';
    }

    else if (this.state.speed < 50 && this.state.speed > 0) {
      bgStyle.backgroundColor = 'yellow';
    }

    else {
      bgStyle.backgroundColor = 'red';
    }

    return (
      <div>
        {/* <div className='Map'/> */}
        <div className='Controls' style={bgStyle}>
          <div className='Speed'>
            <div>
              <Slider
                orientation='vertical'
                value={this.state.speed}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='Wheel'>
            <div style={wheelStyle} />
          </div>
        </div>
      </div>
    );
  }
}