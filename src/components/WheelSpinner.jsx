//WheelSpinner.jsx

import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const WheelSpinner = ({lista, vincitore}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(vincitore); // Imposta l'indice del vincitore
  const [list, setList] = useState(lista);

  useEffect(() => {
    setMustSpin(true); //fa iniziare a girare la ruota
  }, []);

  return (
    <>

    {
      console.log(prizeNumber)
    }

    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={list}
        onStopSpinning={() => setMustSpin(false)}
      />
    </div>

    </>
  );
};

export default WheelSpinner;