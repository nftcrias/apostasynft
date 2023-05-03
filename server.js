const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require("./fbase-key.json");

const users = [];

// Start firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
firestore.settings({
  ignoreUndefinedProperties: true
})

// Iniciar a aplicação express
const app = express();

// Usar a pasta build
app.use(express.static(path.join(__dirname, './build')));

// Solicitação padrão
app.get('/', async (req, res) => {
  try {
    // Enviar o index.html  
    res.sendFile('index.html');
  }
  catch(e) {
    console.error(e);
  }
});

// Autenticação
app.post('/auth', async (req, res) => {
    let doc;
    var eth_address = req.headers.eth_address;
    var codex = req.headers.codex ?? "";
    var collection = firestore.collection("users");
    // Verificar se tal documento já está na memória
    doc = users.find(x => x.data().eth_address == eth_address);
    // Montar referência
    if (!doc) {
      var ref = collection.where("eth_address", "==", eth_address);
      // Requisitar documentos relacionados
      var docs = (await ref.get()).docs;
      // Se houver um documento
      if (docs.length > 0) {
        doc = docs[0];
        // Registrar na memória
        users.push(doc);
      }
      else
      {
        // Registrar usuário
        var newDoc = await collection.add({
          eth_address: eth_address,
          status: 0,
          twitter: "",
          retweeted: false,
          followed: false,
          codex: codex,
          score: 0,
          rpgStep: 0
        });
        doc = await newDoc.get();
        // Registrar na memória
        users.push(doc);
      }
    }
    var data = doc.data();
    var json = {id: doc.id, data};
    res.json(json);
    res.end();
});

const port = process.env.PORT ?? 3000;

// Iniciar escuta
app.listen(port);

console.log("[LOG] Server is listening at port " + port + "!");
