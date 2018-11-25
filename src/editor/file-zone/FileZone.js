import React, { Component } from 'react';
import './FileZone.css';

import TextBlock from './text-block/TextBlock';

class FileZone extends Component {
    onSelect = (e) => {
        const content = document.getSelection().baseNode.data;

        if (!content) {
            this.props.deleteSelectedWord();            
        } else {
            this.props.updateSelectedWord({
                content
            });
        }

    }

    onInput = (e) => {
        console.log(e.nativeEvent);
    }

    render() {
        const {
            parsedText,
            isEditable,
            selectWord,
            selectBlock,
        } = this.props;

        const textBlocks = parsedText
            .map((block, blockIndex) => <TextBlock
                blockIndex={blockIndex}
                key={blockIndex}
                isEditable={isEditable}
                selectWord={selectWord}
                selectBlock={selectBlock}
                {...block}
            />);

        return (
            <div id="file-zone">
                <div 
                    id="file" contentEditable={isEditable}
                    onInput={this.onInput}
                    onSelect={this.onSelect}
                >
                    {textBlocks}
                </div>
            </div>
        );
    }
}

export default FileZone;
