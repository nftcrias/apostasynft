import { useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import SelectOrder from './components/selectorder';
import RpgWindow from './components/rpgwindow';
import CollectBlood from './components/collectblood';
import Player from './components/player';
import Logo from './assets/images/logo.png';
import Statues from './assets/images/statues.gif';

function App() {

  const [wallets, setWallets] = useState([]);
  const [step, setStep] = useState(3);

  const isConnected = Boolean(wallets[0]);

  async function connectWallet() {
    if (window.ethereum) {
        const wlts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setWallets(wlts);
    }
  }

  // Fired when the order as been choseen
  // selected equals to 1 = Angel / 2 = Human / 3 = Demon
  function SelectedOrderCallBack(selected) {
    
  }

  return (
    <div className="App">
      <div>

        {isConnected ? (
          <div>
            <div>
              <p class="wallet">{wallets[0]}</p>
              <img class="logoSmall" src={Logo} alt=""/>
            </div>
            {step === 1 && <RpgWindow />}
            {step === 2 && <SelectOrder SelectedOrder={SelectedOrderCallBack}/>}
            {step === 3 && <CollectBlood />}
          </div>
        ) : (
          <div class="introArea">
            <Player />
            <img class="logoNormal" src={Logo} alt="" />
            <p class="intro">Darkness takes over the forest and the only source of light is your torch. Dangerous creatures are on the prowl, but there's something more sinister in the shadows. You feel that something mysterious is hiding around you and you don't know what it is. Will you find the way out before this presence reveals itself?</p>
            <div class="button" onClick={connectWallet}>Connect Wallet</div>
          </div>
        )}

        <div id="statuesContainer">
          <img class="statues" src={Statues} alt="" />
        </div>
        <div class="footer">
            <p>And with this, the cups of wrath will be fed with their souls until one of them overflows, and then it starts the end...</p>
        </div>
      </div>
    </div>
  );
}

export default App;