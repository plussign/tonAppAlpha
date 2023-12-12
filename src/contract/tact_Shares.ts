import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type UpdateBalance = {
    $$type: 'UpdateBalance';
    queryId: bigint;
    balance: bigint;
    holder: Address;
    amount: bigint;
    increment: boolean;
}

export function storeUpdateBalance(src: UpdateBalance) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3455304987, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.balance, 16);
        b_0.storeAddress(src.holder);
        b_0.storeUint(src.amount, 16);
        b_0.storeBit(src.increment);
    };
}

export function loadUpdateBalance(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3455304987) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _balance = sc_0.loadUintBig(16);
    let _holder = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(16);
    let _increment = sc_0.loadBit();
    return { $$type: 'UpdateBalance' as const, queryId: _queryId, balance: _balance, holder: _holder, amount: _amount, increment: _increment };
}

function loadTupleUpdateBalance(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _balance = source.readBigNumber();
    let _holder = source.readAddress();
    let _amount = source.readBigNumber();
    let _increment = source.readBoolean();
    return { $$type: 'UpdateBalance' as const, queryId: _queryId, balance: _balance, holder: _holder, amount: _amount, increment: _increment };
}

function storeTupleUpdateBalance(source: UpdateBalance) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.balance);
    builder.writeAddress(source.holder);
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.increment);
    return builder.build();
}

function dictValueParserUpdateBalance(): DictionaryValue<UpdateBalance> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateBalance(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateBalance(src.loadRef().beginParse());
        }
    }
}

export type BalanceUpdated = {
    $$type: 'BalanceUpdated';
    queryId: bigint;
}

export function storeBalanceUpdated(src: BalanceUpdated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3339978873, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadBalanceUpdated(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3339978873) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'BalanceUpdated' as const, queryId: _queryId };
}

function loadTupleBalanceUpdated(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'BalanceUpdated' as const, queryId: _queryId };
}

function storeTupleBalanceUpdated(source: BalanceUpdated) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserBalanceUpdated(): DictionaryValue<BalanceUpdated> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBalanceUpdated(src)).endCell());
        },
        parse: (src) => {
            return loadBalanceUpdated(src.loadRef().beginParse());
        }
    }
}

export type UpdateSupply = {
    $$type: 'UpdateSupply';
    queryId: bigint;
    supply: bigint;
    amount: bigint;
    increment: boolean;
}

export function storeUpdateSupply(src: UpdateSupply) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3348196887, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.supply, 16);
        b_0.storeUint(src.amount, 16);
        b_0.storeBit(src.increment);
    };
}

export function loadUpdateSupply(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3348196887) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _supply = sc_0.loadUintBig(16);
    let _amount = sc_0.loadUintBig(16);
    let _increment = sc_0.loadBit();
    return { $$type: 'UpdateSupply' as const, queryId: _queryId, supply: _supply, amount: _amount, increment: _increment };
}

function loadTupleUpdateSupply(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _supply = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _increment = source.readBoolean();
    return { $$type: 'UpdateSupply' as const, queryId: _queryId, supply: _supply, amount: _amount, increment: _increment };
}

function storeTupleUpdateSupply(source: UpdateSupply) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.supply);
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.increment);
    return builder.build();
}

function dictValueParserUpdateSupply(): DictionaryValue<UpdateSupply> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateSupply(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateSupply(src.loadRef().beginParse());
        }
    }
}

export type SupplyUpdated = {
    $$type: 'SupplyUpdated';
    queryId: bigint;
}

export function storeSupplyUpdated(src: SupplyUpdated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1949146257, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadSupplyUpdated(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1949146257) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'SupplyUpdated' as const, queryId: _queryId };
}

function loadTupleSupplyUpdated(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'SupplyUpdated' as const, queryId: _queryId };
}

function storeTupleSupplyUpdated(source: SupplyUpdated) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserSupplyUpdated(): DictionaryValue<SupplyUpdated> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSupplyUpdated(src)).endCell());
        },
        parse: (src) => {
            return loadSupplyUpdated(src.loadRef().beginParse());
        }
    }
}

export type FixSupply = {
    $$type: 'FixSupply';
    queryId: bigint;
    supply: bigint;
    amount: bigint;
    increment: boolean;
}

export function storeFixSupply(src: FixSupply) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3640456601, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.supply, 16);
        b_0.storeUint(src.amount, 16);
        b_0.storeBit(src.increment);
    };
}

