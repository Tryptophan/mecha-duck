import React, { Component } from 'react';
import wheel from './wheel.png';
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

      this.socket.emit('driver', this.socket.id);

      this.socket.on('speed', data => {
        this.setState({
          speed: data
        });
      });

      this.socket.on('angle', data => {
        this.setState({
          angle: data
        });
      });
    });
  }

  render() {
    return (
      <div>
        <h1>speed: {this.state.speed}, angle: {this.state.angle}</h1>
        {/* <div className='Map'/>
        <div className='Controls'>
          <div className='Speed'>
            <Slider
              orientation='vertical'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className='Wheel'>
            <img src={wheel} />
          </div>
        </div> */}
      </div>
    );
  }
}