import "../style/lobby.css";
import { useNavigate } from 'react-router-dom';

import { FaCopy } from 'react-icons/fa'; // Importa l'icona FaCopy

function LobbyPage() {

    const navigate = useNavigate();

    const handleCopy = (event) => {
        // Seleziona il tag <p> immediatamente precedente
        const specificElement = document.querySelector('.codice');
        
        if (specificElement) {
          // Crea un elemento di input temporaneo
          const tempInput = document.createElement('input');
          tempInput.value = specificElement.textContent;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          alert('Testo copiato: ' + specificElement.textContent);
        } else {
          alert('Testo non trovato, impossibile copiare');
        }

        /*  alternativa
        const previousParagraph = event.target.previousElementSibling;
        if (previousParagraph && previousParagraph.tagName === 'P') {
            try {
                await navigator.clipboard.writeText(previousParagraph.textContent);
                alert('Testo copiato: ' + previousParagraph.textContent);
            } catch (error) {
                console.error('Errore nella copia del testo:', error);
            }
            } else {
            alert('Nessun paragrafo precedente trovato.');
            }
        };
        */
    };

    const handleShare = async () => {
    if (navigator.share) {
        try {
        await navigator.share({
            title: 'Condividi questo link',
            text: 'Ecco il link per la stanza di gioco:',
            url: window.location.href, // Condivide l'URL corrente - da cambiare con il link della stanza di gioco
        });
        console.log('Link condiviso con successo');
        } catch (error) {
        console.error('Errore nella condivisione del link:', error);
        }
    } else {
        alert('La condivisione non è supportata su questo browser.');
    }
    };
    
    return (
        <>

        <div className="lobby-mobile">
            <div className="dati-partita">
                <div className="dati">
                    <p>Codice:</p>
                    <p className="codice">codice</p>
                    <button onClick={handleCopy}><FaCopy/></button> {/*📋 */}
                </div>
                <div className="dati">
                    <p>Link:</p>
                    <button onClick={handleShare}>Condividi</button>
                </div>            </div>
            <div className="giocatori">
                <h3>Giocatori</h3>
                <ul>
                    <li>Nome1</li>
                    <li>Nome2</li>
                    <li>Nome3</li>
                    <li>Nome4</li>
                    <li>Nome2</li>
                    <li>Nome3</li>
                    <li>Nome4</li>
                    {/* .map dei giocatori in partita */}
                </ul>
            </div>
            <div className="bottoni">
                <button onClick={()=> navigate('/gameRoom')}>Esci</button>
                <button>Impostazioni</button>
                <button onClick={()=> navigate('/gameRoom/matchRoom')}>Avvia</button>
            </div>
        </div>

        <div className="lobby-desktop">
            <div className="bottoni">
                <button onClick={()=> navigate('/gameRoom')}>Esci</button>
                <button>Impostazioni</button>
                <button onClick={()=> navigate('/gameRoom/matchRoom')}>Avvia</button>
            </div>
            <div className="dati-container">
                <div className="dati-partita">
                    <div className="dati">
                        <p>Codice:</p>
                        <p>codice</p>
                        <button onClick={handleCopy}><FaCopy/></button>
                    </div>
                    <div className="dati">
                        <p>Link:</p>
                        <button onClick={handleShare}>Condividi</button>
                    </div>            </div>
                <div className="giocatori">
                    <h3>Giocatori</h3>
                    <ul>
                        <li>Nome1</li>
                        <li>Nome2</li>
                        <li>Nome3</li>
                        <li>Nome4</li>
                        <li>Nome2</li>
                        <li>Nome3</li>
                        <li>Nome4</li>
                    </ul>
                </div>
            </div>
        </div>

        </>
    );
}

export default LobbyPage;