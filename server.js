const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require("./fbase-key.json");

const users = [];

const routes = [
  {route: "/", file: "index.html"},
  {route: "/play", file: "index.html"},
  {route: "/order", file: "index.html"},
  {route: "/collect", file: "index.html"},
];

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
// Root de cada página
const pageRoot = path.join(__dirname, './build');

// Solicitação para cada página
for(var i = 0; i < routes.length; i++) {
  var item = routes[i];
  app.get(item.route, async (req, res) => {
    try {
      // Enviar arquivo especificado 
      res.sendFile(item.file, { root: pageRoot });
    }
    catch(e) {
      console.error(e);
      res.status(505);
    }
  });
}

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
})

const port = process.env.PORT ?? 3000;

// Iniciar escuta
app.listen(port);

console.log("[LOG] Server is listening at port " + port + "!");
