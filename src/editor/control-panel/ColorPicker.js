import React, {Component} from 'react';

class ColorPicker extends Component {
  onChange = (e) => {
    const color = e.target.value;
    
    this.props.setColor(color);
  }

  render() {
    return (
      <input className="color-picker" type="color" onChange={this.onChange} />
    );
  }
}

export default ColorPicker;