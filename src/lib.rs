#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Symbol, Vec};

mod aid_registry;
mod beneficiary_manager;
mod merchant_network;
mod cash_transfer;
mod supply_chain_tracker;
mod anti_fraud;
pub mod rbac;

pub use aid_registry::*;
pub use beneficiary_manager::*;
pub use merchant_network::*;
pub use cash_transfer::*;
pub use supply_chain_tracker::*;
pub use anti_fraud::*;

use rbac::{
    bootstrap_super_admin, assign_platform_roles,
    grant_role, revoke_role, grant_permission, revoke_permission,
    get_roles, get_permissions, has_permission, has_role,
    list_role_holders, require_permission,
    PERM_MANAGE_ROLES,
};

#[contract]
pub struct DisasterReliefPlatform;

#[contractimpl]
impl DisasterReliefPlatform {
    /// Initialize the disaster relief platform.
    ///
    /// Seeds the first SuperAdmin (admin) and assigns default roles to the
    /// platform signers (NGO, Government, UN).  Must be called exactly once.
    pub fn initialize(
        env: Env,
        admin: Address,
        ngo_signer: Address,
        gov_signer: Address,
        un_signer: Address,
    ) {
        admin.require_auth();

        // Prevent re-initialization
        let init_key = Symbol::new(&env, "initialized");
        if env.storage().instance().get::<Symbol, bool>(&init_key).unwrap_or(false) {
            panic!("Platform already initialized");
        }

        // Store multi-sig signer addresses (used by aid_registry multi-sig)
        env.storage().instance().set(&Symbol::new(&env, "admin"),   &admin);
        env.storage().instance().set(&Symbol::new(&env, "ngo_sig"), &ngo_signer);
        env.storage().instance().set(&Symbol::new(&env, "gov_sig"), &gov_signer);
        env.storage().instance().set(&Symbol::new(&env, "un_sig"),  &un_signer);

        // ── RBAC bootstrap ──────────────────────────────────────────────────
        // Seed SuperAdmin role for the platform admin address.
        bootstrap_super_admin(&env, &admin);
        // Assign NGO / Gov / UN their default roles.
        assign_platform_roles(&env, &ngo_signer, &gov_signer, &un_signer);

        env.storage().instance().set(&init_key, &true);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Role management (RBAC administration)
    // ─────────────────────────────────────────────────────────────────────────

    /// Grant one or more roles to `target`.  Caller must hold `PERM_MANAGE_ROLES`.
    pub fn grant_role(env: Env, caller: Address, target: Address, role_mask: u32) {
        caller.require_auth();
        grant_role(&env, &caller, &target, role_mask);
    }

    /// Revoke one or more roles from `target`.  Caller must hold `PERM_MANAGE_ROLES`.
    pub fn revoke_role(env: Env, caller: Address, target: Address, role_mask: u32) {
        caller.require_auth();
        revoke_role(&env, &caller, &target, role_mask);
    }

    /// Grant extra permissions to `target` beyond what their role provides.
    pub fn grant_permission(env: Env, caller: Address, target: Address, perm_mask: u64) {
        caller.require_auth();
        grant_permission(&env, &caller, &target, perm_mask);
    }

    /// Revoke specific permission overrides from `target`.
    pub fn revoke_permission(env: Env, caller: Address, target: Address, perm_mask: u64) {
        caller.require_auth();
        revoke_permission(&env, &caller, &target, perm_mask);
    }

    /// Return the role bitmask for `addr`.
    pub fn get_roles(env: Env, addr: Address) -> u32 {
        get_roles(&env, &addr)
    }

    /// Return the effective permission bitmask for `addr`.
    pub fn get_permissions(env: Env, addr: Address) -> u64 {
        get_permissions(&env, &addr)
    }

    /// Check whether `addr` holds all permissions in `perm_mask`.
    pub fn has_permission(env: Env, addr: Address, perm_mask: u64) -> bool {
        has_permission(&env, &addr, perm_mask)
    }

    /// Check whether `addr` holds at least one of the roles in `role_mask`.
    pub fn has_role(env: Env, addr: Address, role_mask: u32) -> bool {
        has_role(&env, &addr, role_mask)
    }

    /// List all addresses that have been assigned any role.
    pub fn list_role_holders(env: Env) -> Vec<Address> {
        list_role_holders(&env)
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Platform info
    // ─────────────────────────────────────────────────────────────────────────

    /// Get platform signer addresses in order: [admin, ngo, gov, un].
    pub fn get_config(env: Env) -> Vec<Address> {
        let mut config = Vec::new(&env);

        if let Some(admin) = env.storage().instance().get(&Symbol::new(&env, "admin")) {
            config.push_back(admin);
        }
        if let Some(ngo) = env.storage().instance().get(&Symbol::new(&env, "ngo_sig")) {
            config.push_back(ngo);
        }
        if let Some(gov) = env.storage().instance().get(&Symbol::new(&env, "gov_sig")) {
            config.push_back(gov);
        }
        if let Some(un) = env.storage().instance().get(&Symbol::new(&env, "un_sig")) {
            config.push_back(un);
        }

        config
    }

    /// Returns `true` if the platform has been initialized.
    pub fn is_initialized(env: Env) -> bool {
        env.storage()
            .instance()
            .get(&Symbol::new(&env, "initialized"))
            .unwrap_or(false)
    }
}
