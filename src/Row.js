import React,{useState,useEffect} from 'react'
import YouTube from 'react-youtube';
import axios from "./axios";
import './Row.css';
import movieTrailer from 'movie-trailer';


const base_url = "https://image.tmdb.org/t/p/original/"

function Row({title, fetchUrl, isLargeRow}) {
    const[movies,setMovies]=useState([]);
    const[trailerUrl, setTrailerUrl] = useState("");
//  useEffect use for if[],run once when the row loads, and don't run it again
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    const opts ={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        }

    };
    
    const handleClick = async(movie) => {
        console.table(movie);
        console.log(movie.title || movie.name);
     
        movieTrailer(movie?.title|| movie?.name)
        .then(
            (url)=>{
                const x = new URL(url).search;
                if(x!==""){
                    const urlParams = new URLSearchParams(x);
                    console.log(`https://www.youtube.com/watch${x}`);
                    setTrailerUrl(urlParams.get('v'));
                }else{
                    console.log("trailer perlu dicari");
                }
            }
            
            ).catch(error => console.log(error))
   
       }
       

    // console.table(movies);
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
            {}
            {movies.map(movie=>(
                 <img 
                 key={movie.id}
                 onClick={()=> handleClick(movie)}
                 className={`row__poster ${isLargeRow && "row_posterLarge"}`}
                 src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                 alt={movie.name}/>
            ))}
            </div>
            {trailerUrl &&  <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
