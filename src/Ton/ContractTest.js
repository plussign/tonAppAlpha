import { useState } from "react";

import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';

import { Address, fromNano, toNano, beginCell, Cell } from "@ton/ton";

import { TONTestNet } from "../config";
import { useTonClient } from "../hooks/useTonClient";

import { Address as CoreAddress } from "ton-core";
import { GetSharesContractAddress } from "../contract/Address";

import { Shares, storeNewKey, storeTradeKey } from "../contract/tact_Shares";
import { SharesKey} from "../contract/tact_SharesKey";
import { SharesWallet} from "../contract/tact_SharesWallet";


export const ContractTestArea = () => {

    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const client = useTonClient();
  
    const nonBounceableFormation = {testOnly:TONTestNet, bounceable:false};
    const bounceableFormation = {testOnly:TONTestNet, bounceable:true};
    
    const [supply, setSupply] = useState();
    const [balance, setBalance] = useState();
  
    if (!wallet || !wallet.account)
    {
      return (<></>);
    }
  
    return (
      <p className="addrText">
        <label>My Supply: {(supply)} </label>
        <label>My Balance: {(balance)} </label>
  
        <button style={{ marginTop: "6px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}
          onClick={ async() => {
            
            const SharesContractAddress = GetSharesContractAddress();
  
            //client.runMethod(SharesContractAddress, "getVersion")
  
            const myAddr = CoreAddress.parse(wallet.account.address);
            const myAddrString = myAddr?.toString(nonBounceableFormation);
            console.log('myAddrString', myAddrString);

            const subjectAddr = CoreAddress.parse(myAddrString);  //"0:2ef6ae9c51e38e4ed34bbeb6f0cea400eff1ccd1d4e06836bd14f300b7f0052a");
            const subjectAddrString = subjectAddr?.toString(nonBounceableFormation);
            console.log('subjectAddrString', subjectAddrString);
  
            const sharesContract = Shares.fromAddress(SharesContractAddress);
            const shares = client.open(sharesContract);
  
            const sharesContractVersion = await shares.getGetVersion();
            console.log(`sharesContractVersion [${sharesContractVersion}] sharesContractAddr [${SharesContractAddress.toString(bounceableFormation)}]`)

            const keyContractAddr = await shares.getGetKeyAddress(subjectAddr);
            const walletContractAddr = await shares.getGetWalletAddress(myAddr, subjectAddr);
  
            console.log(`keyContractAddr    [${keyContractAddr.toString(bounceableFormation)}]`)
            console.log(`walletContractAddr [${walletContractAddr.toString(bounceableFormation)}]`);
  
            const gasConsumption = await shares.getGetGasConsumption();
            console.log('GasConsumption', fromNano(gasConsumption));
  
            const tradeAmount = BigInt(1);
            const isBuy = false;
  
            if (await client.isContractDeployed(keyContractAddr))
            {
              const sharesKeyContract = client.open(SharesKey.fromAddress(keyContractAddr));

              const supplyAmount = await sharesKeyContract.getSupply();
              console.log(`SupplyAmount [${supplyAmount.toString()}] TradeAmount[${tradeAmount}]`);
              setSupply(supplyAmount.toString());
      
              if (await client.isContractDeployed(walletContractAddr))
              {
                const walletContract = client.open(SharesWallet.fromAddress(walletContractAddr));
                const balance = await walletContract.getBalance();
                console.log(`Balance [${balance.toString()}]`);
                setBalance(balance.toString());
        
                let priceBuy = await shares.getGetBuyPrice(subjectAddr, supplyAmount, tradeAmount);
                console.log('GetBuyPrice', fromNano(priceBuy));
                
                let priceBuyAfterFee = await shares.getGetBuyPriceAfterFee(subjectAddr, supplyAmount, tradeAmount);
                console.log('GetBuyPriceAfterFee', fromNano(priceBuyAfterFee));
        
                let priceSell = await shares.getGetSellPrice(subjectAddr, supplyAmount, tradeAmount);
                console.log('GetSellPrice', fromNano(priceSell));
                
                let priceSellAfterFee = await shares.getGetSellPriceAfterFee(subjectAddr, supplyAmount, tradeAmount);
                console.log('GetSellPriceAfterFee', fromNano(priceSellAfterFee));
                  
                const body = beginCell().store(storeTradeKey({
                  $$type: 'TradeKey',
                  subject:Address.parse(subjectAddrString),
                  supply:supplyAmount,
                  holder:Address.parse(myAddrString),
                  balance:balance,
                  amount:tradeAmount,
                  increment:isBuy,
                })).endCell();

                const transferMessage = {
                  address : SharesContractAddress.toString(bounceableFormation), // destination address
                  amount : isBuy ? (priceBuyAfterFee + toNano(0.15)).toString() : toNano(0.15).toString(),
                  payload : body.toBoc().toString("base64")
                };

                const transaction = {
                  validUntil: Math.floor(new Date() / 1000) + 360,
                  messages: [transferMessage]
                };
      
                console.log(transaction);
      
                tonConnectUI.sendTransaction(transaction).then(rsp => {
                  //处理交易成功返回的BOC
                  console.log("TradeKey", rsp);
                  const retCell = Cell.fromBase64(rsp.boc);
                  console.log("TradeKey", retCell.toString());
                }).catch(e=>console.error(e));
              }
              else
              {
                  console.log('walletContractAddr NOT DEPLOYED');
              }
            }
            else
            {
                console.log('keyContractAddr NOT DEPLOYED. Buy NewKey NOW!');
  
                let priceBuyAfterFee = await shares.getGetBuyPriceAfterFee(myAddr, BigInt(0), tradeAmount);
                console.log('GetBuyPriceAfterFee', fromNano(priceBuyAfterFee));

                const body = beginCell().store(storeNewKey({
                  $$type: 'NewKey',
                  subject: Address.parse(myAddrString),
                  initialSupply:tradeAmount,
                })).endCell();
  
                const transferMessage = {
                  address : SharesContractAddress.toString(bounceableFormation), // destination address
                  amount : (priceBuyAfterFee + gasConsumption).toString(), //Toncoin in nanotons
                  payload : body.toBoc().toString("base64")
                };
  
                const transaction = {
                  validUntil: Math.floor(new Date() / 1000) + 360,
                  messages: [transferMessage]
                };
      
                console.log(transaction);
      
                tonConnectUI.sendTransaction(transaction).then(rsp => {
                  console.log("NewKey", rsp);
                }).catch(e=>console.error(e));
            }
          }}>
          Conrtact Test
        </button><br/>

        <button style={{ marginTop: "6px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}
          onClick={async() => {
            //Contract:EQDPp5lquJmXDk_G7fyO-uTsQR9eSenT2Ixys8aFUk2e-bMt
            //0QB-2uzJa3j1BDpzSmp4m39dQrn2c9AnJbGUbF23QF_zptD3
            //$NEW KEY
            const bocText = "te6cckEBAgEA0gAB4YgA/bXZktbx6gh05pTU8Tb+uoVz7OegTktjKNi7boC/50wAnAODBNT/vaTJNXrvlyukItsuMdw6+EyJj/dt8r5D8FsbmWMsSI7E2siw9CHzB8P+j+9MZZHWSQ1kuFmCGGW4WU1NGLsrbjzYAAAA6AAcAQC3YgBn08y1XEzLhyfjdv5HfXJ2II+vJPTp7EY5WeNCqSbPfKCT0cxQAAAAAAAAAAAAAAAAAObSKViAD9tdmS1vHqCHTmlNTxNv66hXPs56BOS2Mo2LtugL/nTAAFCBonDl";
            const retCell = Cell.fromBase64(bocText);
            
            console.log(`cell level[${retCell.level()}] depth[${retCell.depth()}] isExotic[${retCell.isExotic}]`);
            console.log("BOC decode Test", retCell.toString());
            
            console.log(readStringTail(retCell));
          }}>
          BOC decode
        </button><br/>
      </p>
    );
  }
  
function readStringTail(cell) {
  let slice = cell.beginParse();//.loadRef().beginParse(); // converting cell to slice
  console.log(slice);

  for (let i = 0; i <= slice.remainingBits - 255; i++)
  {
    try{
      const testAddr = slice.loadAddressAny();
      console.log("offset " + i, testAddr.toString());
    }catch(e){

    }finally {
      slice = cell.beginParse();
      slice.skip(i);
    }
  }
/*
  const testString = slice.loadBuffer(slice.remainingBits / 8 - 1);
  console.log(`sign[${testString}]`);
  const sign = slice.loadBuffer(32);

  const seqno = slice.loadUint(32);
  const expire = slice.loadUint(32);
  const opCode = slice.loadUint(32);

  console.log(`sign[${sign.toString('base64')}] seqno[${seqno}] expire[${expire}] opCode[${opCode}]`);
*/
  /*
  console.log( {
    amount: slice.loadCoins(),
    from: slice.loadAddressAny(),
    to: slice.loadAddressAny(),
    forwardAmount: slice.loadCoins(),
    payload: slice.loadMaybeRef()
  });*/

  const str = new TextDecoder('ascii').decode(slice.array); // decode uint8array to string
  console.log(str);

  if(cell.refs.length > 0) {
      return str + readStringTail(cell.refs[0]); // read next cell
  } else {
      return str;
  }
}