import logo from './logo.svg';
import './App.css';
import './styles/reset.css';
import * as React from 'react';

import {useState} from 'react';
import {makeRequest} from './api/api-request';

import SideMenu from './components/SideMenu/SideMenu';
import ChatMessage from './components/ChatMessage/ChatMessage';

function App() {
    const [input, setInput] = useState('');
    const [chatLog, setChatLog] = useState([{
        user: "gpt",
        message: "Em que posso lhe ajudar hoje?"
    }])

    async function handleSubmit(e) {
        e.preventDefault();
        let response = await makeRequest({promt: input})
        response = response.data.split('\n').map(line => <p>{line}</p>);
        setChatLog([...chatLog, {
            user: 'me',
            message: `${input}`
        }, {
            user: 'gpt',
            message: response
        }])
        setInput("")
    }

    return (
        <div className="App">
            <SideMenu></SideMenu>
            <section className="chatbox">
                <img src={logo} className="App-logo" alt="logo"/>
                <div className="chat-log">
                    {chatLog.map((message, index) => (
                        <ChatMessage key={index} message={message}/>
                    ))}
                </div>
                <div className="chat-input-holder">
                    <form onSubmit={handleSubmit}>
                        <input autoFocus={true}
                            rows="1"
                            className="chat-input-textarea"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            />
                    </form>
                </div>
            </section>
        </div>
    );
}

export default App;
