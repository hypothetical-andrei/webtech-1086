import React from 'react'

class Plane extends React.Component {
  render () {
    const { item } = this.props
    return (
      <div>
        <span>{item.maker}</span>
        <span>{item.series}</span>
        <span>{item.type}</span>
        <span>{item.mass}</span>
        <span>{item.speed}</span>
      </div>
    )
  }
}

export default Plane