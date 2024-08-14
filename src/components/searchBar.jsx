import React, { useEffect, useRef, useState } from 'react';
import { Form, FormControl, ListGroup, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import '../style/searchBar.css'; 


const SearchBar = () => {

  const chiaveAPI = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjAxNjQzNjI0ZGY2OTY5NDMwNTRjMzJkNGY3NmI3ZSIsIm5iZiI6MTcyMzExNTUzMS4zNzI1OTgsInN1YiI6IjY2YjRhNTcyZGUzODU5OGY2YTZkMDBmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QjgGj9sr5Euk1A8LEyl4riJw0YthkeujM1mT0rpoiX0";
  const options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer ' + chiaveAPI } };

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState(false);
  const inputRef = useRef(null);

  const location = useLocation(); //accedo all'url
  const navigate = useNavigate(); //per cambiare l'url

  const handleSearch = async (e) => {
    const query = e.target.value;

    setQuery(query);
    
    if (query.length > 0) setSearch(false);
    else setSearch(true);
    
    if (query.length == 0) navigate(location.pathname); //se la search bar è vuota, riporto l'url alla pagina attiva

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
    <div className='searchBar'>
      <Form>
        <FormControl
          className='formControl'
          ref={inputRef}
          type="search"
          placeholder="Cerca il film adatto a te..."
          value={query}
          onChange={handleSearch} //ogni volta che si scrive qualcosa nella search bar, viene chiamata la funzione handleSearch
          onKeyPress={(e) => e.key === 'Enter' && e.preventDefault() && inputRef.current.blur()} // Nasconde la tastiera su mobile
        />
      </Form>
      <FontAwesomeIcon className={search ? 'iconItem' : 'iconOff'} icon={faSearch} />

      {results.length > 0 && (
        <div className='responseContainer'>
          <ListGroup className='listGroup'>
            {results.map((film) => (
              <Link to = {'/film/'+film.id+'-'+(film.title).split(" ").join("-")} className='linkItem'>
                <ListGroup.Item key={film.id} className='listGroupItem'>
                    <div className='filmItem' key={film.id}>
                        <img src={"https://image.tmdb.org/t/p/w780" + film.poster_path} alt={film.title}/> 
                    </div>
                    <p>{film.title} ({film.release_date ? film.release_date.split('-')[0] : 'N/A'})</p>
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
