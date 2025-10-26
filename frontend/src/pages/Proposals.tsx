import React from 'react'
import ProposalCard from '@/components/ProposalCard'

// Demo-only mock list; wire to read-only calls in production
export default function Proposals(){
  const [list] = React.useState([
    {id:1, recipient:'ST2ABC...', amount:1000, memo:'Docs website', yes:3, no:1, endHeight:12345},
    {id:2, recipient:'ST2DEF...', amount:2500, memo:'SDK refactor', yes:1, no:2, endHeight:12390},
  ])
  return (
    <div>
      <h2>Active Proposals</h2>
      {list.map(p=>(
        <ProposalCard key={p.id} {...p} onVote={(s)=>alert(`vote ${s}`)} onFinalize={()=>alert('finalize')}/>
      ))}
      <p style={{opacity:.75}}>Replace mock data by calling <code>get-proposal</code> read-only functions.</p>
    </div>
  )
}
