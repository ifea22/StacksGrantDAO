import React from 'react'
import { txSubmitProposal } from '@/api/stacks'

export default function Submit(){
  const [recipient, setRecipient] = React.useState('ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKD1T4G6C3')
  const [amount, setAmount] = React.useState(1000)
  const [memo, setMemo] = React.useState('Grant for hackathon demo')

  return (
    <div>
      <h2>Submit Proposal</h2>
      <div style={{display:'grid', gap:8, maxWidth:600}}>
        <label>Recipient principal
          <input value={recipient} onChange={e=>setRecipient(e.target.value)} style={{width:'100%'}}/>
        </label>
        <label>Amount (uint)
          <input type="number" value={amount} onChange={e=>setAmount(parseInt(e.target.value||'0'))} />
        </label>
        <label>Memo
          <input value={memo} onChange={e=>setMemo(e.target.value)} style={{width:'100%'}}/>
        </label>
        <button onClick={()=>alert('Construct and broadcast tx with your wallet. See src/api/stacks.ts for helpers.')}>Create Proposal</button>
      </div>
      <p style={{marginTop:8, opacity:.75}}>Note: this demo uses a lightweight mock wallet for UI. Replace with @stacks/connect for real transactions.</p>
    </div>
  )
}
