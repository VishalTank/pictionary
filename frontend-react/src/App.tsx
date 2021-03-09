import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChatContext } from './ChatContext';

class App extends React.Component {
  static contextType = ChatContext;

  state = {
    messages: [
      {
        message: 'Welcome! Type a message and press Send Message to continue the chat.',
        author: 'Bot'
      }
    ],
    input: ''
  }

  componentDidMount() {

    //initiate socket connection
    this.context.init();

    const observable = this.context.onMessage();

    observable.subscribe((m: any) => {
      let messages = this.state.messages;

      messages.push(m);
      this.setState({ messages: messages });
    });
  }

  componentWillUnmount() {
    this.context.disconnect();
  }

  render() {

    const updateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({ input: e.target.value });
    }

    const handleMessage = (): void => {

      const author: string = 'Ross';

      if (this.state.input !== '') {
        this.context.send({
          message: this.state.input,
          author: author
        });
        this.setState({ input: '' });
      }
    };

    let msgIndex = 0;
    return (
      <div className="App">
        <div className="App-chatbox">
          {this.state.messages.map((msg) => {
            msgIndex++;
            return (
              <div key={msgIndex}>
                <p>{msg.author}</p>
                <p>
                  {msg.message}
                </p>
              </div>
            );
          })}
        </div>
        <input
          className="App-Textarea"
          placeholder="Type your messsage here..."
          onChange={updateInput}
          value={this.state.input}
        />
        <p>
          <button onClick={() => { handleMessage() }}>
            Send Message
          </button>
        </p>
      </div>
    );
  }
}

export default App;
