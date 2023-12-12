import React from 'react';
import './App.css';

import { useState, useEffect } from "react";

import { WebAppProvider, MainButton, BackButton, useInitData, useSwitchInlineQuery } from '@vkruglikov/react-telegram-web-app';
import { useTonAddress, useTonWallet, useIsConnectionRestored, useTonConnectUI, CHAIN } from '@tonconnect/ui-react';
import { TonClient, WalletContractV4, internal, Address, fromNano, toNano, beginCell, Cell } from "@ton/ton";

import { TransferArea } from './Ton/TransferArea';
import { ContractTestArea } from './Ton/ContractTest';
import { useTonClient } from './hooks/useTonClient';

import { Canvas } from './Canvas/CanvasMix';

import { TwitterShareButton } from 'react-twitter-embed';

const TGInfo = () => {
  const [initDataUnsafe, initData] = useInitData();

  if (!initData) {
    return null;
  }

  return (<WebAppProvider options={{smoothButtonsTransition: true}}>
    <textarea
      readOnly
      value={JSON.stringify(initData, null, 2)}
      style={{ width: "96%", height: "250px", borderRadius: "2%" }}
    />
  </WebAppProvider>);
};

const WalletArea = () => {
  const wallet = useTonWallet();

  return (
      wallet && wallet.account &&(
          <p className="addrText">
              <span>Connected wallet: {wallet.device.appName}</span><br/>
              <span>Device: {wallet.device.platform}</span><br/>
              <span>chain: {wallet.account.chain === CHAIN.MAINNET ? 'MainNet' : 'TestNet'}</span>
          </p>
      )
  );
};

const TonConnectArea = () => {
  const userFriendlyAddress = useTonAddress();

  const connectionRestored = useIsConnectionRestored();
  const [balance, setBalance] = useState("Unknown");

  const client = useTonClient();

  if (!connectionRestored) {
    return <div><br/><span>Please wait...</span><br/></div>;
  }

  let walletPublicAddr : Address
  if (userFriendlyAddress)
  {
    walletPublicAddr = Address.parse(userFriendlyAddress);
  }
  else
  {
    return (<div></div>);
  }

  return (
    <div className="addrText">
        <span>non-bounceable address:<br/> {walletPublicAddr.toString({urlSafe: true, bounceable: false, testOnly: true})}<br/></span>
        <span>bounceable address:<br/> {walletPublicAddr.toString({urlSafe: true, bounceable: true, testOnly: true})}<br/></span>
        <span>Raw address:<br/>  {walletPublicAddr.toRawString()}<br/></span>
        <span>Balance: <span id="TON_VALUE" style={{fontWeight:"700"}}>{balance}</span> TON<br/></span>
        <button
          style={{ marginTop: "6px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}
          onClick={async () => {

            const balance = await client!.getBalance(walletPublicAddr);
            const tonBalance = fromNano(balance);
            setBalance(tonBalance);
          }}>
          Get Balance
        </button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <WalletArea/>
      <TonConnectArea/>
      <TransferArea/>
      <ContractTestArea/>
      <Canvas width="400" height="600"/>
      <TGInfo/>

      
      <div className="centerContent">
        <div className="selfCenter spaceBetween">
          <TwitterShareButton
            onLoad={function noRefCheck(){}}
            options={{
              buttonHashtag: undefined,
              screenName: undefined,
              size: 'large',
              title:'YOU HAVE TURNUP',
              text: 'You have defeated all your hostiles and won the prize!',
              via: 'goturnup'
            }}
            placeholder="Turning Up"
            url="https://d8cfz6v5up90z.cloudfront.net/twa"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
