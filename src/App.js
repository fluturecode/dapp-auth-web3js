import logo from './logo.svg';
import './App.css';

function App() {
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.detectCurrentProvider;
    } else {
      console.log('Non-ethereum browser detected. Please install Metamask.')
    }
    return provider;
  }

  return (
    <div className='app'>
      <div className='app-header'>
        <h1>React DAPP with Auths</h1>
      </div>
    </div>
  );
}

export default App;
