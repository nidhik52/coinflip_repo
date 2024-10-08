import React, { useState } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import './styles.css';

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState('');
  const [guess, setGuess] = useState(null);

  // Connect wallet function
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setAccount(await signer.getAddress());

        // Load the contract
        const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract Address
        const contractABI = [/*YOUR_CONTRACT_ABI*/]; // Replace with your contract ABI
        
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contract); // Corrected function call to set contract
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  // Flip Coin function
  async function flipCoin() {
    if (contract && amount && guess !== null) {
      try {
        const tx = await contract.flipCoin(guess, { value: ethers.utils.parseEther(amount) });
        await tx.wait();
        alert("Coin flipped! Check the result on Etherscan.");
      } catch (error) {
        console.error("Transaction failed", error);
      }
    } else {
      alert("Please connect your wallet and enter a valid amount.");
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Kachingg!!!</h1>
        <p>Flip to Win, Play with Test Tokens!</p>
      </header>
      <main>
        <button onClick={connectWallet}>Connect Wallet</button>
        {account && (
          <>
            <p>Connected as: {account}</p>
            <input
              type="number"
              placeholder="Amount in ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div>
              <button onClick={() => setGuess(true)}>Heads</button>
              <button onClick={() => setGuess(false)}>Tails</button>
            </div>
            <button onClick={flipCoin}>Flip Coin</button>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