export function loadFixSupply(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3640456601) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _supply = sc_0.loadUintBig(16);
    let _amount = sc_0.loadUintBig(16);
    let _increment = sc_0.loadBit();
    return { $$type: 'FixSupply' as const, queryId: _queryId, supply: _supply, amount: _amount, increment: _increment };
}

function loadTupleFixSupply(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _supply = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _increment = source.readBoolean();
    return { $$type: 'FixSupply' as const, queryId: _queryId, supply: _supply, amount: _amount, increment: _increment };
}

function storeTupleFixSupply(source: FixSupply) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.supply);
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.increment);
    return builder.build();
}

function dictValueParserFixSupply(): DictionaryValue<FixSupply> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFixSupply(src)).endCell());
        },
        parse: (src) => {
            return loadFixSupply(src.loadRef().beginParse());
        }
    }
}

export type SupplyFixed = {
    $$type: 'SupplyFixed';
    queryId: bigint;
}

export function storeSupplyFixed(src: SupplyFixed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(87091070, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadSupplyFixed(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 87091070) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'SupplyFixed' as const, queryId: _queryId };
}

function loadTupleSupplyFixed(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'SupplyFixed' as const, queryId: _queryId };
}

function storeTupleSupplyFixed(source: SupplyFixed) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserSupplyFixed(): DictionaryValue<SupplyFixed> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSupplyFixed(src)).endCell());
        },
        parse: (src) => {
            return loadSupplyFixed(src.loadRef().beginParse());
        }
    }
}

export type UpdateAdmin = {
    $$type: 'UpdateAdmin';
    newAdmin: Address;
}

export function storeUpdateAdmin(src: UpdateAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2286520683, 32);
        b_0.storeAddress(src.newAdmin);
    };
}

export function loadUpdateAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2286520683) { throw Error('Invalid prefix'); }
    let _newAdmin = sc_0.loadAddress();
    return { $$type: 'UpdateAdmin' as const, newAdmin: _newAdmin };
}

function loadTupleUpdateAdmin(source: TupleReader) {
    let _newAdmin = source.readAddress();
    return { $$type: 'UpdateAdmin' as const, newAdmin: _newAdmin };
}

function storeTupleUpdateAdmin(source: UpdateAdmin) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newAdmin);
    return builder.build();
}

function dictValueParserUpdateAdmin(): DictionaryValue<UpdateAdmin> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateAdmin(src.loadRef().beginParse());
        }
    }
}

export type UpdateFeeDestination = {
    $$type: 'UpdateFeeDestination';
    feeDestination: Address;
}

export function storeUpdateFeeDestination(src: UpdateFeeDestination) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2814776222, 32);
        b_0.storeAddress(src.feeDestination);
    };
}

export function loadUpdateFeeDestination(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2814776222) { throw Error('Invalid prefix'); }
    let _feeDestination = sc_0.loadAddress();
    return { $$type: 'UpdateFeeDestination' as const, feeDestination: _feeDestination };
}

function loadTupleUpdateFeeDestination(source: TupleReader) {
    let _feeDestination = source.readAddress();
    return { $$type: 'UpdateFeeDestination' as const, feeDestination: _feeDestination };
}

function storeTupleUpdateFeeDestination(source: UpdateFeeDestination) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.feeDestination);
    return builder.build();
}

function dictValueParserUpdateFeeDestination(): DictionaryValue<UpdateFeeDestination> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateFeeDestination(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateFeeDestination(src.loadRef().beginParse());
        }
    }
}

export type UpdateFeePercentages = {
    $$type: 'UpdateFeePercentages';
    protocolFeePercentage: bigint;
    subjectFeePercentage: bigint;
}

export function storeUpdateFeePercentages(src: UpdateFeePercentages) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4132968698, 32);
        b_0.storeUint(src.protocolFeePercentage, 16);
        b_0.storeUint(src.subjectFeePercentage, 16);
    };
}

export function loadUpdateFeePercentages(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4132968698) { throw Error('Invalid prefix'); }
    let _protocolFeePercentage = sc_0.loadUintBig(16);
    let _subjectFeePercentage = sc_0.loadUintBig(16);
    return { $$type: 'UpdateFeePercentages' as const, protocolFeePercentage: _protocolFeePercentage, subjectFeePercentage: _subjectFeePercentage };
}

function loadTupleUpdateFeePercentages(source: TupleReader) {
    let _protocolFeePercentage = source.readBigNumber();
    let _subjectFeePercentage = source.readBigNumber();
    return { $$type: 'UpdateFeePercentages' as const, protocolFeePercentage: _protocolFeePercentage, subjectFeePercentage: _subjectFeePercentage };
}

