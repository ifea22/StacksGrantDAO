import { AnchorMode, callReadOnlyFunction, cvToValue, makeContractCall, PostConditionMode, uintCV, boolCV, principalCV, stringUtf8CV } from '@stacks/transactions';
import { StacksTestnet, StacksMainnet, StacksDevnet } from '@stacks/network';
import { DAO_CONTRACT, NETWORK } from '@/config';
const network = NETWORK === 'mainnet'
    ? new StacksMainnet()
    : NETWORK === 'devnet'
        ? new StacksDevnet()
        : new StacksTestnet();
function splitContract(id) {
    const [address, name] = id.split('.');
    return { address, name };
}
export async function roGetProposal(id) {
    const { address, name } = splitContract(DAO_CONTRACT);
    const res = await callReadOnlyFunction({
        contractAddress: address,
        contractName: name,
        functionName: 'get-proposal',
        functionArgs: [uintCV(id)],
        senderAddress: address,
        network
    });
    return cvToValue(res);
}
export function txSubmitProposal(senderKey, recipient, amountU, memo) {
    const { address, name } = splitContract(DAO_CONTRACT);
    return makeContractCall({
        senderKey,
        contractAddress: address,
        contractName: name,
        functionName: 'submit-proposal',
        functionArgs: [principalCV(recipient), uintCV(amountU), stringUtf8CV(memo)],
        postConditionMode: PostConditionMode.Allow,
        network,
        anchorMode: AnchorMode.Any
    });
}
export function txVote(senderKey, id, support) {
    const { address, name } = splitContract(DAO_CONTRACT);
    return makeContractCall({
        senderKey,
        contractAddress: address,
        contractName: name,
        functionName: 'vote',
        functionArgs: [uintCV(id), boolCV(support)],
        postConditionMode: PostConditionMode.Allow,
        network,
        anchorMode: AnchorMode.Any
    });
}
export function txFinalize(senderKey, id, tokenContract) {
    const { address, name } = splitContract(DAO_CONTRACT);
    const tokenParts = splitContract(tokenContract);
    return makeContractCall({
        senderKey,
        contractAddress: address,
        contractName: name,
        functionName: 'finalize',
        functionArgs: [uintCV(id), principalCV(`${tokenParts.address}.${tokenParts.name}`)],
        postConditionMode: PostConditionMode.Allow,
        network,
        anchorMode: AnchorMode.Any
    });
}
