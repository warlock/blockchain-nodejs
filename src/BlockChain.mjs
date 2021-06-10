import Block from "./Block.mjs"
import Transaction from "./Transaction.mjs"

export default class BlockChain {
  constructor() {
    this.chain = [this.makeGenesisBlock()]
    this.dificulty = 4
    this.pendingTransactions = []
    this.miningReward = 100
  }

  makeGenesisBlock() {
    return new Block()
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }

  getBalanceOfAdress(address) {
    let balance = 0
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount
        }

        if (trans.toAddress === address) {
          balance += trans.amount
        }
      }
    }
    return balance
  }

  validateChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const blockActual = this.chain[i]
      const blockPrev = this.chain[i - 1]

      if (blockActual.hash !== blockActual.calcHash()) {
        return false
      }

      if (blockActual.hashPrev !== blockPrev.hash) {
        return false
      }
    }
    return true
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction)
  }

  minePendingTransactions(addressMiner) {
    const lastBlock = this.getLastBlock()
    const block = new Block(this.pendingTransactions)
    block.hashPrev = lastBlock.hash
    block.mineBlock(this.dificulty)
    this.chain.push(block)
    this.pendingTransactions = [new Transaction(null, addressMiner, this.miningReward)]
  }
}
