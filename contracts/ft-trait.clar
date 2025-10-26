(define-trait sip010-ft-trait
  (
    ;; SIP-010 Fungible Token Trait (subset used)
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))
    (get-name () (response (string-utf8 32) uint))
    (get-symbol () (response (string-utf8 32) uint))
    (get-decimals () (response uint uint))
    (get-balance (principal) (response uint uint))
    (get-total-supply () (response uint uint))
  )
)