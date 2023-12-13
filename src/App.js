import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import onepercent from './blockchain/onepercent'
import { useEffect, useState } from 'react';

function App() {

  const [currentAccount, setCurrentAccount] = useState(null)
  let [web3, setWeb3] = useState(null) //variabile per contenere dati web3, andiamo poi a riempirla in connetwallethandler quando connettiamo metamask
  const [abiContract, setAbiContract] = useState(null) 
  const [showCongratulation, setShowCongratulation] = useState(false)

  const connectWalletHandler = async () => {
    //verifichiamo che l'utente abbia metamask installato, altrimenti messaggio errore
    if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try{
            await window.ethereum.request({ method: "eth_requestAccounts"}) //comando per far aprire metamask

            web3 = new Web3(window.ethereum)
            setWeb3(web3)
            const account = await web3.eth.getAccounts() //prendiamo lista account (quello in uso è account[0])
            setCurrentAccount(account[0]) //settiamo quello in uso
           

            const vm = onepercent(web3) 
            setAbiContract(vm)
            console.log(currentAccount)
            console.log(web3)
            console.log(abiContract)

        } catch(err) {
            console.log(err.message)
            
        }//try connessione metamask catch error altrimenti
    } 
    else{
        console.log("Please install Metamask")
    }
}  

  const claimTokens = async () => {
    if (abiContract && currentAccount) {
      try {
        // Call the claim function on the smart contract
        await abiContract.methods.claim().send({ from: currentAccount });

        // Optionally, you can update your local state or perform any other actions after claiming
        console.log("Tokens claimed successfully!");
        setShowCongratulation(true);
      } catch (error) {
        console.error("Error claiming tokens:", error);
      }
    } else {
      console.error("abiContract or currentAccount is not available");
    }
  };

  useEffect(() => {
    console.log("Current Account:", currentAccount);
    console.log("Web3:", web3);
    console.log("Abi Contract:", abiContract);
  }, [currentAccount, web3, abiContract]);



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>4INT HOLDERS INU</h3>
        <a
          className="App-link"
          href="https://uk.linkedin.com/company/forintfinance"
          target="_blank"
          rel="noopener noreferrer"
        >
          Best team in the world (working 24/7)!
        </a>

        <br/>
        <br/>
        <h2>CLAIM YOUR 4HI NOW FOR FREE</h2>
        <p>
        Each user who claims will receive 100k 4int Holders Inu (1 address = 1 claim)
        </p>
        <br/>
        {currentAccount === null ? (
          <button className="primary-button" onClick={connectWalletHandler}>
            CONNECT WALLET
          </button>
        ) : (
          <>
            {!showCongratulation ? (
              <button className="primary-button2" onClick={claimTokens}>
                CLAIM NOW!
              </button>
            ) : (
              <p className='congrats'>CONGRATULATIONS!!! 4IntHoldersInu claimed. You will be able to see your balance in your wallet by adding the token address.</p>
            )}
          </>
        )}
        <br/>
        <p className='small'>Token address:</p>
        <a
          className="App-link"
          href="https://polygonscan.com/token/0xba842843aa662aaa35a0351ab854033c93549b14"
          target="_blank"
          rel="noopener noreferrer"
        >
        0xba842843aa662aaa35a0351ab854033c93549b14
        </a>
      </header>
    </div>
  );
}

export default App;
