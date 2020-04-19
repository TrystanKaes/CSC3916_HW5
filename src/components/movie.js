import React, { Component }  from 'react';
import {connect} from "react-redux";
import {
    Glyphicon,
    Panel,
    ListGroup,
    ListGroupItem,
    FormGroup,
    Col,
    Button,
    Form,
    Image,
    FormControl
} from 'react-bootstrap'
import {
    fetchMovie,
    postReview
} from "../actions/movieActions";
import { withRouter } from "react-router-dom";

//support routing by creating a new component

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: {
                quote: '',
                rating: 0,
                movieId: this.props.movieId,
            },
            reviewed: false
        };
        this.updateDetails = this.updateDetails.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    handlePost(){
        const {dispatch} = this.props;
        if(this.state.review.quote === '' || this.state.review.rating === 0){
            alert("You gotta actually review it!");
        }else{
            dispatch(postReview(this.state.review));
            this.forceUpdate()
            this.setState({reviewed: true})
        }
    }

    updateDetails(event){
        let updateReview = Object.assign({}, this.state.review);
        if(event.target.name === "rating"){
            updateReview['rating'] = event.target.value;
            this.setState({review: updateReview})
        }else if(event.target.name === "quote"){
            updateReview['quote'] = event.target.value;
            this.setState({review: updateReview})
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

        const ReviewField = () => {
            return(
                <div>
                    <h4>Want to leave a rating of your own?</h4>
                    <Form horizontal>
                        <FormGroup controlId="review">
                            <form>
                                <label>
                                    <Col>
                                        Rating:
                                    </Col>
                                    <select name="rating"
                                            value={this.state.review.rating}
                                            onChange={this.updateDetails}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </label>
                            </form>
                            <form>
                                <label>
                                    <Col>
                                        Review:
                                    </Col>
                                    <FormControl autoFocus
                                              onChange={this.updateDetails}
                                              value={this.state.review.quote}
                                              name="quote"
                                              placeholder="Tell us what you thought..."/>
                                </label>
                            </form>
                            <Col>
                                <Button onClick={this.handlePost}>Post</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            )
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
                        <ListGroupItem><h1>{currentMovie.title}</h1></ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.actors} /></ListGroupItem>
                        <ListGroupItem><h4>
                            Average Rating {currentMovie.avgRating}
                            <Glyphicon glyph={'star'}/>
                        </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Body><ReviewInfo reviews={currentMovie.reviews} /></Panel.Body>
                    <Panel.Body>
                        {this.state.reviewed ? <h4>Review Submitted!</h4> : <ReviewField />}
                    </Panel.Body>
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