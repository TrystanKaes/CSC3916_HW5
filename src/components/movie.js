import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";

//support routing by creating a new component

class Movie extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.actorName}</b> {actor.characterName}
                </p>
            )
        }

        const ReviewInfo = ({reviews}) => {
            return reviews.map((review, i) =>
                <p key={i}>
                    <b>{review.username}</b> {review.review}
                    <Glyphicon glyph={'star'} /> {review.rating}
                </p>
            )
        }

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { //if not could still be fetching the movie
                return <div>Loading...</div>;
            }
            return (
              <Panel>
                  <Panel.Heading>Movie Detail</Panel.Heading>
                  <Panel.Body><Image className="image" src={currentMovie.imageUrl} thumbnail /></Panel.Body>
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