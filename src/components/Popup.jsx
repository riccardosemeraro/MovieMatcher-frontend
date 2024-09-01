import React from 'react'
import '../style/popup.css'


/*props dovrebbe servire per definire una sorta di scheletro del popup in modo tale 
da poterne creare altri con la stessa base ma con dettagli diversi*/
function Popup (props){
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}> x </button>
                {props.children}
            </div>  
        </div>
    ) : "";
}

export default Popup;