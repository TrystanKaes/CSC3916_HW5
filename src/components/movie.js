import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";

//support routing by creating a new component

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: {
                name: localStorage.getItem('username'),
                review_quote: '',
                rating: 0,
                movieId: this.props.selectedMovie.movieId,
            }
        };
        // this.handleUpdate = this.handleUpdate.bind(this);
        // this.postRev = this.postRev.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {
        const ActorInfo = ({actors}) => {
            if(actors) {
                return actors.map((actor, i) =>
                    <p key={i}>
                        <b>{actor.actorName}</b> {actor.characterName}
                    </p>
                )
            }else{
                return <div>Loading...</div>;
            }
        }

        const ReviewInfo = ({reviews}) => {
            if(reviews) {
                return reviews.map((review, i) =>
                    <p key={i}>
                        <b>{review.username}</b> {review.quote}
                        <Glyphicon glyph={'star'}/> {review.rating}
                    </p>
                )
            }else{
                return <div>Loading...</div>;
            }
        }

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { //if not could still be fetching the movie
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Movie Detail</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentMovie.image} thumbnail /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.title}</ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.actors} /></ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'}/> {currentMovie.avgRating} </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Body><ReviewInfo reviews={currentMovie.reviews} /></Panel.Body>
                </Panel>
            );
        }

        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));