function storeTupleUpdateFeePercentages(source: UpdateFeePercentages) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.protocolFeePercentage);
    builder.writeNumber(source.subjectFeePercentage);
    return builder.build();
}

function dictValueParserUpdateFeePercentages(): DictionaryValue<UpdateFeePercentages> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateFeePercentages(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateFeePercentages(src.loadRef().beginParse());
        }
    }
}

export type NewKey = {
    $$type: 'NewKey';
    subject: Address;
    initialSupply: bigint;
}

export function storeNewKey(src: NewKey) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3872532824, 32);
        b_0.storeAddress(src.subject);
        b_0.storeUint(src.initialSupply, 16);
    };
}

export function loadNewKey(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3872532824) { throw Error('Invalid prefix'); }
    let _subject = sc_0.loadAddress();
    let _initialSupply = sc_0.loadUintBig(16);
    return { $$type: 'NewKey' as const, subject: _subject, initialSupply: _initialSupply };
}

function loadTupleNewKey(source: TupleReader) {
    let _subject = source.readAddress();
    let _initialSupply = source.readBigNumber();
    return { $$type: 'NewKey' as const, subject: _subject, initialSupply: _initialSupply };
}

function storeTupleNewKey(source: NewKey) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.subject);
    builder.writeNumber(source.initialSupply);
    return builder.build();
}

function dictValueParserNewKey(): DictionaryValue<NewKey> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNewKey(src)).endCell());
        },
        parse: (src) => {
            return loadNewKey(src.loadRef().beginParse());
        }
    }
}

export type TradeKey = {
    $$type: 'TradeKey';
    subject: Address;
    supply: bigint;
    holder: Address;
    balance: bigint;
    amount: bigint;
    increment: boolean;
}

export function storeTradeKey(src: TradeKey) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1484156775, 32);
        b_0.storeAddress(src.subject);
        b_0.storeUint(src.supply, 16);
        b_0.storeAddress(src.holder);
        b_0.storeUint(src.balance, 16);
        b_0.storeUint(src.amount, 16);
        b_0.storeBit(src.increment);
    };
}

export function loadTradeKey(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1484156775) { throw Error('Invalid prefix'); }
    let _subject = sc_0.loadAddress();
    let _supply = sc_0.loadUintBig(16);
    let _holder = sc_0.loadAddress();
    let _balance = sc_0.loadUintBig(16);
    let _amount = sc_0.loadUintBig(16);
    let _increment = sc_0.loadBit();
    return { $$type: 'TradeKey' as const, subject: _subject, supply: _supply, holder: _holder, balance: _balance, amount: _amount, increment: _increment };
}

function loadTupleTradeKey(source: TupleReader) {
    let _subject = source.readAddress();
    let _supply = source.readBigNumber();
    let _holder = source.readAddress();
    let _balance = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _increment = source.readBoolean();
    return { $$type: 'TradeKey' as const, subject: _subject, supply: _supply, holder: _holder, balance: _balance, amount: _amount, increment: _increment };
}

function storeTupleTradeKey(source: TradeKey) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.subject);
    builder.writeNumber(source.supply);
    builder.writeAddress(source.holder);
    builder.writeNumber(source.balance);
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.increment);
    return builder.build();
}

function dictValueParserTradeKey(): DictionaryValue<TradeKey> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTradeKey(src)).endCell());
        },
        parse: (src) => {
            return loadTradeKey(src.loadRef().beginParse());
        }
    }
}

export type Query = {
    $$type: 'Query';
    supply: bigint;
    subject: Address;
    holder: Address;
    balance: bigint;
    amount: bigint;
    value: bigint;
    increment: boolean;
}

export function storeQuery(src: Query) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.supply, 16);
        b_0.storeAddress(src.subject);
        b_0.storeAddress(src.holder);
        b_0.storeUint(src.balance, 16);
        b_0.storeUint(src.amount, 16);
        b_0.storeCoins(src.value);
        b_0.storeBit(src.increment);
    };
}

export function loadQuery(slice: Slice) {
    let sc_0 = slice;
    let _supply = sc_0.loadUintBig(16);
    let _subject = sc_0.loadAddress();
    let _holder = sc_0.loadAddress();
    let _balance = sc_0.loadUintBig(16);
    let _amount = sc_0.loadUintBig(16);
    let _value = sc_0.loadCoins();
    let _increment = sc_0.loadBit();
    return { $$type: 'Query' as const, supply: _supply, subject: _subject, holder: _holder, balance: _balance, amount: _amount, value: _value, increment: _increment };
}

