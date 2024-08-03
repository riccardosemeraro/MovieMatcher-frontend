import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../style/settingsPage.css';

function SettingsPage() {
  return (
    <div className="settings-page">
      <Header />
      <main>
        <h1>Impostazioni</h1>
        <div className="settings-content">
          <section>
            <h2>Account</h2>
            <button>Modifica email</button>
            <button>Cambia password</button>
          </section>
          <section>
            <h2>Preferenze di ricerca</h2>
            <label>
              Distanza massima:
              <input type="range" min="1" max="100" defaultValue="50" />
            </label>
            <label>
              Fascia d'età:
              <input type="range" min="18" max="99" defaultValue="30" />
            </label>
          </section>
          <section>
            <h2>Notifiche</h2>
            <label>
              <input type="checkbox" defaultChecked /> Nuovi match
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Nuovi messaggi
            </label>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SettingsPage;