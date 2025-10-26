import { AnchorMode, callReadOnlyFunction, cvToValue, makeContractCall, PostConditionMode, broadcastTransaction, uintCV, boolCV, principalCV, stringUtf8CV, contractPrincipalCV } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';
import { openContractCall } from '@stacks/connect';
import { DAO_CONTRACT, TOKEN_CONTRACT } from '../config';

const network = new StacksTestnet();

function splitContract(id: string) {
  const [address, name] = id.split('.');
  return { address, name };
}

export async function getCurrentBlockHeight(): Promise<number> {
  try {
    const response = await fetch(`${network.coreApiUrl}/v2/info`);
    const data = await response.json();
    return data.stacks_tip_height;
  } catch (error) {
    console.error('Error fetching block height:', error);
    return 0;
  }
}

export async function roGetProposal(id: number) {
  try {
    const { address, name } = splitContract(DAO_CONTRACT);
    const res = await callReadOnlyFunction({
      contractAddress: address,
      contractName: name,
      functionName: 'get-proposal',
      functionArgs: [uintCV(id)],
      senderAddress: address,
      network
    });
    const result = cvToValue(res);
    return result?.value || null;
  } catch (error) {
    console.error('Error fetching proposal:', error);
    return null;
  }
}

export async function roGetNextProposalId(): Promise<number> {
  try {
    const { address, name } = splitContract(DAO_CONTRACT);
    const res = await callReadOnlyFunction({
      contractAddress: address,
      contractName: name,
      functionName: 'get-next-proposal-id',
      functionArgs: [],
      senderAddress: address,
      network
    });
    const result = cvToValue(res);
    return result?.value || 0;
  } catch (error) {
    console.error('Error fetching next proposal ID:', error);
    return 0;
  }
}

export async function roIsMember(address: string): Promise<boolean> {
  try {
    const { address: contractAddress, name } = splitContract(DAO_CONTRACT);
    const res = await callReadOnlyFunction({
      contractAddress,
      contractName: name,
      functionName: 'is-member',
      functionArgs: [principalCV(address)],
      senderAddress: contractAddress,
      network
    });
    return cvToValue(res) === true;
  } catch (error) {
    console.error('Error checking membership:', error);
    return false;
  }
}

export function txSubmitProposal(recipient: string, amount: number, memo: string, onFinish?: (data: any) => void, onCancel?: () => void) {
  const { address, name } = splitContract(DAO_CONTRACT);
  return openContractCall({
    network,
    anchorMode: AnchorMode.Any,
    contractAddress: address,
    contractName: name,
    functionName: 'submit-proposal',
    functionArgs: [principalCV(recipient), uintCV(amount), stringUtf8CV(memo)],
    postConditionMode: PostConditionMode.Allow,
    onFinish: onFinish || ((data) => {
      console.log('Transaction submitted:', data);
    }),
    onCancel: onCancel || (() => {
      console.log('Transaction cancelled');
    }),
  });
}

export function txVote(id: number, support: boolean, onFinish?: (data: any) => void, onCancel?: () => void) {
  const { address, name } = splitContract(DAO_CONTRACT);
  return openContractCall({
    network,
    anchorMode: AnchorMode.Any,
    contractAddress: address,
    contractName: name,
    functionName: 'vote',
    functionArgs: [uintCV(id), boolCV(support)],
    postConditionMode: PostConditionMode.Allow,
    onFinish: onFinish || ((data) => {
      console.log('Vote submitted:', data);
    }),
    onCancel: onCancel || (() => {
      console.log('Vote cancelled');
    }),
  });
}

export function txFinalize(id: number, onFinish?: (data: any) => void, onCancel?: () => void) {
  const { address, name } = splitContract(DAO_CONTRACT);
  const { address: tokenAddress, name: tokenName } = splitContract(TOKEN_CONTRACT);
  return openContractCall({
    network,
    anchorMode: AnchorMode.Any,
    contractAddress: address,
    contractName: name,
    functionName: 'finalize',
    functionArgs: [uintCV(id), contractPrincipalCV(tokenAddress, tokenName)],
    postConditionMode: PostConditionMode.Allow,
    onFinish: onFinish || ((data) => {
      console.log('Finalization submitted:', data);
    }),
    onCancel: onCancel || (() => {
      console.log('Finalization cancelled');
    }),
  });
}
