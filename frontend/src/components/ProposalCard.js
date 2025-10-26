import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export default function ProposalCard(p) {
    const getStatusColor = () => {
        if (p.finalized)
            return '#28a745'; // green
        if (p.isExpired)
            return '#dc3545'; // red
        return '#007bff'; // blue
    };
    const getStatusText = () => {
        if (p.finalized)
            return 'Finalized';
        if (p.isExpired)
            return 'Voting Ended';
        return 'Active';
    };
    return (_jsxs("div", { style: {
            border: '1px solid #ddd',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            borderLeft: `4px solid ${getStatusColor()}`
        }, children: [_jsxs("h3", { children: ["Proposal #", p.id, _jsxs("span", { style: {
                            fontSize: 12,
                            color: getStatusColor(),
                            marginLeft: 8,
                            fontWeight: 'normal'
                        }, children: ["(", getStatusText(), ")"] })] }), _jsxs("p", { children: [_jsx("b", { children: "Recipient:" }), " ", _jsx("code", { children: p.recipient })] }), _jsxs("p", { children: [_jsx("b", { children: "Amount:" }), " ", p.amount.toLocaleString(), " tokens"] }), _jsxs("p", { children: [_jsx("b", { children: "Memo:" }), " ", p.memo] }), _jsxs("p", { children: [_jsx("b", { children: "Votes:" }), " ", p.yes, " Yes / ", p.no, " No"] }), _jsxs("p", { children: [_jsx("b", { children: "Ends @ block:" }), " ", p.endHeight] }), _jsxs("div", { style: { display: 'flex', gap: 8, marginTop: 12 }, children: [p.onVote && !p.isExpired && !p.finalized && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => p.onVote(true), style: { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4 }, children: "Vote Yes" }), _jsx("button", { onClick: () => p.onVote(false), style: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4 }, children: "Vote No" })] })), p.onFinalize && p.canFinalize && (_jsx("button", { onClick: p.onFinalize, style: { backgroundColor: '#ffc107', color: 'black', border: 'none', padding: '8px 16px', borderRadius: 4 }, children: "Finalize & Execute" })), p.isExpired && !p.finalized && !p.canFinalize && (_jsx("span", { style: { color: '#6c757d', fontStyle: 'italic' }, children: "Proposal failed (insufficient votes)" }))] })] }));
}
