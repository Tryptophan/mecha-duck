import React, { Component } from 'react';
import wheel from './wheel.png';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'

export default class Driver extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  handleChange = value => {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <div>
        <div className='Map'/>
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
        </div>
      </div>
    );
  }
}