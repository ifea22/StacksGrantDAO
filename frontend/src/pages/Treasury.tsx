import React from 'react'
import { TOKEN_CONTRACT } from '../config'

export default function Treasury(){
  return (
    <div>
      <h2>Treasury</h2>
      <p>Send your SIP-010 token to the <b>DAO contract principal</b> to fund the treasury.</p>
      <p>Token contract: <code>{TOKEN_CONTRACT}</code></p>
      <ol>
        <li>Mint/get test tokens</li>
        <li>Transfer to DAO contract principal</li>
        <li>Approved proposals will auto-distribute from treasury</li>
      </ol>
    </div>
  )
}
