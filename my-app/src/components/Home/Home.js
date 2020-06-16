import React, { Component } from 'react';
import './Home.css';
import {API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../Config/config';
import HeroImages from '../elements/HeroImage/HeroImage';
// import LoadMoreBTN from '../elements/LoadMoreBtn/LoadMoreBtn';
// import MovieThumb from '../elements/MovieThumb/MovieThumb';
// import Navigation from '../elements/Navigation/Navigation';
import SearchBar from '../elements/SearchBar/SearchBar';
import LoadMoreBTN from '../elements/LoadMoreBtn/LoadMoreBtn';

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
               
                <LoadMoreBTN />
            </div>    
        )
    }
}

export default Home;