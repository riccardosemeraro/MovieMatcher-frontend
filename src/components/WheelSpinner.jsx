//WheelSpinner.jsx

import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';

import '../style/spinner.css';

const WheelSpinner = ({lista, vincitore}) =>  {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(vincitore); // Imposta l'indice del vincitore
  const [list, setList] = useState(lista);

  console.log('lista: ', list);

  const backgroundColors = ['#6a0795', '#FFD200', '#61dafb', '#ff4458'];

  // Funzione per ottenere il colore con offset ciclico
  const getColorsWithOffset = (numElements, colors) => {
    const result = [];
    const colorCount = colors.length;

    for (let i = 0; i < numElements; i++) {
      let colorIndex = i % colorCount;

      // Se il colore corrente è uguale al precedente, scegli il prossimo colore
      if (i > 0 && result[i - 1] === colors[colorIndex]) {
        colorIndex = (colorIndex + 1) % colorCount;
      }

      result.push(colors[colorIndex]);
    }

    return result;
  };

  useEffect(() => {
    setTimeout(() => {
      setMustSpin(true); //fa iniziare a girare la ruota
    }, 2000);
  }, []);

  
  return (
    <>
    <div className='spinWheel'>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={list.map((element) => ({
          option: element.film.title,
          
        }))}
        onStopSpinning={() => setMustSpin(false)} 
        backgroundColors={getColorsWithOffset(list.length, backgroundColors)}
        textColors={['#ffffff']}
        fontSize={25}

        innerRadius={10}
        radiusLineWidth={0}
        textDistance={60}
        perpendicularText={false}
      />
    </div>
    

    </>
  );
};

export default WheelSpinner;