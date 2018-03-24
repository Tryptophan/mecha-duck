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
      eatRight: false,
      x: 0,
      y: 100
    }

    this.socket = io('http://10.42.0.1:8080');

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

      this.socket.on('x', data => {
        console.log(data);
        this.setState({
          x: data
        });
      });

      this.socket.on('y', data => {
        console.log(data);
        this.setState({
          y: data
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

    const mapStyle = {
      backgroundPositionX: this.state.x,
      backgroundPositionY: this.state.y
    }

    return (
      <div className='Controls' style={bgStyle}>
        <div className='Speed'>
          <Slider
            orientation='vertical'
            value={this.state.speed}
          />
        </div>
        <div className='Buttons'>
          <button type='button' style={buttonStyle.pickupPackage} onClick={this.pickupPackage}>Pickup Package</button>
          <button type='button' style={buttonStyle.dropoffPackage} onClick={this.dropoffPackage}>Dropoff Package</button>
          <button type='button' style={buttonStyle.eatLeft} onClick={this.eatLeft}>Eat Left</button>
          <button type='button' style={buttonStyle.eatRight} onClick={this.eatRight}>Eat Right</button>
          <div>
            <button type='button' style={buttonStyle.forward} onClick={this.forward}>D</button>
            <button type='button' style={buttonStyle.reverse} onClick={this.reverse}>R</button>
          </div>
        </div>
        <div className='Map' style={mapStyle}>
          <div />
        </div>
        <div className='Wheel'>
          <div style={wheelStyle} />
        </div>
      </div>
    );
  }

  componentDidMount() {

    const KEY = {
      W: 87,
      S: 83,
      A: 65,
      D: 68,
      LEFT: 37,
      RIGHT: 39,
      UP: 38,
      DOWN: 40,
      SPACE: 32
    }

    document.onkeydown = event => {
      event.preventDefault();

      if (event.keyCode === KEY.SPACE) {
        let speed = 0;
        this.setState({
          speed: speed
        });
        this.socket.emit('speed', speed);
      }

      if (event.keyCode === KEY.W) {
        let speed = this.state.speed + 10;
        this.setState({
          speed: speed
        });
        this.socket.emit('speed', speed);
      }

      else if (event.keyCode === KEY.S) {
        let speed = this.state.speed - 10;
        this.setState({
          speed: speed
        });
        this.socket.emit('speed', speed);
      }

      if (event.keyCode === KEY.A) {
        let angle = this.state.angle - 10;
        this.setState({
          angle: angle
        });
        this.socket.emit('angle', angle);
      }

      else if (event.keyCode === KEY.D) {
        let angle = this.state.angle + 10;
        this.setState({
          angle: angle
        });
        this.socket.emit('angle', angle);
      }

      if (event.keyCode === KEY.UP) {
        let y = this.state.y + 10;
        this.setState({
          y: y
        });
        this.socket.emit('y', y);
      }

      if (event.keyCode === KEY.DOWN) {
        let y = this.state.y - 10;
        this.setState({
          y: y
        });
        this.socket.emit('y', y);
      }

      if (event.keyCode === KEY.RIGHT) {
        let x = this.state.x - 10;
        this.setState({
          x: x
        });
        this.socket.emit('x', x);
      }

      if (event.keyCode === KEY.LEFT) {
        let x = this.state.x + 10;
        this.setState({
          x: x
        });
        this.socket.emit('x', x);
      }

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