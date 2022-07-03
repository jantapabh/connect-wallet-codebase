import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useState } from "react";
declare let window: any;

const Home: NextPage = () => {
  const [myAddress, setMyAddress] = useState("");
  const [isConnect, setIsConnect] = useState(false);

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const walletAddr = await signer.getAddress();
      setMyAddress(walletAddr);
      setIsConnect(true);
    } else {
      return "Connot Found Account!";
    }
  }

  return (
    <div className={styles.container}>
      <div className="flex justify-end mt-3">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={connectWallet}
        >
          {!isConnect ? "Connect Wallet" : `${myAddress.slice(0,4)}...${myAddress.slice(38,myAddress.length)}`}
        </button>
      </div>
      <div>
        <span>My Address: {myAddress || "Not Connect"}</span>
      </div>
    </div>
  );
};

export default Home;
