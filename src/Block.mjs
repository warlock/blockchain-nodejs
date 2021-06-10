import SHA256 from "crypto-js/sha256.js"
import dayjs from "dayjs"

export default class Block {
  constructor(transactions = [], hashPrev = "") {
    this.timestamp = dayjs().unix()
    this.transactions = transactions
    this.hashPrev = hashPrev
    this.hash = this.calcHash()
    this.iteration = 0
  }

  calcHash() {
    const hash = SHA256(
      this.timestamp + this.hashPrev + JSON.stringify(this.transactions) + this.iteration
    )
    return hash.toString()
  }

  mineBlock(dificulty) {
    console.log(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] Mining...`)
    while (this.hash.substring(0, dificulty) !== Array(dificulty + 1).join("0")) {
      this.iteration++
      this.hash = this.calcHash()
    }
    console.log(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}] Mined block: ${this.hash}`)
  }
}
