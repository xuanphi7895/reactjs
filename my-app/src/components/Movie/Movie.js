import React, {Component} from 'react';
import { API_URL, API_KEY } from '../../Config/config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';

class Movie extends Component {

    state = {
        movies: null,
        actors: null,
        directors: [],
        loading: false
    }

    componentDidMount(){
        if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
            const state = JSON.parse(localStorage.getItem(`${this.props.match.params.movieId}`));
            this.setState({...state});
        }
        this.setState({loading: true})
        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log(result);
            if (result.status_code){
                this.setState({ loading: false });
            } else {
                this.setState({ movie: result }, () => {
                    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
                    fetch(endpoint)
                    .then(result => result.json())
                    .then(result => {
                        const directors = result.crew.filter((menber) => menber.job === "Director");
                        this.setState({
                            actors: result.cast,
                            directors,
                            loading: false
                        }, () => {
                            localStorage.setItem(`${this.props.match.params.movieId}`, JSON.stringify(this.state));
                        })
                    })
                })
            }
        })
        .catch(error => console.log("Error: ", error))
    }

    render(){
        return(
            <div className="rmdb-movie">
                {/* <Navigation />
                <MovieInfo />
                <MovieInfoBar />
                <FourColGrid />
                <Spinner /> */}
                {this.state.movies ?
                <div>
                       <Navigation movie = {this.props.location.movieName}/>
                        <MovieInfo  movie = {this.props.movies} directors = {this.state.directors} />
                        <MovieInfoBar time={this.state.movies.runtime} budget ={this.state.movies.budget} revenue = {this.state.movies.revenue} />
                </div>    
                 : null  }
                { this.state.actors ? 
                <div className="rmdb-movie-grid"> 
                    <FourColGrid header={'Actors'}>
                        {this.state.actors.map((element, i) => {
                            return <Actor key={i} actor={element} ></Actor>
                        })}
                        </FourColGrid>
                 </div>  : null   }
                 {!this.state.actors && !this.state.loading ? <h1> Not found movie</h1> : null}
                 {this.state.loading ? <Spinner /> : null}

            </div>
        )
    }
}

export default Movie;