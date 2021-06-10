import BlockChain from "./src/BlockChain.mjs"
import Transaction from "./src/Transaction.mjs"

let coin = new BlockChain()
console.log("Start...")

coin.addTransaction(new Transaction("a1", "b2", 10))
coin.addTransaction(new Transaction("banc", "a1", 20))
coin.addTransaction(new Transaction("a1", "b2", 10))
coin.addTransaction(new Transaction("b2", "a1", 3))
coin.addTransaction(new Transaction("a1", "b2", 5))
coin.minePendingTransactions("a1")
coin.addTransaction(new Transaction("b2", "a1", 3))
coin.addTransaction(new Transaction("a1", "b2", 5))
coin.minePendingTransactions("a1")
coin.addTransaction(new Transaction("b2", "a1", 3))
coin.addTransaction(new Transaction("a1", "b2", 5))
coin.minePendingTransactions("a1")

console.table(JSON.stringify(coin.chain, null, 4))
console.log(coin.validateChain())
console.log("Balance A1: ", coin.getBalanceOfAdress("a1"))
