import React, {Component} from 'react';
import './App.css';
import getMockText from './text.service';
import Editor from './editor/Editor';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: null,
        }
    }
    
    componentDidMount() {
        this.getText();
    }
    
    getText() {
        getMockText()
            .then((text) => {
                this.setState({
                    text,
                })
            });
    }
    render() {
        const {
            text,
        } = this.state;
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <Editor text={text}/>
                </main>
            </div>
        );
    }
}

export default App;
