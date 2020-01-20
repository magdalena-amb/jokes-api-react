import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css';

export default class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10,
    };

    state = {
        jokes: []
    }

    async componentDidMount() {
        // load jokes
        let jokes = [];
        while( jokes.length < this.props.numJokesToGet) {
            let res = await axios.get('https://icanhazdadjoke.com/', {
            headers: { Accept: "application/json "}
            });
            jokes.push(res.data.joke);
            console.log(res);
        } 
        this.setState({...this.state, jokes});
    }

    render = () => (
        <div className='JokeList'>
            <div className='JokeList-sidebar'>
                <h1 className='JokeList-title'><span>Dad Jokes</span></h1> 
                <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt='smily face'/>
                <button className='JokeList-getmore'> New Jokes </button>
            </div>
            <div className='JokeList-jokes'>
                {this.state.jokes.map(j => (
                    <div>{j}</div>
                ))}
            </div>
        </div>
    )
}