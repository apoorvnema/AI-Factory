import React, { Component, useEffect, useState } from 'react';
import '../App.css';

function SplashMessage() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
        }, 200);

        return () => clearInterval(intervalId);
    }, []);

    const isMobile = window.innerWidth <= 768;

    return (
        <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <img src="/ai-factory-logo.png" style={{ width: isMobile ? '50%' : '25%', marginTop: '10%' }} className="App-logo" alt="logo" />
            <p className='chat-message' style={{ color: 'white', position: 'absolute', bottom: '10px', fontSize: 'x-large' }}>Loading{dots}</p>
        </div>
    );
}

export default function withSplashScreen(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
            };
        }

        async componentDidMount() {
            try {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 1000);
            } catch (err) {
                console.log(err);
                this.setState({
                    loading: false,
                });
            }
        }

        render() {
            // while checking user session, show "loading" message
            if (this.state.loading) return <SplashMessage />;

            // otherwise, show the desired route
            return <WrappedComponent {...this.props} />;
        }
    };
}
