import '../style/popup.css'
import Dropdown from '../components/Dropdown';
import { SlGameController } from "react-icons/sl";
import "../style/slGameController.css";
import { LuTextCursorInput } from "react-icons/lu";
import "../style/LuTextCursorInput.css";
import { RiLockPasswordLine } from "react-icons/ri";
import "../style/RiLockPasswordLine.css";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Popup (props){

    const navigate = useNavigate();


    return (
        (props.trigger) ? (

        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}> x </button>
                {props.children}

                {
                    props.type==="Impostazioni-partita" &&
                    <>
                    <div className="Contenitore-Impostazioni">
                        <div className="Titolo">
                            <h1 className='impostazioni-match'> Impostazioni Partita </h1>
                            <br/>
                        </div>
                        <div className="GiocaCon">
                            <div className="GiocaConIcon">
                                <SlGameController className="controller-icon"/>
                            </div>
                            <div className="GiocaConLabel">
                                <h2 className='giocacon'> Gioca con </h2>
                            </div>
                            <div className="GiocaConDropdown">
                                <Dropdown> </Dropdown>
                            </div>   
                        </div>

                        <div className="NomePartita">
                            <div className="NomePartitaIcon">
                                <LuTextCursorInput className="LuTextCursorInput-icon"/>
                            </div>
                            <div className="NomePartitaLabel">
                                <h2 className='nome-partita'> Nome partita </h2>
                            </div>
                            <div className="NomePartitaInput">
                                <input type="text" className="Inserire-nome-partita" placeholder="Inserire nome partita" />
                            </div>   
                        </div>
                        <div className='Btn-crea'>
                            <Button variant="primary" className='crea-button' onClick={()=> navigate('/gameRoom/lobby')}> 
                                <h2 className='titolo-bottone-crea'>Crea Partita</h2>
                            </Button>
                        </div>
                        
                          
                    </div>
                        
                    </>
                }

                {
                    props.type==="Partecipa-a-partita" &&
                    <>
                    <div className="Contenitore-Partecipa">
                        <div className="Titolo">
                            <h1 className='impostazioni-partecipa'> Partecipa a partita </h1>
                            <br/>
                        </div>
                        <div className="CodicePartitaInput">
                            <input type="text" className="Inserire-codice-partita" placeholder="Inserire codice partita" />
                        </div>
                        <div className="PasswordIcon">
                            <RiLockPasswordLine className='RiLockPasswordLine-icon'/>
                        </div>
                        <div className='Btn-partecipa'>
                            <Button variant="primary" className='partecipa-a-partita-button' onClick={()=> navigate('/gameRoom/lobby')}> 
                                <h2 className='titolo-button-partecipa'>Partecipa a partita</h2>
                            </Button>
                        </div>
                    </div> 
                    </>
                }

                {
                    props.type==="Modifica-film-generi" &&
                    <>
                    <div className="Contenitore-modifica-film-generi">
                        <div className="Titolo">
                            <h1 className='label-impostazioni-modifica-film-generi'> Modifica film o generi </h1>
                            <br/>
                        </div>
                        
                    </div> 
                    </>

                }
            </div>  
        </div>
        ) : ""
    );
}

export default Popup;