function loadTupleQuery(source: TupleReader) {
    let _supply = source.readBigNumber();
    let _subject = source.readAddress();
    let _holder = source.readAddress();
    let _balance = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _value = source.readBigNumber();
    let _increment = source.readBoolean();
    return { $$type: 'Query' as const, supply: _supply, subject: _subject, holder: _holder, balance: _balance, amount: _amount, value: _value, increment: _increment };
}

function storeTupleQuery(source: Query) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.supply);
    builder.writeAddress(source.subject);
    builder.writeAddress(source.holder);
    builder.writeNumber(source.balance);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.increment);
    return builder.build();
}

function dictValueParserQuery(): DictionaryValue<Query> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeQuery(src)).endCell());
        },
        parse: (src) => {
            return loadQuery(src.loadRef().beginParse());
        }
    }
}

export type TestEvent1 = {
    $$type: 'TestEvent1';
    name: string;
    amount: bigint;
    by: bigint;
}

export function storeTestEvent1(src: TestEvent1) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.by, 32);
    };
}

export function loadTestEvent1(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _amount = sc_0.loadCoins();
    let _by = sc_0.loadUintBig(32);
    return { $$type: 'TestEvent1' as const, name: _name, amount: _amount, by: _by };
}

function loadTupleTestEvent1(source: TupleReader) {
    let _name = source.readString();
    let _amount = source.readBigNumber();
    let _by = source.readBigNumber();
    return { $$type: 'TestEvent1' as const, name: _name, amount: _amount, by: _by };
}

function storeTupleTestEvent1(source: TestEvent1) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.by);
    return builder.build();
}

function dictValueParserTestEvent1(): DictionaryValue<TestEvent1> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTestEvent1(src)).endCell());
        },
        parse: (src) => {
            return loadTestEvent1(src.loadRef().beginParse());
        }
    }
}

export type TestEvent2 = {
    $$type: 'TestEvent2';
    name: string;
    amount: bigint;
    by: bigint;
}

export function storeTestEvent2(src: TestEvent2) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.by, 32);
    };
}

export function loadTestEvent2(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _amount = sc_0.loadCoins();
    let _by = sc_0.loadUintBig(32);
    return { $$type: 'TestEvent2' as const, name: _name, amount: _amount, by: _by };
}

function loadTupleTestEvent2(source: TupleReader) {
    let _name = source.readString();
    let _amount = source.readBigNumber();
    let _by = source.readBigNumber();
    return { $$type: 'TestEvent2' as const, name: _name, amount: _amount, by: _by };
}

function storeTupleTestEvent2(source: TestEvent2) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.by);
    return builder.build();
}

function dictValueParserTestEvent2(): DictionaryValue<TestEvent2> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTestEvent2(src)).endCell());
        },
        parse: (src) => {
            return loadTestEvent2(src.loadRef().beginParse());
        }
    }
}

 type Shares_init_args = {
    $$type: 'Shares_init_args';
}

