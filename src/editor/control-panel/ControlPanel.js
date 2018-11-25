import React, { Component, Fragment } from 'react';
import './ControlPanel.css';

import SynonimsPanel from './synonims-panel/SynonimsPanel';
import ColorPicker from './ColorPicker';

class ControlPanel extends Component {
    switchBold = () => {
        const {
            selectedWord: {isBold},
            updateSelectedWord,
        } = this.props;

        updateSelectedWord({
            isBold: !isBold
        });
    }
    switchItalics = () => {
        const {
            selectedWord: {isItalics},
            updateSelectedWord,
        } = this.props;

        updateSelectedWord({
            isItalics: !isItalics
        });
    }
    switchUnderlined = () => {
        const {
            selectedWord: {isUnderlined},
            updateSelectedWord,
        } = this.props;

        updateSelectedWord({
            isUnderlined: !isUnderlined
        });
    }
    setColor = (color) => {
        const {
            updateSelectedWord,
        } = this.props;

        updateSelectedWord({
            color,
        });
    }
    moveBlockToRight = () => {
        const {
            selectedBlock: {indents},
            updateSelectedBlock,
        } = this.props;

        updateSelectedBlock({
            indents: indents + 1,
        });
    }
    moveBlockToLeft = () => {
        const {
            selectedBlock: {indents},
            updateSelectedBlock,
        } = this.props;

        updateSelectedBlock({
            indents: indents > 0 ? indents - 1 : 0,
        });
    }
    
    render() {
        const {
            updateSelectedWord,
            switchEditable,
            isEditable,
            selectedWord,
            selectedBlock,
        } = this.props;
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <button 
                        className="format-action" 
                        type="button"
                        onClick={switchEditable}
                    >
                        {isEditable? 'Done' : 'Edit'}
                    </button>
                    {isEditable && (
                        <Fragment>
                            {selectedWord ? (
                                <Fragment>
                                    <button 
                                        className="format-action" 
                                        type="button"
                                        onClick={this.switchBold}
                                    >
                                        <b>B</b>
                                    </button>
                                    <button
                                        className="format-action" 
                                        type="button"
                                        onClick={this.switchItalics}                                        
                                    >
                                        <i>I</i>
                                    </button>
                                    <button 
                                        className="format-action" 
                                        type="button"
                                        onClick={this.switchUnderlined}
                                    >
                                        <u>U</u>
                                    </button>
                                    <ColorPicker setColor={this.setColor}/>
                                </Fragment>
                            ) : ' Select a word by click...'}
                            {selectedBlock && (
                                <Fragment>
                                    <button 
                                        className="format-action" 
                                        type="button"
                                        onClick={this.moveBlockToLeft}  
                                    >
                                        <u>to Left</u>
                                    </button>
                                    <button 
                                        className="format-action" 
                                        type="button"
                                        onClick={this.moveBlockToRight}  
                                    >
                                        <u>to Right</u>
                                    </button>
                                </Fragment>
                            )}
                            <SynonimsPanel 
                                updateSelectedWord={updateSelectedWord}
                                selectedWord={selectedWord}
                                isEditable={isEditable}
                            />
                        </Fragment>
                    )}
                </div>
            </div>
        );
    }

}

export default ControlPanel;
