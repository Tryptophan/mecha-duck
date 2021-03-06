import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import io from 'socket.io-client'
import gas from './gas.mp3';

export default class Driver extends Component {

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

    this.audio = new Audio(gas);

    this.socket = io('http://' + window.location.hostname + ':8080');

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

    if (this.state.speed === 100 && !this.audio.playing) {
      this.audio.play();
    } else if (this.state.speed < 100) {
      this.audio.pause();
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
      <div>
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
          <div className='Actions'>
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
          </div>
          <div className='Wheel'>
            <div className='Gear' style={this.state.forward ? { visibility: 'hidden' } : { visibility: 'visible' }}>REVERSE</div>
            <div className='Image' style={wheelStyle} />
          </div>
        </div>
      </div >
    );
  }
}