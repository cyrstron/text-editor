import React, {Component} from 'react';
import WordItem from './WordItem';

class TextBlock extends Component {
  selectBlock = () => {
    const {
      blockIndex,
      selectBlock,
      isEditable,
    } = this.props;

    if (!isEditable) return;

    selectBlock(blockIndex);
  }

  render() {
    const {
      words,
      indents,
      isEditable,
      selectWord,
      updateSelectedWord,
    } = this.props;

    const wordItems = words
      .map((word, wordIndex) => <WordItem 
        key={wordIndex}
        wordIndex={wordIndex}
        isEditable={isEditable}
        selectWord={selectWord}
        updateSelectedWord={updateSelectedWord}
        {...word}
      />)

    return <p 
    onClick={this.selectBlock}
    style={{
      marginLeft: `${indents * 20}px`
    }}
    >
      {wordItems}
    </p>;
  }
}

export default TextBlock;