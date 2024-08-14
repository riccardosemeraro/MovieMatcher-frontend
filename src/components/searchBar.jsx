import React, { useState } from 'react';
import { Form, FormControl, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const SearchBar = () => {

  const chiaveAPI = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjAxNjQzNjI0ZGY2OTY5NDMwNTRjMzJkNGY3NmI3ZSIsIm5iZiI6MTcyMzExNTUzMS4zNzI1OTgsInN1YiI6IjY2YjRhNTcyZGUzODU5OGY2YTZkMDBmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QjgGj9sr5Euk1A8LEyl4riJw0YthkeujM1mT0rpoiX0";
  const options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer ' + chiaveAPI } };

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const location = useLocation(); //accedo all'url
  const navigate = useNavigate(); //per cambiare l'url

  const handleSearch = async (e) => {
    const query = e.target.value;
    setQuery(query);
    
    navigate(location.pathname); //se la search bar è vuota, riporto l'url alla pagina attiva

    if (query.length > 0) {
      try {

        navigate(location.pathname + '?search='+query); //cambia l'url con la query

        const response = axios.get('https://api.themoviedb.org/3/search/movie?query='+query+'&include_adult=false&language=it-IT&page=1', options)
          .then (response => {
            setResults(response.data.results);})
          .catch(err => console.error(err));

      } catch (error) {
        console.error('Errore nella richiesta API a TMDB:', error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className='searchBar' style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: 'auto',  }}>
      <Form>
        <FormControl
          type="search"
          placeholder="Cerca un film..."
          value={query}
          onChange={handleSearch}
          onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
          style={{
            width: '800px',
            height: '50px',
            padding: '10px 15px',
            borderRadius: '50px',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
            border: 'none',
            outline: 'none',
          }}
        />
      </Form>

      {results.length > 0 && (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
          <ListGroup style={{ position: 'absolute', top: '50px', width: '700px', zIndex: 1000, backgroundColor:'#6a0795', borderRadius:'20px', margin:'10px', overflow:'hidden', height:'fit-content', maxHeight:'600px', overflowY:'auto', display:'flex', flexDirection:'column'}}>
            {results.map((film) => (

              <Link to = {'/film/'+film.id+'-'+(film.title).split(" ").join("-")} style={{color:'white'}}>
                <ListGroup.Item key={film.id} style={{display:'flex', flexDirection:'row', alignItems:'center',}}>

                    <div className='film' key={film.id} style={{width: '100px', height:'auto'}}>
                        <img className = "img" src={"https://image.tmdb.org/t/p/w780" + film.poster_path} alt={film.title}/> 
                    </div>

                    {film.title} ({film.release_date ? film.release_date.split('-')[0] : 'N/A'})

                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
