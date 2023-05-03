import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectOrder from './components/selectorder';
import RpgWindow from './components/rpgwindow';
import CollectBlood from './components/collectblood';
import Player from './components/player';
import Logo from './assets/images/logo.png';
import Statues from './assets/images/statues.gif';

function App() {

  const [wallets, setWallets] = useState([]);
  const isConnected = Boolean(wallets[0]);

  async function connectWallet() {
    if (window.ethereum) {
        const wlts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setWallets(wlts);
        await handle(wlts);
    }
  }

  async function handle(wallets) {
    if (wallets.length > 0) {
      var eth_address = wallets[0];
      var query = new URLSearchParams(window.location.search);
      var codex = query.get("c") ?? "";

      // Criar cabeçalho
      var headers = new Headers();
      headers.append("eth_address", eth_address);
      headers.append("codex", codex);

      // Fazer a requisição POST
      var auth = await fetch(window.location.protocol + "//" + window.location.host + "/auth", 
      {
        method: "POST",
        headers, 
        body: {}
      });

      // Se for tudo ok
      if (auth.ok) {
        var json = await auth.json();
        var data = json.data;
        switch(data.status){
          // RPG
          case 0:
            //history.push("/play");
            break;
          // Order
          case 1:
            //history.push("/order");
            break;
          // Blood
          case 2:
            //history.push("/collect");
            break;
        }
      }
    }
  };

  useEffect(async () => {
    if (window.ethereum) {
      const wlts = await window.ethereum.request({
          method: "eth_accounts",
      });
      setWallets(wlts);
      await handle(wlts);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <div>
          <Player />
          {isConnected ? (
            <div>
              <div>
                <div class="wallet">{wallets[0]}</div>
                <img class="logoSmall" src={Logo} alt=""/>
              </div>
              <Routes>
                <Route exact path='/play' element={<RpgWindow wallets={wallets} />}/>              
                <Route exact path='/order' element={<SelectOrder wallets={wallets}/>}/>
                <Route exact path='/collect' element={<CollectBlood wallets={wallets}/>} />
              </Routes>
            </div>
          ) : (
            <div class="introArea">
              <img class="logoNormal" src={Logo} alt="" />
              <p class="intro">Darkness takes over the forest and the only source of light is your torch. Dangerous creatures are on the prowl, but there's something more sinister in the shadows. You feel that something mysterious is hiding around you and you don't know what it is. Will you find the way out before this presence reveals itself?</p>
              <div class="button" onClick={connectWallet}><div class="buttonText">Connect Wallet</div></div>
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
    </Router>
  );
}

export default App;