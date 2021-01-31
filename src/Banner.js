import React,{ useState, useEffect  }from 'react'
import './Banner.css';
import axios from './axios';
import requests from './request';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';


function Banner() {
  const [movie, setMovie] = useState([]);
  const[trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
   async function fetchData(){
    const request = await axios.get(requests.fetchNetflixOriginals);
    const fungsi = Math.floor(Math.random()*request.data.results.length - 1);
    setMovie(
     request.data.results[fungsi]
   
    );
    return request;
   }
   fetchData();
  }, []);


function truncate(str, n){
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
}

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
    return (
       <header className="banner"
        style={{
            backgroundSize:"cover",
            backgroundImage:`url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition:"center center"
        }}       
       >

           <div className="banner__contents">
           {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
           <h1 className="banner__title">
             {movie?.title || movie?.name || movie?.original_name}
           </h1>
           <div className="banner__buttons">
               <button 
               className="banner__button"
               onClick={()=> handleClick(movie)}
               >Play</button>
               <button className="banner__button">My List</button>
           </div>
           <h1 className="banner_description">
               {truncate(movie?.overview, 250)}
           </h1>
           </div>
          
           <div className="banner--fadeBottom"/>
       </header>
    )
}

export default Banner
