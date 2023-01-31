import React, {useRef, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import '@vonage/video-publisher/video-publisher.js';
import '@vonage/video-subscribers/video-subscribers.js';
import '@vonage/screen-share/screen-share.js';

function App() {
    // Get references to Web Components
    const [isLoading, setIsLoading] = useState(true)
    const publisher = useRef(null);
    const subscribers = useRef(null);
    const screenshare = useRef(null);

    // These values normally come from the backend in a production application, but for this demo, they are hardcoded

    const toggleVideo = () => {
        publisher.current.toggleVideo();
    };

    const toggleAudio = () => {
        publisher.current.toggleAudio();
    };

    useEffect(() => {
        const OT = window.OT;
        let sessionId;
        let apiKey = 47570931;
        let token;
        let session;

        async function getSessionIdAndOtherStaff() {
            const response = await fetch(`https://ozimtestapi1.onrender.com/api/v1/sessions/63d8015ce7ecd339d88157b9`);
            const data = await response.json();
            if(data) {
                setIsLoading(false)
            }
            sessionId = data?.data?.sessionId;
            token = data?.data?.token;
            console.log('token ', token)
            console.log('sessionId ', sessionId)
            // Initialize an OpenTok Session object
            session = OT.initSession(apiKey, sessionId);



            // Set session and token for Web Components
            publisher.current.session = session;
            publisher.current.token = token;
            subscribers.current.session = session;
            subscribers.current.token = token;
            screenshare.current.session = session;
            screenshare.current.token = token;
        };

        getSessionIdAndOtherStaff();

    });


    if(isLoading === true) {
        return <div>Loading...</div>
    }

    if(isLoading === false) {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div className="App-container">
                    <section className="App-section-publisher">
                        <fieldset>
                            <legend>Publisher</legend>
                            <video-publisher width="360px" height="240px" ref={publisher}></video-publisher>
                        </fieldset>
                        <button onClick={toggleVideo}>
                            toggle Video
                        </button>
                        <button onClick={toggleAudio}>
                            toggle Audio
                        </button>
                        <br/><br/>
                        <screen-share start-text="start" stop-text="stop" width="300px" height="240px" ref={screenshare}></screen-share>
                    </section>
                    <section className="App-section-subscribers">
                        <fieldset>
                            <legend>Subscribers</legend>
                            <video-subscribers width="360px" height="240px" ref={subscribers}></video-subscribers>
                        </fieldset>
                    </section>
                </div>
            </div>
        );
    }

}

export default App;
