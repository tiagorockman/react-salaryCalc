import React, { Component } from 'react'


export default class InputReadOnly extends Component {
  render() {
   const  {label, value, parClass } = this.props;

    return (
      <div className={`input-field col l3 s12 m6 ${parClass}`}>
        <label className="active">
          {label}
        </label>
        <input type="text" readOnly value={value}  />
      </div>
    )
  }
}
