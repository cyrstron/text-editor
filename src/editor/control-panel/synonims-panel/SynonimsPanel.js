import React, {Component} from 'react';

import SynonimItem from './SynonimItem';

class SynonimsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      synonims: [],
    }
  }

  
  componentDidUpdate(prevProps, prevState) {
    const {
      selectedWord,
    } = this.props;
    const {
      selectedWord: prevWord,
    } = prevProps;

    if (!prevWord || (
      selectedWord && selectedWord.content !== prevWord.content
    )) {
      fetch(`/api/words?ml=${selectedWord.content}`)
        .then(req => {
          if (!req.ok) {
            console.error(req);

            throw new Error()
          }
          return req.json();
          })
        .then((res) => {
          this.setState({
            synonims: res.slice(0, 10)
          })
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }  

  updateWordContent = (content) => {
    this.props.updateSelectedWord({content});
  }

  render() {
    const {
      isEditable,
      selectedWord,
    } = this.props;

    const {
      synonims
    } = this.state;

    if (!isEditable || !selectedWord) {
      return null;
    }

    const syns = synonims.map(({word}, index) => <SynonimItem
      key={index}
      syn={word}
      updateWordContent={this.updateWordContent}
    />);

    return (
      <div className='syn-panel'>
        {syns}
      </div>
    )
  }
}

export default SynonimsPanel;