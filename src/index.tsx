import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { TonConnectButton } from '@tonconnect/ui-react';

import { useParams, useNavigate } from "react-router-dom";

function getJsonFromUrl(url:string) {
  let query = url.substr(1);
  let result = new Map<string, string>();
  query.split("&").forEach(function(part) {
    let item = part.split("=");
    result.set(item[0], decodeURIComponent(item[1]));
  });
  return result;
}

let urlJson = getJsonFromUrl(location.search);
let userId : string = urlJson.get('userId') as string;

const headerNode = document.head;
const cardNode = document.createElement("meta");    cardNode.setAttribute("name", "twitter:card"); cardNode.setAttribute("content", "summary_large_image");
const siteNode = document.createElement("meta");    siteNode.setAttribute("name", "twitter:site"); siteNode.setAttribute("content", "@GoTurnUp");
const titleNode = document.createElement("meta");   titleNode.setAttribute("name", "twitter:title"); titleNode.setAttribute("content", userId);
const descriptionNode = document.createElement("meta"); descriptionNode.setAttribute("name", "twitter:description"); descriptionNode.setAttribute("content", "You have defeated all your hostiles and won the prize!");
const creatorNode = document.createElement("meta"); creatorNode.setAttribute("name", "twitter:creator"); creatorNode.setAttribute("content", "@turnupLover");
const imageNode = document.createElement("meta");   imageNode.setAttribute("name", "twitter:image"); imageNode.setAttribute("content", "https://d8cfz6v5up90z.cloudfront.net/twa/card.png");
const domainNode = document.createElement("meta");  domainNode.setAttribute("name", "twitter:domain"); domainNode.setAttribute("content", "d8cfz6v5up90z.cloudfront.net");

headerNode.append(cardNode);
headerNode.append(siteNode);
headerNode.append(titleNode);
headerNode.append(descriptionNode);
headerNode.append(creatorNode);
headerNode.append(imageNode);
headerNode.append(domainNode);

/*
const headerRoot = ReactDOM.createRoot(
  document.getElementById('headerRoot') as HTMLElement
);
headerRoot.render(
  <>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@GoTurnUp"/>
  <meta name="twitter:title" content="Best Battle Result"/>
  <meta name="twitter:description" content="You have defeated all your hostiles and won the prize!"/>
  <meta name="twitter:creator" content="@turnupLover"/>
  <meta name="twitter:image" content="https://d8cfz6v5up90z.cloudfront.net/twa/card.png"/>
  <meta name="twitter:domain" content="d8cfz6v5up90z.cloudfront.net"/>
  </>
);*/

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TonConnectUIProvider 
      manifestUrl="https://d8cfz6v5up90z.cloudfront.net/twa/tonconnect-manifest.json"
      actionsConfiguration={{twaReturnUrl: 'https://t.me/TUAlphaBot/TurnupDevAlpha' }}>
      
      <header style={{float:"right"}}>
          <TonConnectButton/>
      </header>

      <App/>

    </TonConnectUIProvider>
  </React.StrictMode>
);


