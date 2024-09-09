/*import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../style/dropdown.css';

function GiocaCon() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Gioca con"> <h2>Gioca con</h2>
      <Dropdown.Item href="#/action-1">Film visti</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Film da vedere</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Generi</Dropdown.Item>
    </DropdownButton>
  );
}

export default GiocaCon;*/

import {useState} from 'react';
import '../style/dropdown.css';

function Dropdown (){
    const [value, setValue] = useState('')
    const options = [
        { label: " Film da vedere", value: 1},
        { label: " Film visti", value: 2},
        { label: " Generi", value: 3},
    ]
    function handleSelect(){
        setValue(EventTarget.value);
    }

    return (
        <div className="cointainer-dropdown">
            
            <select className="from-select" onChange={handleSelect}>
                {options.map(option => (
                    <option className='option-dropdown' value={option.value}>{option.label}</option>
                ))}
            </select>
            
        </div>
    )
}

export default Dropdown;