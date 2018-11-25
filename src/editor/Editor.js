import React, {Component, Fragment} from 'react';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditable: false,
      parsedText: [],
      selectedWordIndex: null,
      selectedBlockIndex: null,
    }
  }

  updateSelectedBlock = (updatedProps) => {
    const {
      selectedBlockIndex,
      parsedText,
    } = this.state;

    if (selectedBlockIndex === null) return;

    const selectedBlock = parsedText[selectedBlockIndex];

    const updatedBlock = {
      ...selectedBlock,
      ...updatedProps,
    };

    const updatedParsedText = [
      ...parsedText.slice(0, selectedBlockIndex),
      updatedBlock,
      ...parsedText.slice(selectedBlockIndex + 1),
    ];

    this.setState({
      parsedText: updatedParsedText
    });
  }

  
  deleteSelectedWord = () => {
    const {
      selectedBlockIndex,
      parsedText,
      selectedWordIndex,      
    } = this.state;

    if (
      selectedBlockIndex === null ||
      selectedWordIndex === null
    ) return;
    
    const selectedBlock = parsedText[selectedBlockIndex];

    const updatedWords = [
      ...selectedBlock.words.slice(0, selectedWordIndex),
      ...selectedBlock.words.slice(selectedWordIndex + 1),
    ];

    this.updateSelectedBlock({
      words: updatedWords,
    });
  }

  updateSelectedWord = (updatedProps) => {
    const {
      selectedBlockIndex,
      parsedText,
      selectedWordIndex,      
    } = this.state;

    if (
      selectedBlockIndex === null ||
      selectedWordIndex === null
    ) return;

    const selectedBlock = parsedText[selectedBlockIndex];
    const selectedWord = selectedBlock.words[selectedWordIndex];

    const updatedWord = {
      ...selectedWord,
      ...updatedProps,
    };

    const updatedWords = [
      ...selectedBlock.words.slice(0, selectedWordIndex),
      updatedWord,
      ...selectedBlock.words.slice(selectedWordIndex + 1),
    ];

    this.updateSelectedBlock({
      words: updatedWords,
    });
  }
  
  selectWord = (wordIndex) => {
    this.setState({
      selectedWordIndex: wordIndex
    })
  }

  selectBlock = (blockIndex) => {
    this.setState({
      selectedBlockIndex: blockIndex
    })
  }
  
  componentDidUpdate(prevProps) {
    const {text} = this.props;

    if (!text || text === prevProps.text) return;
    
    const parsedText = text
      .split(/ *\n */)
      .map((block) => ({
        words: block
          .split(/ +/)
          .map((word) => ({
            content: word,
            color: 'inherit'
          })),
          indents: 0,
        })
      )

    this.setState({
      parsedText,
    })
  }
  

  switchEditable = () => {
    this.setState({
      isEditable: !this.state.isEditable,
    })
  }

  render() {
    const {
      text,
    } = this.props;

    const {
      isEditable,
      parsedText,
      selectedWordIndex,
      selectedBlockIndex,
    } = this.state;

    const selectedBlock = selectedBlockIndex === null ?
      null :
      parsedText[selectedBlockIndex];

    const selectedWord = !selectedBlock || selectedWordIndex === null ?
      null :
      selectedBlock.words[selectedWordIndex];

    return (
      <Fragment>
        <ControlPanel
          isEditable={isEditable}
          switchEditable={this.switchEditable}
          updateSelectedBlock={this.updateSelectedBlock}
          updateSelectedWord={this.updateSelectedWord}
          selectedBlock={selectedBlock}
          selectedWord={selectedWord}
        />
        <FileZone 
          text={text}
          parsedText={parsedText}
          isEditable={isEditable}
          selectBlock={this.selectBlock}
          selectWord={this.selectWord}
          updateSelectedWord={this.updateSelectedWord}
          deleteSelectedWord={this.deleteSelectedWord}
        />
      </Fragment>
    )
  }
}

export default Editor;