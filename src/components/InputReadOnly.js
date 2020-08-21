import React, { Component } from 'react'


export default class InputReadOnly extends Component {
  render() {
   const  {label, value, parClass } = this.props;

    return (
      <div className={parClass}>
        <label>
          {label}
        <input type="text" readOnly value={value}  />
        </label>
      </div>
    )
  }
}
