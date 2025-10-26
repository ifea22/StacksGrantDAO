import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TOKEN_CONTRACT } from '@/config';
export default function Treasury() {
    return (_jsxs("div", { children: [_jsx("h2", { children: "Treasury" }), _jsxs("p", { children: ["Send your SIP-010 token to the ", _jsx("b", { children: "DAO contract principal" }), " to fund the treasury."] }), _jsxs("p", { children: ["Token contract: ", _jsx("code", { children: TOKEN_CONTRACT })] }), _jsxs("ol", { children: [_jsx("li", { children: "Mint/get test tokens" }), _jsx("li", { children: "Transfer to DAO contract principal" }), _jsx("li", { children: "Approved proposals will auto-distribute from treasury" })] })] }));
}
