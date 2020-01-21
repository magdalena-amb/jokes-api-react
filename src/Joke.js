import React, { Component } from 'react';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import './Joke.css';

export default class Joke extends Component {
     
    getColor() {
        if(this.props.votes >= 15){
            return '#4caf50';
        }else if(this.props.votes >= 12){
            return '#8bc34a';
        }else if(this.props.votes >= 9){
            return '#cddc39';
        }else if(this.props.votes >= 6){
            return '#ffeb3b';
        }else if(this.props.votes >= 3){
            return '#ffc107';
        }else if(this.props.votes >= 0){
            return '#ff9800';
        }else {
            return '#f44336';
        }
    }

    getEmoji () {
        if(this.props.votes >= 15){
            return 'em em-rolling_on_the_floor_laughing';
        }else if(this.props.votes >= 12){
            return 'em em-laughing';
        }else if(this.props.votes >= 9){
            return 'em em-smiley';
        }else if(this.props.votes >= 6){
            return 'em em-slightly_smiling_face';
        }else if(this.props.votes >= 3){
            return 'em em-neutral_face';
        }else if(this.props.votes >= 0){
            return 'em em-confused';
        }else {
            return 'em em-angry';
        }
    }
    render(){
        const {upvote, downvote} = this.props;
        return (
            <div className='Joke'>
               <div className='Joke-buttons'>
                    <FaArrowDown className='Joke-downvote' onClick={downvote}/>  
                    <span className='Joke-votes' style={{borderColor:this.getColor()}}>{this.props.votes} </span>
                    <FaArrowUp className='Joke-upvote' onClick={upvote}/>
                </div>
                <div className='Joke-text'>{this.props.text} </div> 
                <div className='Joke-smiley'>
                <i className={this.getEmoji()} aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
                    </div> 
            </div>
        )
    } 
}