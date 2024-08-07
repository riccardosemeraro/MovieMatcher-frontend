import '../style/slider.css';

function Slider() {

    return (
        <>
        <div className="sliderContainer">
            <h2>Film della settimana</h2>
            <div className="slider">
                <div className="film">array</div> {/*array di film*/}
            </div>                
        </div>
        <div className="sliderContainer">
            <h2>Consigliati per te</h2>
            <div className="slider">
                {/*array di film*/}
            </div>                
        </div>
        </>
    );
}

export default Slider;