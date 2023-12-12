import { Address } from "@ton/ton"
import { TONTestNet } from "../config"

export const GetSharesContractAddress = ()=>{

    if (TONTestNet){
        //export const SharesContractAddress = Address.parse("kQCzCsesMBENttFREg8mBYzRIH51aG1aAFBpxZhMtWA6PRky");
        //export const SharesContractAddress = Address.parse("kQD0fHXcY0iES3JBsK4QZoFWNnUJg7Pl8pzUarPtUlqgCkpy");
        //export const SharesContractAddress = Address.parse("EQDTNCPieRPDNsN-HB2Vbp7MvaQHaXx9R6oU2Ilz4mlByh2Y");
        //export const SharesContractAddress = Address.parse("kQAlxBMBCkO19Z2qAQNnjNvePELPo8nFDaQdmmhCrV8tbKds");
        //export const SharesContractAddress = Address.parse("EQBSQzV549Me4mRLsPBeVgPPlwf-7Ibq3qEKuQdgB_gITalW");
        //export const SharesContractAddress = Address.parse("EQD4bOvsTazEy9qb-rDLnpnm9ruQUq-XwW3VSpIpKGiksSy2");
        return Address.parse("EQC7WfVQMXCcBmX_CkeEco_NyaziRFP_5RCf_O5ys1r7nUik");
    } else {
        return Address.parse("EQBIyGa1rDHQov9vGrYfgHzXVMHrBOSvhqCUMxBogOvZWQlr"); //MAINNET version:1.0.0c
    }
}
