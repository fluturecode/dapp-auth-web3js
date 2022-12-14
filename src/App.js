import { useState } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState('');

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

  const onConnect = async() => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider) {
        await currentProvider.request({method: 'eth_requestAccounts'});
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        setIsConnected(true);
        }
    } catch(err) {
      console.log(err);
    }
  }

  const onDisconnect = () => {
    setIsConnected(false);
  }

  return (
    <div className='app'>
      <div className='app-header'>
        <h1>React DAPP with Auths</h1>
      </div>
      <div classsName='app-wrapper'>
        {!isConnected && (
          <div>
            <button className='app-button_login' onClick={onConnect}>
              Login
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className='app-wrapper'>
          <div className='app-detals'>
            <h2>You are connected to Metamask.</h2>
            <div className='app-balance'>
              <span>Balance:</span>
              {ethBalance}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
