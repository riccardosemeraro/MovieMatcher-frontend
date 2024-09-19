//WheelSpinner.jsx

import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';

import '../style/spinner.css';

const WheelSpinner = ({lista, vincitore}) =>  {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0); // Imposta l'indice del vincitore
  //const [list, setList] = useState(lista);

  const vett = lista.map((element) => ({
    option: element.film.title
    
  }));

  console.log('vincitore: ', vincitore);

  const posVincitore = vett.findIndex((element) => element.option === vincitore.film.title);

  console.log('posVincitore: ', posVincitore, 'type',  typeof posVincitore);

  console.log('vett: ', vett);

  //console.log('lista: ', list);

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
    
    if(vett.length > 0) setMustSpin(true); //fa iniziare a girare la ruota
    
  }, []);

  
  return (
    <>
    <div className='spinWheel'>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={posVincitore}
        data={vett}
        onStopSpinning={() => setMustSpin(false)} 
        backgroundColors={getColorsWithOffset(lista.length, backgroundColors)}
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