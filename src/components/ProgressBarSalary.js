import React, { Component } from 'react'

export default class ProgressBarSalary extends Component {
  render() {
      const { value, color } = this.props;
   let _value = value ===0 ? 100 : value;
   let _text = value ===0 ? '' : value + '%';
   let _color = value ===0 ? 'black' : color;
    return (
      <div
        style={{
          marginTop: '40px',
          width: _value + '%',
          height: '40px',
          backgroundColor: _color,
        }}
        >{`${_text}`} </div>
    )
  }
}
