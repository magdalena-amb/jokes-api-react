import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';
import uuid from 'uuid/v4';
import { FaLaugh } from "react-icons/fa";

export default class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 5,
    };

    state = {
        jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
        loading: false,
    }   
    
    componentDidMount() {
        if(this.state.jokes.length === 0){
            // load jokes
            this.getJokes();
        }   
    }

    async getJokes() {
        let jokes = [];
        while( jokes.length < this.props.numJokesToGet) {
            let res = await axios.get('https://icanhazdadjoke.com/', {
            headers: { Accept: "application/json "}
            });
            jokes.push({id:uuid(), text:res.data.joke, votes: 0});
        } 

        this.setState(st => ({
            jokes: [...st.jokes, ...jokes],
            loading: false,
         }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));
    }

    handleVote = (id, delta) => {
        this.setState(st =>({
            jokes: st.jokes.map(j => 
                j.id === id ? {...j, votes: j.votes + delta } : j
                )
        }),
         () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );  
    }

    handleClick = () => {
        this.setState(
            {loading: true},
            this.getJokes);
    }

    render() {
        if (this.state.loading) {
            return (
                <div className='JokeList-spinner'>
                    <FaLaugh className='JokeList-spinner-icon' />
                    <h1 className='JokeList-title'>Loading...</h1>
                </div>
                
            )
        }
        return (
            <div className='JokeList'>
                <div className='JokeList-sidebar'>
                    <h1 className='JokeList-title'><span>Dad</span> Jokes</h1> 
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt='smily face'/>
                    <button onClick={this.handleClick} className='JokeList-getmore'> New Jokes </button>
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
    
}