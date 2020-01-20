import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';
import uuid from 'uuid/v4';

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
            jokes.push({id:uuid(), text:res.data.joke, votes: 0});
            console.log(res);
        } 
        this.setState({...this.state, jokes});
    }

    handleVote = (id, delta) => {
        this.setState(st =>({
            jokes: st.jokes.map(j => 
                j.id === id ? {...j, votes: j.votes + delta } : j
                )
        }));  
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
                    <Joke 
                    upvote={() => this.handleVote(j.id, 1)}
                    downvote={() => this.handleVote(j.id, -1)}
                     key={j.id} text={j.text}  votes={j.votes} />
                ))}
            </div>
        </div>
    )
}