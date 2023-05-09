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

  const [user, setUser] = useState({
    data: { status: -1 }
  });
  const [status, setStatus] = useState(-1);

  var isConnected = user.data.status > -1;
  var wallets = user.wallets;

  async function connectWallet() {
    if (window.ethereum) {
        window.ethereum.request({
            method: "eth_requestAccounts",
        }).then(auth);
    }
  }

  // Autentica o usuário
  async function auth(wallets) {
    if (wallets.length > 0) {
      var eth_address = wallets[0];
      var query = new URLSearchParams(window.location.search);
      var codex = query.get("c") ?? "";

      // Criar cabeçalho
      var headers = new Headers();
      headers.set("eth-address", eth_address);
      headers.set("codex", codex);

      // Fazer a requisição POST
      var auth = await fetch(process.env.REACT_APP_SERVER + "/auth", 
      {
        method: "GET",
        headers
      });

      // Se for tudo ok
      if (auth.ok) {
        var json = await auth.json();
        setUser(json.data);
      }

    }
  };
  
  // 
  useEffect(() => {
    if (isConnected) {
      if (status != user.data.status) {
        setStatus(user.data.status);
        switch(user.data.status) {
          // RPG
          case 0:
            if (!window.location.href.endsWith("/play"))
              window.location.href = "/play";
            break;
          // Order
          case 1:
            if (!window.location.href.endsWith("/order"))
              window.location.href = "/order";
            break;
          // Blood
          case 2:
            if (!window.location.href.endsWith("/collect"))
              window.location.href = "/collect";
            break;
        }
      }
    }
    else if (window.ethereum) {
      window.ethereum.request({
          method: "eth_accounts",
      }).then(auth);
    }
  }, [user]);

  return (
    <Router>
      <div className="App">
        <div>
          <Player />
          {isConnected ? (
            <div>
              <div>
                <div class="wallet">{user.data.eth_address}</div>
                <img class="logoSmall" src={Logo} alt=""/>
              </div>
              <Routes>
                <Route exact path='/play' element={<RpgWindow user={user} userUpdate={setUser}/>}/>              
                <Route exact path='/order' element={<SelectOrder user={user} userUpdate={setUser}/>}/>
                <Route exact path='/collect' element={<CollectBlood user={user} userUpdate={setUser}/>} />
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