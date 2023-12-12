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

 type SharesKey_init_args = {
    $$type: 'SharesKey_init_args';
    subject: Address;
    sharesContract: Address;
}

function initSharesKey_init_args(src: SharesKey_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.subject);
        b_0.storeAddress(src.sharesContract);
    };
}

async function SharesKey_init(subject: Address, sharesContract: Address) {
    const __code = Cell.fromBase64('te6ccgECFgEABNMAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCEQQFAgFYDQ4D2gGSMH/gcCHXScIflTAg1wsf3iCCEMeRbhe6jp0w0x8BghDHkW4XuvLggdM/0w/TD9IAVTBsFNs8f+AgghDY/PWZuo6dMNMfAYIQ2Pz1mbry4IHTP9MP0w/SAFUwbBTbPH/gghCUapi2uuMCMHAGBwgAnMj4QwHMfwHKAFUgWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLD8ntVAH2ggDZAfhBbyQQI18DUnDHBfL0ggCvvVE1uhPy9AGSEqCagWYHUxO58vQSoeJDMPgnbxCCCvrwgFy2CKGCCvrwgKCh+EFvJGwx+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDD6ADFx1yH6ADH6ADCnA6sAoXBxCQGAMoIA2QH4QW8kECNfA1JgxwXy9AGzkhKgmoFx3FMTufL0EqHicHBxBMgBghAFMOd+WMsfyz/JJQRQVRAkECNtbQsBTtMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fwoB/gbIAYIQdC2ckVjLH8s/ySQEUHcQJBAjbW3IcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AFgMATZtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCMLAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAwAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASAPEAIBSBQVAQ+1xTtnhA2GMBEAubd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4DepO98qiy3jjqenvAqzhk0E4TsunLVmnZbmdB0s2yjN0UkAG87UTQ1AH4Y9IAAY5G+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMPVSBsE+D4KNcLCoMJuvLgiRIBivpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBIC0QHbPBMAIHCCALS++EITxwUS8vT4QgEAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtWEdTaXZXUjFjZVV1eXdFOVM4MUV2RFVUQkR3VVBxSm9ROHpTOTdKc21WczeCA=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSharesKey_init_args({ $$type: 'SharesKey_init_args', subject, sharesContract })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SharesKey_errors: { [key: number]: { message: string } } = {
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

const SharesKey_types: ABIType[] = [
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

const SharesKey_getters: ABIGetter[] = [
    {"name":"supply","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const SharesKey_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateSupply"}},
    {"receiver":"internal","message":{"kind":"typed","type":"FixSupply"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class SharesKey implements Contract {
    
    static async init(subject: Address, sharesContract: Address) {
        return await SharesKey_init(subject, sharesContract);
    }
    
    static async fromInit(subject: Address, sharesContract: Address) {
        const init = await SharesKey_init(subject, sharesContract);
        const address = contractAddress(0, init);
        return new SharesKey(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SharesKey(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SharesKey_types,
        getters: SharesKey_getters,
        receivers: SharesKey_receivers,
        errors: SharesKey_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateSupply | FixSupply | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateSupply') {
            body = beginCell().store(storeUpdateSupply(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FixSupply') {
            body = beginCell().store(storeFixSupply(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getSupply(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('supply', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}