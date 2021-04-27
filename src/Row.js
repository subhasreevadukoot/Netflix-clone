import { set } from 'mongoose'
import React,{useEffect, useState} from 'react'
import axios from './axios'
import './Row.css'
const base_url = "https://image.tmdb.org/t/p/original"
const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies,setMovies]= useState([])

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request
        }
      fetchData()
        //if [] run once when the component loads, and dont load againm
        //any variable u use inside ur react hooks has to be given as a dependancy otherwise it wont rerender with the variable info
    }, [fetchUrl])
    console.log(movies)
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


        </div>
    )
}

export default Row
