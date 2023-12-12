import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from './useAsyncInitialize';
import { TONTestNet } from '../config.js'

export function useTonClient() {
  return useAsyncInitialize(
    async () =>
    {
        if (TONTestNet) {
            return new TonClient({
                //endpoint: 'https://testnet.tonhubapi.com/jsonRPC',
                endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
                apiKey:'5530134c7d0cce09c3c6c4415b3afb36957ff94fe46d606e149ba93c5d641ae7',
              });
        } else {
            return new TonClient({
                //endpoint: 'https://mainnet.tonhubapi.com/jsonRPC',//'https://go.getblock.io/8e7995be56444cceaf908d2fc16cdc72/jsonRPC',
                endpoint: 'https://toncenter.com/api/v2/jsonRPC',
                apiKey:'39f9c949196f02edc5c774af443cad45d4fffae3fd0795b4b522c84990cd6900',
              });
        }
    }
  );
}
