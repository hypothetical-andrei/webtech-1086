import React from 'react'

class PlaneAddForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      maker: '',
      series: '',
      type: '',
      mass: '',
      speed: ''
    }

    this.add = () => {
      this.props.onAdd({
        maker: this.state.maker,
        series: this.state.series,
        type: this.state.type,
        mass: this.state.mass,
        speed: this.state.speed
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }

  render () {
    return (
      <div>
        <div>
          <label htmlFor='maker'>Maker</label>
          <input type='text' name='maker' id='maker' value={this.state.maker} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor='series'>Series</label>
          <input type='text' name='series' id='series' value={this.state.series} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor='type'>Type</label>
          <input type='text' name='type' id='type' value={this.state.type} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor='mass'>Mass</label>
          <input type='text' name='mass' id='mass' value={this.state.mass} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor='speed'>Speed</label>
          <input type='text' name='speed' id='speed' value={this.state.speed} onChange={this.handleChange} />
        </div>
        <div>
          <input type='button' value='add' onClick={this.add} />
        </div>
      </div>
    )
  }
}

export default PlaneAddForm