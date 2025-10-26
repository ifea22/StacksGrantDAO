import { AnchorMode, callReadOnlyFunction, cvToValue, makeContractCall, PostConditionMode, standardPrincipalCV, uintCV, boolCV, principalCV, stringUtf8CV } from '@stacks/transactions';
import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { DAO_CONTRACT, TOKEN_CONTRACT, NETWORK } from '@/config';

const network = NETWORK === 'mainnet' ? new StacksMainnet() : new StacksTestnet();

function splitContract(id: string) {
  const [address, name] = id.split('.');
  return { address, name };
}

export async function roGetProposal(id: number) {
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

export function txSubmitProposal(senderKey: string, recipient: string, amountU: number, memo: string) {
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

export function txVote(senderKey: string, id: number, support: boolean) {
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

export function txFinalize(senderKey: string, id: number) {
  const { address, name } = splitContract(DAO_CONTRACT);
  return makeContractCall({
    senderKey,
    contractAddress: address,
    contractName: name,
    functionName: 'finalize',
    functionArgs: [uintCV(id)],
    postConditionMode: PostConditionMode.Allow,
    network,
    anchorMode: AnchorMode.Any
  });
}
