import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { txSubmitProposal, roIsMember } from '../api/stacks';
export default function Submit({ userAddress }) {
    const [recipient, setRecipient] = React.useState('');
    const [amount, setAmount] = React.useState(1000);
    const [memo, setMemo] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isMember, setIsMember] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);
    // Check if user is a member when address changes
    React.useEffect(() => {
        if (userAddress) {
            roIsMember(userAddress).then(setIsMember);
        }
        else {
            setIsMember(null);
        }
    }, [userAddress]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userAddress) {
            setError('Please connect your wallet first');
            return;
        }
        if (isMember === false) {
            setError('You must be a DAO member to submit proposals');
            return;
        }
        if (!recipient.trim()) {
            setError('Please enter a recipient address');
            return;
        }
        if (amount <= 0) {
            setError('Amount must be greater than 0');
            return;
        }
        if (!memo.trim()) {
            setError('Please enter a memo describing the proposal');
            return;
        }
        try {
            setIsSubmitting(true);
            setError(null);
            setSuccess(null);
            await txSubmitProposal(recipient.trim(), amount, memo.trim(), (data) => {
                console.log('Proposal submitted:', data);
                setSuccess(`Proposal submitted successfully! Transaction ID: ${data.txId}`);
                // Reset form
                setRecipient('');
                setAmount(1000);
                setMemo('');
                setIsSubmitting(false);
            }, () => {
                console.log('Proposal submission cancelled');
                setIsSubmitting(false);
            });
        }
        catch (err) {
            console.error('Error submitting proposal:', err);
            setError('Failed to submit proposal. Please try again.');
            setIsSubmitting(false);
        }
    };
    if (!userAddress) {
        return (_jsxs("div", { children: [_jsx("h2", { children: "Submit Proposal" }), _jsx("p", { children: "Please connect your wallet to submit a proposal." })] }));
    }
    if (isMember === false) {
        return (_jsxs("div", { children: [_jsx("h2", { children: "Submit Proposal" }), _jsx("p", { style: { color: '#dc3545' }, children: "You are not a member of this DAO. Only members can submit proposals." }), _jsx("p", { style: { fontSize: 14, color: '#6c757d' }, children: "Contact the DAO admin to be added as a member." })] }));
    }
    return (_jsxs("div", { children: [_jsx("h2", { children: "Submit Proposal" }), isMember === null && (_jsx("p", { style: { color: '#ffc107' }, children: "Checking membership status..." })), isMember === true && (_jsx("p", { style: { color: '#28a745', fontSize: 14, marginBottom: 16 }, children: "\u2713 You are a DAO member and can submit proposals" })), _jsxs("form", { onSubmit: handleSubmit, style: { display: 'grid', gap: 16, maxWidth: 600 }, children: [_jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: 4, fontWeight: 'bold' }, children: "Recipient Address" }), _jsx("input", { type: "text", value: recipient, onChange: e => setRecipient(e.target.value), placeholder: "ST1ABC123...", style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ddd' }, disabled: isSubmitting, required: true }), _jsx("small", { style: { color: '#6c757d' }, children: "The Stacks address that will receive the funds if the proposal passes" })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: 4, fontWeight: 'bold' }, children: "Amount (tokens)" }), _jsx("input", { type: "number", value: amount, onChange: e => setAmount(parseInt(e.target.value || '0')), min: "1", style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ddd' }, disabled: isSubmitting, required: true })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: 4, fontWeight: 'bold' }, children: "Description" }), _jsx("textarea", { value: memo, onChange: e => setMemo(e.target.value), placeholder: "Describe what this proposal is for...", style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ddd', minHeight: 80, resize: 'vertical' }, disabled: isSubmitting, maxLength: 128, required: true }), _jsxs("small", { style: { color: '#6c757d' }, children: [memo.length, "/128 characters"] })] }), error && (_jsx("div", { style: { color: '#dc3545', padding: 12, backgroundColor: '#f8d7da', borderRadius: 4, border: '1px solid #f5c6cb' }, children: error })), success && (_jsx("div", { style: { color: '#155724', padding: 12, backgroundColor: '#d4edda', borderRadius: 4, border: '1px solid #c3e6cb' }, children: success })), _jsx("button", { type: "submit", disabled: isSubmitting || isMember !== true, style: {
                            padding: '12px 24px',
                            backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            fontSize: 16
                        }, children: isSubmitting ? 'Submitting...' : 'Submit Proposal' })] }), _jsxs("div", { style: { marginTop: 24, padding: 16, backgroundColor: '#f8f9fa', borderRadius: 4 }, children: [_jsx("h4", { children: "How it works:" }), _jsxs("ol", { style: { fontSize: 14, color: '#6c757d' }, children: [_jsx("li", { children: "Submit your proposal with recipient address, amount, and description" }), _jsx("li", { children: "DAO members can vote Yes or No on your proposal" }), _jsx("li", { children: "Voting period lasts for 100 blocks (~16.7 hours)" }), _jsx("li", { children: "If the proposal gets more Yes votes than No votes, it can be finalized" }), _jsx("li", { children: "Finalization automatically transfers the tokens to the recipient" })] })] })] }));
}
