import React from 'react'

type Props = {
  id: number
  recipient: string
  amount: number
  memo: string
  yes: number
  no: number
  endHeight: number
  onVote?: (support: boolean)=>void
  onFinalize?: ()=>void
}

export default function ProposalCard(p: Props){
  return (
    <div style={{border:'1px solid #ddd', borderRadius:12, padding:16, marginBottom:12}}>
      <h3>Proposal #{p.id}</h3>
      <p><b>Recipient:</b> {p.recipient}</p>
      <p><b>Amount (u):</b> {p.amount}</p>
      <p><b>Memo:</b> {p.memo}</p>
      <p><b>Yes/No:</b> {p.yes} / {p.no}</p>
      <p><b>Ends @ block:</b> {p.endHeight}</p>
      <div style={{display:'flex', gap:8}}>
        {p.onVote && <><button onClick={()=>p.onVote!(true)}>Vote Yes</button><button onClick={()=>p.onVote!(false)}>Vote No</button></>}
        {p.onFinalize && <button onClick={p.onFinalize}>Finalize</button>}
      </div>
    </div>
  )
}
