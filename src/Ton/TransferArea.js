import { useState } from "react";
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { toNano, beginCell } from "ton-core";

export const TransferArea = () => {

    const [tonConnectUI, setOptions] = useTonConnectUI();
    const userFriendlyAddress = useTonAddress();
    
    const [targetAddr, setTargetAddr] = useState('0QCRNbdZ0HQvU42n-H4PluS87Xn-I78yjxHQmQDjnsnPUMLF');
    const [amount, setAmount] = useState('0.04');
    //const amountAsNumber = Number(amount);
    const [common, setCommon] = useState('');
  
    if (!userFriendlyAddress)
    {
      return (<></>);
    }
    else return (
      <p className="addrText">
        <label>TargetAddr:  <input value={targetAddr} onChange={e => setTargetAddr(e.target.value)} /></label>
        <label>Amount:  <input value={amount} onChange={e => setAmount(e.target.value)} type="number" /></label>
        <label>Common:  <input value={common} onChange={e => setCommon(e.target.value)} /></label>
        <button style={{ marginTop: "6px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}
          onClick={async() => {
            
            const transferMessage = {
              address : targetAddr, // destination address
              amount : toNano(amount).toString(), //Toncoin in nanotons
            };
  
            if (common.length > 0)
            {
              //构建common的boc
              const body = beginCell().storeUint(0, 32).storeStringTail(common).endCell();
              transferMessage.payload = body.toBoc().toString("base64");
            }
  
            const transaction = {
              validUntil: Math.floor(new Date() / 1000) + 360,
              messages: [transferMessage]
            };
  
            console.log(transaction);
  
            tonConnectUI.sendTransaction(transaction).then(rsp => {
              console.log(rsp);
            }).catch(e=>console.error(e));
          }}>
          Transfer To Target
        </button><br/>

      </p>
    );
  }