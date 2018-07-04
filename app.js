var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8580'));

// var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8540"));

var version = web3.version;
console.log(version); // 1.0.0-beta.34

web3.eth.net.isListening()
    .then(() => console.log('is connected'))
    .catch(e => console.log('Wow. Something went wrong'));

web3.eth.net.getId()
    .then(console.log);

var abi = [{
    "constant": false,
    "inputs": [{
        "name": "_channel",
        "type": "uint256"
    }],
    "name": "setChannel",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getInfo",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }, {
        "name": "",
        "type": "string"
    }, {
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_fName",
        "type": "string"
    }, {
        "name": "_age",
        "type": "uint256"
    }],
    "name": "setInfo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getChannel",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "channel",
        "type": "uint256"
    }, {
        "indexed": false,
        "name": "name",
        "type": "string"
    }, {
        "indexed": false,
        "name": "age",
        "type": "uint256"
    }],
    "name": "EventSetInfo",
    "type": "event"
}];

var address = '0xd1ae8046c80a9ec0f9fa76ebcb0fb2ae89bc666b';
var infoContract = new web3.eth.Contract(abi, address);

infoContract.methods.getInfo().call(function (error, result) {
    if (!error) {
        console.log(result);
    } else
        console.log(error);
});


infoContract.methods.setInfo("eric", 6).send({
    from: '0x762009cd5dcabb5a125008d70f5efdbdff2aa782'
}).on('transactionHash', function (hash) {
    console.log("hash:", hash);
    infoContract.methods.getInfo().call(function (error, result) {
        if (!error) {
            console.log(result);
        } else
            console.log(error);
    });
});

// 设置channel，选topics都不起过滤作用，监听全部
var event = infoContract.events.EventSetInfo({
        channel: '20180705'
    }, {
        fromBlock: 0,
        toBlock: 'latest',
        topics: '0x000000000000000000000000000000000000000000000000000000000133eee1'
    }, function (error, event) { /*console.log("result:\n"+JSON.stringify(event)); */ })
    .on('data', function (event) {
        console.log("start event"); // same results as the optional callback above
        console.log(event.returnValues); // same results as the optional callback above
    })
    .on('changed', function (event) {
        console.log("event changed"); // same res
        // remove event from local database
    })
    .on('error', console.error);