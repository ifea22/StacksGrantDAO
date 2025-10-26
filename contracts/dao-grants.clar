;; Import trait
(use-trait sip010-trait .ft-trait.sip010-ft-trait)

(define-constant ERR-NOT-A-MEMBER (err u100))
(define-constant ERR-NOT-ADMIN (err u101))
(define-constant ERR-PROPOSAL-NOT-FOUND (err u102))
(define-constant ERR-ALREADY-VOTED (err u103))
(define-constant ERR-VOTING-CLOSED (err u104))
(define-constant ERR-VOTING-OPEN (err u105))
(define-constant ERR-ALREADY-FINALIZED (err u106))
(define-constant ERR-NO-QUORUM (err u107))
(define-constant ERR-NO-MAJORITY (err u108))
(define-constant ERR-TRANSFER-FAILED (err u109))

;; ----------------------
;; Parameters
;; ----------------------
(define-data-var admin principal tx-sender)
(define-data-var proposal-counter uint u0)
(define-constant PROPOSAL-LIFETIME u100) ;; blocks
(define-constant MIN-QUORUM u3)          ;; min votes required

;; SIP-010 token contract (update after deploy if needed)
(define-data-var token-contract principal tx-sender)

;; Members registry (one-address-one-vote)
(define-map members { who: principal } { joined: bool })
(define-read-only (is-member (who principal))
  (is-some (map-get? members { who: who }))
)

;; Proposals
(define-map proposals
  { id: uint }
  {
    proposer: principal,
    recipient: principal,
    amount: uint,
    memo: (string-utf8 128),
    start-height: uint,
    end-height: uint,
    yes-votes: uint,
    no-votes: uint,
    finalized: bool
  }
)

(define-map votes { id: uint, voter: principal } { support: bool })

;; ----------------------
;; Admin functions
;; ----------------------
(define-public (set-admin (new principal))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) ERR-NOT-ADMIN)
    (ok (var-set admin new))
  )
)

(define-public (set-token-contract (token principal))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) ERR-NOT-ADMIN)
    (ok (var-set token-contract token))
  )
)

(define-public (add-member (who principal))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) ERR-NOT-ADMIN)
    (map-set members { who: who } { joined: true })
    (ok true)
  )
)

(define-public (remove-member (who principal))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) ERR-NOT-ADMIN)
    (map-delete members { who: who })
    (ok true)
  )
)

;; ----------------------
;; Proposal lifecycle
;; ----------------------
(define-public (submit-proposal (recipient principal) (amount uint) (memo (string-utf8 128)))
  (begin
    (asserts! (is-member tx-sender) ERR-NOT-A-MEMBER)
    (var-set proposal-counter (+ (var-get proposal-counter) u1))
    (let
      (
        (pid (var-get proposal-counter))
        (start block-height)
        (end (+ block-height PROPOSAL-LIFETIME))
      )
      (map-set proposals { id: pid }
        {
          proposer: tx-sender,
          recipient: recipient,
          amount: amount,
          memo: memo,
          start-height: start,
          end-height: end,
          yes-votes: u0,
          no-votes: u0,
          finalized: false
        }
      )
      (ok pid)
    )
  )
)

(define-public (vote (id uint) (support bool))
  (let
    (
      (prop (unwrap! (map-get? proposals { id: id }) ERR-PROPOSAL-NOT-FOUND))
    )
    (begin
      (asserts! (is-member tx-sender) ERR-NOT-A-MEMBER)
      (asserts! (<= block-height (get end-height prop)) ERR-VOTING-CLOSED)
      (asserts! (is-none (map-get? votes { id: id, voter: tx-sender })) ERR-ALREADY-VOTED)
      (map-set votes { id: id, voter: tx-sender } { support: support })
      (if support
        (map-set proposals { id: id } (merge prop { yes-votes: (+ (get yes-votes prop) u1) }))
        (map-set proposals { id: id } (merge prop { no-votes: (+ (get no-votes prop) u1) }))
      )
      (ok true)
    )
  )
)

(define-public (finalize (id uint) (token <sip010-trait>))
  (let
    (
      (prop (unwrap! (map-get? proposals { id: id }) ERR-PROPOSAL-NOT-FOUND))
    )
    (begin
      (asserts! (> block-height (get end-height prop)) ERR-VOTING-OPEN)
      (asserts! (is-eq (get finalized prop) false) ERR-ALREADY-FINALIZED)
      (let
        (
          (total (+ (get yes-votes prop) (get no-votes prop)))
        )
        (begin
          (asserts! (>= total MIN-QUORUM) ERR-NO-QUORUM)
          (asserts! (> (get yes-votes prop) (get no-votes prop)) ERR-NO-MAJORITY)
          ;; Transfer funds from contract principal to recipient
          (let
            (
              (result (as-contract (contract-call? token transfer (get amount prop) (as-contract tx-sender) (get recipient prop) (some 0x)))) ;; memo buff
            )
            (match result
              okv
                (begin
                  (map-set proposals { id: id } (merge prop { finalized: true }))
                  (ok true)
                )
              errv
                ERR-TRANSFER-FAILED
            )
          )
        )
      )
    )
  )
)

;; ----------------------
;; Read-only helpers
;; ----------------------
(define-read-only (get-proposal (id uint))
  (map-get? proposals { id: id })
)

(define-read-only (get-next-proposal-id) (ok (var-get proposal-counter)))

(define-read-only (get-member (who principal))
  (map-get? members { who: who })
)
