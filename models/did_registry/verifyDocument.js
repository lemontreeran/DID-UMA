"use strict";
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);

module.exports = async function verifyDocument(data) {
    let Registry_Bytecode = config.DIDRegistry.bytecode;
    let Registry_Abi = config.DIDRegistry.abi;
    let nowAccount =data.account;
    let _identity = data.identity;
    let _url = data.url;
    let _docHex = data.docHex;
    let registryAddress = data.registryAddress;
    let Registry = new web3.eth.Contract(Registry_Abi,registryAddress);

    return new Promise((resolve, reject) => {
        Registry.methods.verifyDocument(_identity,_url,_docHex).call()
            .then((return_result) => {
                resolve(return_result);
            })
            .catch(function(err) {
            console.log(err);
            reject(err);
        });
    });
};