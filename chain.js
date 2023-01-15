let Block = require('./block').Block;
let BlockHeader = require('./block').BlockHeader;
let moment = require('moment');

let getGenesisBlock = () => {
    let blockHeader = new BlockHeader(1, null, '0x1bc3300000000000000000000000000000000000000000000', moment().unix());
    return new Block(blockHeader, 0, null);
};

let getLatestBlock = () => blockchain[blockchain.length - 1];

let addBlock = (newBlock) => {
    let prevBlock = getLatesBlock();
    if (prevBlock.index < newBlock.index && newBlock.blockHeader.previousBlockHeader === prevBlock.blockHeader.merkleRoot) {
        blockchain.push(newBlock);
    } 
};


let getBlock = (index) => {
    if (blockchain.length - 1 >= index) {
        return blockchain[index];
    }else {
        return null;
    }
};

const blockchain = [getGenesisBlock()];

if (typeof exports != 'undefined') {
    exports.addBlock = addBlock;
    exports.getBlock = getBlock;
    exports.blockchain = blockchain;
    exports.getLatestBlock = getLatestBlock;
}