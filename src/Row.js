import { set } from 'mongoose'
import React,{useEffect, useState} from 'react'
import axios from './axios'
import './Row.css';
import Youtube from 'react-youtube'
const base_url = "https://image.tmdb.org/t/p/original"
consconst [movies, setMovies] = useState([]);
const [trailerUrl, setTrailerUrl] = useState("");

useEffect(() => {

  async function fetchData() {

    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  }
  fetchData();
}, [fetchUrl]);

const opts = {
  height: "390",
  width: "99%",
  playerVars: {
    autoplay: 0,
  }
}

const handleClick = (movie) => {
  // console.table(movie?.title)
  if (trailerUrl) {
    setTrailerUrl('')
  } else {
    movieTrailer(movie?.title || "")
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      }).catch((error) => console.log(error));
  }

    return (
        <div className='row'>
            {/*title*/}
            <h2>{title}</h2>
            {/*containers with posters*/}
           

            <div className='row-posters'>
                {/*row posters*/}
                {movies.map((movie)=>(
                    <img
                     key={movie.id} /*this makes react efficient rerender */
                className={`row-poster ${isLargeRow && "row-posterLarge"}`} src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name}/>
                ))}

            </div>
            <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>

        </div>
    )
}

export default Row
