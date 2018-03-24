import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'

import io from 'socket.io-client'

export default class Commander extends Component {

  constructor(props) {
    super(props);
    this.state = {
      speed: 0,
      angle: 0,
      pickupPackage: false,
      dropoffPackage: false,
      forward: true,
      eatLeft: false,
      eatRight: false
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

      this.socket.on('pickup', data => {
        console.log(data);
        this.setState({
          pickupPackage: data
        });
      });

      this.socket.on('dropoff', data => {
        console.log(data);
        this.setState({
          dropoffPackage: data
        });
      });

      this.socket.on('eatLeft', data => {
        console.log(data);
        this.setState({
          eatLeft: data
        });
      });

      this.socket.on('eatRight', data => {
        console.log(data);
        this.setState({
          eatRight: data
        });
      });

      this.socket.on('forward', data => {
        console.log(data);
        this.setState({
          forward: data
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

    const buttonStyle = {
      pickupPackage: {
        backgroundColor: this.state.pickupPackage ? 'green' : 'white',
        color: this.state.pickupPackage ? 'white' : 'black'
      },
      dropoffPackage: {
        backgroundColor: this.state.dropoffPackage ? 'green' : 'white',
        color: this.state.dropoffPackage ? 'white' : 'black'
      },
      eatLeft: {
        backgroundColor: this.state.eatLeft ? 'green' : 'white',
        color: this.state.eatLeft ? 'white' : 'black'
      },
      eatRight: {
        backgroundColor: this.state.eatRight ? 'green' : 'white',
        color: this.state.eatRight ? 'white' : 'black'
      },
      forward: {
        backgroundColor: this.state.forward ? 'green' : 'white',
        color: this.state.forward ? 'white' : 'black'
      },
      reverse: {
        backgroundColor: !this.state.forward ? 'green' : 'white',
        color: !this.state.forward ? 'white' : 'black'
      }
    }

    return (
      <div className='Controls' style={bgStyle}>
        <div className='Speed'>
          <Slider
            orientation='vertical'
            value={this.state.speed}
            onChange={this.handleSpeedChange}
          />
        </div>
        <div className='Actions'>
          <button type='button' style={buttonStyle.pickupPackage} onClick={this.pickupPackage}>Pickup Package</button>
          <button type='button' style={buttonStyle.dropoffPackage} onClick={this.dropoffPackage}>Dropoff Package</button>
          <button type='button' style={buttonStyle.eatLeft} onClick={this.eatLeft}>Eat Left</button>
          <button type='button' style={buttonStyle.eatRight} onClick={this.eatRight}>Eat Right</button>
          <div>
            <button type='button' style={buttonStyle.forward} onClick={this.forward}>D</button>
            <button type='button' style={buttonStyle.reverse} onClick={this.reverse}>R</button>
          </div>
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
      this.socket.emit('angle', deg);
    }

    document.onmouseup = () => {
      document.onmouseup = undefined;
      document.onmousemove = undefined;
    }
  }

  pickupPackage = event => {
    let old = this.state.pickupPackage;
    this.setState({
      pickupPackage: !old
    });
    this.socket.emit('pickup', !old);
  }

  dropoffPackage = event => {
    let old = this.state.dropoffPackage;
    this.setState({
      dropoffPackage: !old
    });
    this.socket.emit('dropoff', !old);
  }

  eatLeft = event => {
    let old = this.state.eatLeft;
    this.setState({
      eatLeft: !old
    });
    this.socket.emit('eatLeft', !old);
  }

  eatRight = event => {
    let old = this.state.eatRight;
    this.setState({
      eatRight: !old
    });
    this.socket.emit('eatRight', !old);
  }

  forward = event => {
    this.setState({
      forward: true
    });
    this.socket.emit('forward', true);
  }

  reverse = event => {
    this.setState({
      forward: false
    });
    this.socket.emit('forward', false);
  }
}