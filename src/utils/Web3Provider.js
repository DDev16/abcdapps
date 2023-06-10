import React, { useState, useEffect, createContext } from 'react';
import Web3 from 'web3';
import MyNFT from '../abi/MyNFT.js'; 
import Marketplace from '../abi/Marketplace.js'; // import the Marketplace ABI

export const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [marketplaceContract, setMarketplaceContract] = useState(null); // new state for the Marketplace contract
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);

        if (!initialized) {
          await window.ethereum.enable();
          setInitialized(true);
        }
        setWeb3(web3Instance);
        setContract(null); // Reset contract when network changes

        const handleNetworkChange = () => {
          window.location.reload(); // Reload the page on network change
        };

        window.ethereum.on('chainChanged', handleNetworkChange);

        const networkId = await web3Instance.eth.net.getId();
        let contractAddress = '';
        let marketplaceAddress = ''; 

        if (networkId === 19) {
          // Songbird network
          contractAddress = '0x675232dCA9012A6CC77BC4688CD93366d90F436D';
          marketplaceAddress = '0x52FAD6d2EAE7aCC84884DFaD452C1e8577521B1F'; // add the Marketplace contract address for Songbird
        } else if (networkId === 14) {
          // Flare network
          contractAddress = '0x92Dd5BF315b84F1fA0fB9865ca9130a45f99e117';
          marketplaceAddress = '0xbdEd0D2bf404bdcBa897a74E6657f1f12e5C6fb6'; // add the Marketplace contract address for Flare
        } 
        else if (networkId === 31337) {
          // Flare network
          contractAddress = '0x3857C14Ec0C727ac2aEcD5016283C76c6b5C860e';
          marketplaceAddress = '0x92fFf0B2116e50d99baEA6A4Ee020b6877ABEEe5'; // add the Marketplace contract address for HArdhatnode
        }else {
          // Add more conditions for other networks
          // ...
        }

        const contractInstance = new web3Instance.eth.Contract(
          MyNFT.abi,
          contractAddress
        );
        const marketplaceInstance = new web3Instance.eth.Contract(
          Marketplace.abi,
          marketplaceAddress
        ); // create instance of Marketplace contract
        setContract(contractInstance);
        setMarketplaceContract(marketplaceInstance); // store the instance of Marketplace contract
      } else {
        window.alert('You need to install MetaMask!');
      }
    };

    initializeWeb3();
  }, [initialized]);

  return (
    <Web3Context.Provider value={{ web3, contract, marketplaceContract }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
