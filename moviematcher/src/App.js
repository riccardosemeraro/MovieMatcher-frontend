import logo from './logo.svg';
import './App.css';
import SignupButton from './components/signup-button';
import AuthenticationButton from './components/authentication-button';


function App() {
  return (
    <div className="App">
      <SignupButton />
      <AuthenticationButton />
    </div>
  );
}

export default App;
