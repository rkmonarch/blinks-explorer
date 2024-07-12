import { Transaction, VersionedTransaction } from "@solana/web3.js";
import { connection } from "./connection";

async function getRawTransaction(
    encodedTransaction: string
  ): Promise<Transaction | VersionedTransaction> {
    let recoveredTransaction: Transaction | VersionedTransaction;
    try {
      recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, "base64")
      );
      const latestBlockhash = await connection.getLatestBlockhash();
      recoveredTransaction.recentBlockhash = latestBlockhash.blockhash;
    } catch (error) {
      recoveredTransaction = VersionedTransaction.deserialize(
        Buffer.from(encodedTransaction, "base64")
      );
    }
    return recoveredTransaction;
  }

export { getRawTransaction };