function initShares_init_args(src: Shares_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Shares_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initShares_init_args({ $$type: 'Shares_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Shares_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    5204: { message: `Subject cannot sell last key` },
    7022: { message: `Not the subject` },
    9169: { message: `Balance mismatch` },
    25773: { message: `Initial supply must be greater than 0` },
    26119: { message: `Cannot sell last key` },
    29148: { message: `Something wrong here` },
    44989: { message: `Supply mismatch` },
    46270: { message: `Not the shares contract` },
    54615: { message: `Insufficient balance` },
    55553: { message: `Forbidden` },
    56053: { message: `Not the Keys contract` },
    63413: { message: `Query not found` },
}

const Shares_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateBalance","header":3455304987,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"holder","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"increment","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BalanceUpdated","header":3339978873,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateSupply","header":3348196887,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"supply","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"increment","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"SupplyUpdated","header":1949146257,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FixSupply","header":3640456601,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"supply","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"increment","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"SupplyFixed","header":87091070,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateAdmin","header":2286520683,"fields":[{"name":"newAdmin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateFeeDestination","header":2814776222,"fields":[{"name":"feeDestination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateFeePercentages","header":4132968698,"fields":[{"name":"protocolFeePercentage","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"subjectFeePercentage","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"NewKey","header":3872532824,"fields":[{"name":"subject","type":{"kind":"simple","type":"address","optional":false}},{"name":"initialSupply","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"TradeKey","header":1484156775,"fields":[{"name":"subject","type":{"kind":"simple","type":"address","optional":false}},{"name":"supply","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"holder","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"increment","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"Query","header":null,"fields":[{"name":"supply","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"subject","type":{"kind":"simple","type":"address","optional":false}},{"name":"holder","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"increment","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TestEvent1","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"by","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"TestEvent2","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"by","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const Shares_getters: ABIGetter[] = [
    {"name":"getKeyAddress","arguments":[{"name":"subject","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getWalletAddress","arguments":[{"name":"holder","type":{"kind":"simple","type":"address","optional":false}},{"name":"subject","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getVersion","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"getGasConsumption","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getFeeDestination","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getFeePercentage","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getSubjectFeePercentage","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getPrice","arguments":[{"name":"supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getBuyPrice","arguments":[{"name":"sharesSubject","type":{"kind":"simple","type":"address","optional":false}},{"name":"supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getSellPrice","arguments":[{"name":"sharesSubject","type":{"kind":"simple","type":"address","optional":false}},{"name":"supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getBuyPriceAfterFee","arguments":[{"name":"sharesSubject","type":{"kind":"simple","type":"address","optional":false}},{"name":"supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getSellPriceAfterFee","arguments":[{"name":"sharesSubject","type":{"kind":"simple","type":"address","optional":false}},{"name":"supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Shares_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateAdmin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateFeeDestination"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateFeePercentages"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NewKey"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SupplyUpdated"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SupplyFixed"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BalanceUpdated"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TradeKey"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Shares implements Contract {
    
    static async init() {
        return await Shares_init();
    }
    
    static async fromInit() {
        const init = await Shares_init();
        const address = contractAddress(0, init);
        return new Shares(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Shares(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Shares_types,
        getters: Shares_getters,
        receivers: Shares_receivers,
        errors: Shares_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | UpdateAdmin | UpdateFeeDestination | UpdateFeePercentages | NewKey | SupplyUpdated | SupplyFixed | BalanceUpdated | TradeKey | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateAdmin') {
            body = beginCell().store(storeUpdateAdmin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateFeeDestination') {
            body = beginCell().store(storeUpdateFeeDestination(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateFeePercentages') {
            body = beginCell().store(storeUpdateFeePercentages(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NewKey') {
            body = beginCell().store(storeNewKey(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SupplyUpdated') {
            body = beginCell().store(storeSupplyUpdated(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SupplyFixed') {
            body = beginCell().store(storeSupplyFixed(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BalanceUpdated') {
            body = beginCell().store(storeBalanceUpdated(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TradeKey') {
            body = beginCell().store(storeTradeKey(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetKeyAddress(provider: ContractProvider, subject: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(subject);
        let source = (await provider.get('getKeyAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, holder: Address, subject: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(holder);
        builder.writeAddress(subject);
        let source = (await provider.get('getWalletAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetVersion(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getVersion', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getGetGasConsumption(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getGasConsumption', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetFeeDestination(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getFeeDestination', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetFeePercentage(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getFeePercentage', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetSubjectFeePercentage(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getSubjectFeePercentage', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetPrice(provider: ContractProvider, supply: bigint, amount: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(supply);
        builder.writeNumber(amount);
        let source = (await provider.get('getPrice', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetBuyPrice(provider: ContractProvider, sharesSubject: Address, supply: bigint, amount: bigint) {
        let builder = new TupleBuilder();
        builder.writeAddress(sharesSubject);
        builder.writeNumber(supply);
        builder.writeNumber(amount);
        let source = (await provider.get('getBuyPrice', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetSellPrice(provider: ContractProvider, sharesSubject: Address, supply: bigint, amount: bigint) {
        let builder = new TupleBuilder();
        builder.writeAddress(sharesSubject);
        builder.writeNumber(supply);
        builder.writeNumber(amount);
        let source = (await provider.get('getSellPrice', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetBuyPriceAfterFee(provider: ContractProvider, sharesSubject: Address, supply: bigint, amount: bigint) {
        let builder = new TupleBuilder();
        builder.writeAddress(sharesSubject);
        builder.writeNumber(supply);
        builder.writeNumber(amount);
        let source = (await provider.get('getBuyPriceAfterFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetSellPriceAfterFee(provider: ContractProvider, sharesSubject: Address, supply: bigint, amount: bigint) {
        let builder = new TupleBuilder();
        builder.writeAddress(sharesSubject);
        builder.writeNumber(supply);
        builder.writeNumber(amount);
        let source = (await provider.get('getSellPriceAfterFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}