import React from 'react'

type Props = {
  id: number
  recipient: string
  amount: number
  memo: string
  yes: number
  no: number
  endHeight: number
  finalized?: boolean
  isExpired?: boolean
  canFinalize?: boolean
  onVote?: (support: boolean)=>void
  onFinalize?: ()=>void
}

export default function ProposalCard(p: Props){
  const getStatusColor = () => {
    if (p.finalized) return '#28a745' // green
    if (p.isExpired) return '#dc3545' // red
    return '#007bff' // blue
  }

  const getStatusText = () => {
    if (p.finalized) return 'Finalized'
    if (p.isExpired) return 'Voting Ended'
    return 'Active'
  }

  return (
    <div style={{
      border:'1px solid #ddd', 
      borderRadius:12, 
      padding:16, 
      marginBottom:12,
      borderLeft: `4px solid ${getStatusColor()}`
    }}>
      <h3>
        Proposal #{p.id} 
        <span style={{
          fontSize: 12, 
          color: getStatusColor(), 
          marginLeft: 8,
          fontWeight: 'normal'
        }}>
          ({getStatusText()})
        </span>
      </h3>
      <p><b>Recipient:</b> <code>{p.recipient}</code></p>
      <p><b>Amount:</b> {p.amount.toLocaleString()} tokens</p>
      <p><b>Memo:</b> {p.memo}</p>
      <p><b>Votes:</b> {p.yes} Yes / {p.no} No</p>
      <p><b>Ends @ block:</b> {p.endHeight}</p>
      
      <div style={{display:'flex', gap:8, marginTop: 12}}>
        {p.onVote && !p.isExpired && !p.finalized && (
          <>
            <button 
              onClick={()=>p.onVote!(true)}
              style={{backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4}}
            >
              Vote Yes
            </button>
            <button 
              onClick={()=>p.onVote!(false)}
              style={{backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4}}
            >
              Vote No
            </button>
          </>
        )}
        {p.onFinalize && p.canFinalize && (
          <button 
            onClick={p.onFinalize}
            style={{backgroundColor: '#ffc107', color: 'black', border: 'none', padding: '8px 16px', borderRadius: 4}}
          >
            Finalize & Execute
          </button>
        )}
        {p.isExpired && !p.finalized && !p.canFinalize && (
          <span style={{color: '#6c757d', fontStyle: 'italic'}}>
            Proposal failed (insufficient votes)
          </span>
        )}
      </div>
    </div>
  )
}
