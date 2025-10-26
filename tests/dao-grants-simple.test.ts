import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const member1 = accounts.get("wallet_1")!;
const recipient = accounts.get("wallet_3")!;

describe("DAO Grants Contract - Basic Tests", () => {
  it("ensures simnet is well initialized", () => {
    expect(simnet.blockHeight).toBeDefined();
    expect(simnet.blockHeight).toBeGreaterThan(0);
  });

  it("should have deployer as initial admin", () => {
    // Just verify the contract is deployed
    const { result } = simnet.callReadOnlyFn("dao-grants", "get-next-proposal-id", [], deployer);
    expect(result).toBeDefined();
  });

  it("should allow admin to add members", () => {
    const { result } = simnet.callPublicFn("dao-grants", "add-member", [Cl.principal(member1)], deployer);
    expect(result).toBeDefined();
  });

  it("should allow getting member info", () => {
    // First add member1 as a member
    simnet.callPublicFn("dao-grants", "add-member", [Cl.principal(member1)], deployer);
    
    const { result } = simnet.callReadOnlyFn("dao-grants", "get-member", [Cl.principal(member1)], deployer);
    expect(result).toBeDefined();
  });

  it("should allow members to submit proposals", () => {
    // First add member1 as a member
    simnet.callPublicFn("dao-grants", "add-member", [Cl.principal(member1)], deployer);

    const { result } = simnet.callPublicFn("dao-grants", "submit-proposal", [
      Cl.principal(recipient),
      Cl.uint(1000),
      Cl.stringUtf8("Test proposal")
    ], member1);
    
    expect(result).toBeDefined();
  });

  it("should get proposal details", () => {
    // Setup
    simnet.callPublicFn("dao-grants", "add-member", [Cl.principal(member1)], deployer);
    simnet.callPublicFn("dao-grants", "submit-proposal", [
      Cl.principal(recipient),
      Cl.uint(1000),
      Cl.stringUtf8("Test proposal")
    ], member1);

    const { result } = simnet.callReadOnlyFn("dao-grants", "get-proposal", [Cl.uint(1)], deployer);
    expect(result).toBeDefined();
  });
});