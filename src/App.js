import React from 'react';
import './App.css';
import Row from './Row';
import Banner from './Banner';
import requests from './request';
import Nav from './Nav';
function App() {

  console.log("Hanya untuk TUJUAN EDUKASI *** FOR EDUCATION PURPOSE ONLY **** ini adalah netflix clone dibuat di akhir januari 2021 oleh @yodagunawan yang merupakan hasil pembelajaran  dari clever programer youtube channel ");
  return (
    <div className="App">
    <Nav/>
    <Banner/>
   <Row title="NETFLIX ORIGINALS" 
   fetchUrl={requests.fetchNetflixOriginals}
   isLargeRow
   />
   <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
   <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
   <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
   <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
   <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
   <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
   <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
 
    </div>
  );
}

export default App;
