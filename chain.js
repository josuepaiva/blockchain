let Block = require('./block').Block;
let BlockHeader = require('./block').BlockHeader;
let moment = require('moment');
const CryptoJS = require("crypto-js");

let getGenesisBlock = () => {
    let blockHeader = new BlockHeader(1, null, '0x1bc3300000000000000000000000000000000000000000000', moment().unix());
    return new Block(blockHeader, 0, null);
};

let getLatestBlock = () => blockchain[blockchain.length - 1];

let addBlock = (newBlock) => {
    let prevBlock = getLatestBlock();
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

const generateNextBlock = (txns) => {
    const prevBlock = getLatestBlock(),
        prevMerkleRoot = prevBlock.blockHeader.merkleRoot;
        nextIndex = prevBlock.index + 1,
        nextTime = moment().unix(),
        nextMerkleRoot = CryptoJS.SHA256(1, prevMerkleRoot, nextTime).toString();

    const blockHeader = new BlockHeader(1, prevMerkleRoot, nextMerkleRoot, nextTime);
    const newBlock = new Block(blockHeader, nextIndex, txns);
    blockchain.push(newBlock);
    return newBlock;
};

const blockchain = [getGenesisBlock()];

if (typeof exports != 'undefined') {
    exports.addBlock = addBlock;
    exports.getBlock = getBlock;
    exports.blockchain = blockchain;
    exports.getLatestBlock = getLatestBlock;
    exports.generateNextBlock = generateNextBlock;
}