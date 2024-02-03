import React from 'react'

export default function Currency(props) {
  return (
    <div>
      <input type='number' className="input"/>
      <select>
        <option value="hi">{props.item}</option>
      </select>

    </div>
  )
}
