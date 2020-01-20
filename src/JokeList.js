import React, { Component } from 'react';
import axios from 'axios';

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
            <h1>Dad Jokes</h1> 
            <div className='JokeList-jokes'>
                {this.state.jokes.map(j => (
                    <div>{j}</div>
                ))}
            </div>
        </div>
    )
}