import React from 'react'
import { txSubmitProposal, roIsMember } from '../api/stacks'

interface SubmitProps {
  userAddress?: string
}

export default function Submit({ userAddress }: SubmitProps){
  const [recipient, setRecipient] = React.useState('')
  const [amount, setAmount] = React.useState(1000)
  const [memo, setMemo] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isMember, setIsMember] = React.useState<boolean | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  // Check if user is a member when address changes
  React.useEffect(() => {
    if (userAddress) {
      roIsMember(userAddress).then(setIsMember)
    } else {
      setIsMember(null)
    }
  }, [userAddress])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userAddress) {
      setError('Please connect your wallet first')
      return
    }

    if (isMember === false) {
      setError('You must be a DAO member to submit proposals')
      return
    }

    if (!recipient.trim()) {
      setError('Please enter a recipient address')
      return
    }

    if (amount <= 0) {
      setError('Amount must be greater than 0')
      return
    }

    if (!memo.trim()) {
      setError('Please enter a memo describing the proposal')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      setSuccess(null)

      await txSubmitProposal(
        recipient.trim(),
        amount,
        memo.trim(),
        (data) => {
          console.log('Proposal submitted:', data)
          setSuccess(`Proposal submitted successfully! Transaction ID: ${data.txId}`)
          // Reset form
          setRecipient('')
          setAmount(1000)
          setMemo('')
          setIsSubmitting(false)
        },
        () => {
          console.log('Proposal submission cancelled')
          setIsSubmitting(false)
        }
      )
    } catch (err) {
      console.error('Error submitting proposal:', err)
      setError('Failed to submit proposal. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (!userAddress) {
    return (
      <div>
        <h2>Submit Proposal</h2>
        <p>Please connect your wallet to submit a proposal.</p>
      </div>
    )
  }

  if (isMember === false) {
    return (
      <div>
        <h2>Submit Proposal</h2>
        <p style={{color: '#dc3545'}}>
          You are not a member of this DAO. Only members can submit proposals.
        </p>
        <p style={{fontSize: 14, color: '#6c757d'}}>
          Contact the DAO admin to be added as a member.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>Submit Proposal</h2>
      
      {isMember === null && (
        <p style={{color: '#ffc107'}}>Checking membership status...</p>
      )}

      {isMember === true && (
        <p style={{color: '#28a745', fontSize: 14, marginBottom: 16}}>
          ✓ You are a DAO member and can submit proposals
        </p>
      )}

      <form onSubmit={handleSubmit} style={{display:'grid', gap:16, maxWidth:600}}>
        <div>
          <label style={{display: 'block', marginBottom: 4, fontWeight: 'bold'}}>
            Recipient Address
          </label>
          <input 
            type="text"
            value={recipient} 
            onChange={e=>setRecipient(e.target.value)} 
            placeholder="ST1ABC123..."
            style={{width:'100%', padding: 8, borderRadius: 4, border: '1px solid #ddd'}}
            disabled={isSubmitting}
            required
          />
          <small style={{color: '#6c757d'}}>
            The Stacks address that will receive the funds if the proposal passes
          </small>
        </div>

        <div>
          <label style={{display: 'block', marginBottom: 4, fontWeight: 'bold'}}>
            Amount (tokens)
          </label>
          <input 
            type="number" 
            value={amount} 
            onChange={e=>setAmount(parseInt(e.target.value||'0'))} 
            min="1"
            style={{width:'100%', padding: 8, borderRadius: 4, border: '1px solid #ddd'}}
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <label style={{display: 'block', marginBottom: 4, fontWeight: 'bold'}}>
            Description
          </label>
          <textarea
            value={memo} 
            onChange={e=>setMemo(e.target.value)} 
            placeholder="Describe what this proposal is for..."
            style={{width:'100%', padding: 8, borderRadius: 4, border: '1px solid #ddd', minHeight: 80, resize: 'vertical'}}
            disabled={isSubmitting}
            maxLength={128}
            required
          />
          <small style={{color: '#6c757d'}}>
            {memo.length}/128 characters
          </small>
        </div>

        {error && (
          <div style={{color: '#dc3545', padding: 12, backgroundColor: '#f8d7da', borderRadius: 4, border: '1px solid #f5c6cb'}}>
            {error}
          </div>
        )}

        {success && (
          <div style={{color: '#155724', padding: 12, backgroundColor: '#d4edda', borderRadius: 4, border: '1px solid #c3e6cb'}}>
            {success}
          </div>
        )}

        <button 
          type="submit"
          disabled={isSubmitting || isMember !== true}
          style={{
            padding: '12px 24px', 
            backgroundColor: isSubmitting ? '#6c757d' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: 4,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: 16
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
        </button>
      </form>

      <div style={{marginTop: 24, padding: 16, backgroundColor: '#f8f9fa', borderRadius: 4}}>
        <h4>How it works:</h4>
        <ol style={{fontSize: 14, color: '#6c757d'}}>
          <li>Submit your proposal with recipient address, amount, and description</li>
          <li>DAO members can vote Yes or No on your proposal</li>
          <li>Voting period lasts for 100 blocks (~16.7 hours)</li>
          <li>If the proposal gets more Yes votes than No votes, it can be finalized</li>
          <li>Finalization automatically transfers the tokens to the recipient</li>
        </ol>
      </div>
    </div>
  )
}
