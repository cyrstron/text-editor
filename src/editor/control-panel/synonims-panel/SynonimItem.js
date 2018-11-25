import React, {Component} from 'react';

class SynonimItem extends Component {
  updateWord = () => {
    const {
      updateWordContent,
      syn,
    } = this.props;

    updateWordContent(syn);
  }

  render() {
    const {
      syn,
    } = this.props;
    return (
      <button
        onClick={this.updateWord}
      >
        {syn}
      </button>
    );
  }
}

export default SynonimItem;