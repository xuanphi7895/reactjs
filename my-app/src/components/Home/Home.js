import React, { Component } from 'react';
import './Home.css';
import {API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../Config/config';
import HeroImages from '../elements/HeroImage/HeroImage';
// import LoadMoreBTN from '../elements/LoadMoreBtn/LoadMoreBtn';
 import MovieThumb from '../elements/MovieThumb/MovieThumb';
// import Navigation from '../elements/Navigation/Navigation';
import SearchBar from '../elements/SearchBar/SearchBar';
import LoadMoreBTN from '../elements/LoadMoreBtn/LoadMoreBtn';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Spinner from '../elements/Spinner/Spinner';

class Home extends Component{

    state = {
        movies: [],
        heroImages: null,
        loading: false,
        currentPage : 0,
        totalPages: 0,
        searchTerm : '',    
    }

    componentDidMount() {
        this.setState({loading: false});
        const endpoint = `${API_URL}movie/popular/?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint)
    }
    
    searchItems = (searchTerm) => {
        console.log(searchTerm);
        let endpoint = '';
        this.setState({
            movies: [],
            loading: true,
            searchTerm
        })

        if (this.state.searchTerm === ''){
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }

        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            this.setState({
                movies : [...this.state.movies, ...result.results],
                heroImage: this.state.heroImage || result.results[0],
                loading : false,
                currentPage: result.page,
                totalPages : result.total_pages
            })
        })
        .catch(error => console.log('Error: ', error))
    }

    loadMoreItems = () => {
        let endpoint = '';
        this.setState({loading: true});
        if (this.state.searchTerm === ''){
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        } else {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }
        this.fetchItems(endpoint);
    }


    render() {
        return(
            <div className = "rmdb-home"> 
              
                { this.state.heroImage ? 
                <div>
                    <HeroImages 
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                    title={this.state.heroImage.original_title}
                    text={this.state.heroImage.overview}
                    />
                    <SearchBar callback={this.searchItems} />
                </div> : null }
                <div className="rmdb-home-grid">
                    <FourColGrid 
                        header = {this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
                        loading = {this.state.loading}
                    >
                        {this.state.movies.map((elements, i) => {
                            return (
                                <MovieThumb
                                    key={i}
                                    clickable = {true}
                                    image ={elements.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${elements.poster_path}` : './images/no_image.jpg'} 
                                    movieId={elements.id}
                                    movieName={elements.original_title}
                                />
                            )
                        })}
                     </FourColGrid>
                     {this.state.loading ? <Spinner /> : null}
                     {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
                            <LoadMoreBTN text="Load more" onClick={this.loadMoreItems} /> : null }
                </div>
               
            </div>    
        )
    }
}

export default Home;