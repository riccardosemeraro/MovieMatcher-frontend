import '../style/slider.css';

function Slider() {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjAxNjQzNjI0ZGY2OTY5NDMwNTRjMzJkNGY3NmI3ZSIsIm5iZiI6MTcyMzExNTUzMS4zNzI1OTgsInN1YiI6IjY2YjRhNTcyZGUzODU5OGY2YTZkMDBmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QjgGj9sr5Euk1A8LEyl4riJw0YthkeujM1mT0rpoiX0'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/now_playing?language=it-IT&page=1', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    return (
        <>
        <div className="sliderContainer">
            <h2>Film della settimana</h2>
            <div className="slider">
                <div className="film">array</div> {/*array di film*/}
            </div>                
        </div>
        {/*
        <div className="sliderContainer">
            <h2>Consigliati per te</h2>
            <div className="slider">
                {/*array di film/}
            </div>                
        </div>
        */}
        </>
    );
}

export default Slider;