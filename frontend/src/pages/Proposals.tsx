import React from 'react'
import ProposalCard from '../components/ProposalCard'
import { roGetProposal, roGetNextProposalId, getCurrentBlockHeight, txVote, txFinalize } from '../api/stacks'

interface Proposal {
  id: number
  proposer: string
  recipient: string
  amount: number
  memo: string
  startHeight: number
  endHeight: number
  yesVotes: number
  noVotes: number
  finalized: boolean
}

export default function Proposals(){
  const [proposals, setProposals] = React.useState<Proposal[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [currentHeight, setCurrentHeight] = React.useState(0)

  const loadProposals = React.useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [nextId, blockHeight] = await Promise.all([
        roGetNextProposalId(),
        getCurrentBlockHeight()
      ])
      
      setCurrentHeight(blockHeight)
      
      if (nextId === 0) {
        setProposals([])
        return
      }

      const proposalPromises = []
      for (let i = 1; i <= nextId; i++) {
        proposalPromises.push(roGetProposal(i))
      }

      const proposalResults = await Promise.all(proposalPromises)
      const loadedProposals: Proposal[] = []

      proposalResults.forEach((result, index) => {
        if (result) {
          loadedProposals.push({
            id: index + 1,
            proposer: result.proposer,
            recipient: result.recipient,
            amount: parseInt(result.amount),
            memo: result.memo,
            startHeight: parseInt(result['start-height']),
            endHeight: parseInt(result['end-height']),
            yesVotes: parseInt(result['yes-votes']),
            noVotes: parseInt(result['no-votes']),
            finalized: result.finalized
          })
        }
      })

      setProposals(loadedProposals)
    } catch (err) {
      setError('Failed to load proposals')
      console.error('Error loading proposals:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadProposals()
  }, [loadProposals])

  const handleVote = (id: number, support: boolean) => {
    txVote(id, support, 
      (data) => {
        console.log('Vote transaction submitted:', data)
        // Reload proposals after successful vote
        setTimeout(loadProposals, 2000)
      },
      () => console.log('Vote cancelled')
    )
  }

  const handleFinalize = (id: number) => {
    txFinalize(id,
      (data) => {
        console.log('Finalize transaction submitted:', data)
        // Reload proposals after successful finalization
        setTimeout(loadProposals, 2000)
      },
      () => console.log('Finalization cancelled')
    )
  }

  if (loading) {
    return (
      <div>
        <h2>Active Proposals</h2>
        <p>Loading proposals...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2>Active Proposals</h2>
        <p style={{color: 'red'}}>Error: {error}</p>
        <button onClick={loadProposals}>Retry</button>
      </div>
    )
  }

  if (proposals.length === 0) {
    return (
      <div>
        <h2>Active Proposals</h2>
        <p>No proposals found. Be the first to submit one!</p>
        <button onClick={loadProposals}>Refresh</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Active Proposals</h2>
      <p style={{fontSize: 12, opacity: 0.7}}>
        Current block height: {currentHeight} | Loaded {proposals.length} proposal(s)
      </p>
      <button onClick={loadProposals} style={{marginBottom: 16}}>Refresh</button>
      
      {proposals.map(proposal => {
        const isExpired = currentHeight > proposal.endHeight
        const canFinalize = isExpired && !proposal.finalized && proposal.yesVotes > proposal.noVotes
        
        return (
          <ProposalCard 
            key={proposal.id}
            id={proposal.id}
            recipient={proposal.recipient}
            amount={proposal.amount}
            memo={proposal.memo}
            yes={proposal.yesVotes}
            no={proposal.noVotes}
            endHeight={proposal.endHeight}
            finalized={proposal.finalized}
            isExpired={isExpired}
            canFinalize={canFinalize}
            onVote={(support) => handleVote(proposal.id, support)}
            onFinalize={() => handleFinalize(proposal.id)}
          />
        )
      })}
    </div>
  )
}
