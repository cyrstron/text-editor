import React, {Component} from 'react';

class WordItem extends Component {
  render() {
    const {
      content,
      color,
      isBold,
      isItalics,
      isUnderlined,
    } = this.props;

    let wordItem = content;

    if (isItalics) {
      wordItem = <em>
      {wordItem}
      </em>;
    }

    if (isBold) {
      wordItem = <strong>
      {wordItem}
      </strong>;
    }

    if (isUnderlined) {
      wordItem = <u>
      {wordItem}
      </u>;
    }

    return <span 
      style={{
        color,
      }}
      onClick={this.selectWord}
    >
      {wordItem} </span>;
  }

  selectWord = () => {
    const {
      selectWord,
      wordIndex,
      isEditable
    } = this.props;

    if (!isEditable) return;

    selectWord(wordIndex);
  }
}

export default WordItem;