export interface BeneficiaryProfile {
  id: string;
  name: string;
  disasterId: string;
  location: string;
  registrationDate: number;
  lastVerified: number;
  verificationFactors: VerificationFactor[];
  walletAddress: string;
  isActive: boolean;
  familySize: number;
  specialNeeds: string[];
  trustScore: number;
}

export interface VerificationFactor {
  factorType: string; // "possession", "behavioral", "social"
  value: string;
  weight: number;
  verifiedAt: number;
}

export interface RecoveryCode {
  beneficiaryId: string;
  codeHash: string;
  createdAt: number;
  expiresAt: number;
  isUsed: boolean;
}

export interface Merchant {
  id: string;
  name: string;
  owner: string;
  businessType: string;
  location: Location;
  contactInfo: string;
  registrationDate: number;
  isVerified: boolean;
  verificationDocuments: string[];
  stellarTomlUrl: string;
  acceptedTokens: string[];
  dailyLimit: string;
  monthlyLimit: string;
  currentMonthVolume: string;
  reputationScore: number;
  isActive: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Transaction {
  id: string;
  merchantId: string;
  beneficiaryId: string;
  amount: string;
  token: string;
  timestamp: number;
  purpose: string;
  merchantSignature: string;
  beneficiarySignature: string;
  isSettled: boolean;
}

export interface EmergencyFund {
  id: string;
  name: string;
  description: string;
  totalAmount: string;
  releasedAmount: string;
  createdAt: number;
  expiresAt: number;
  disasterType: string;
  geographicScope: string;
  isActive: boolean;
  releaseTriggers: string[];
  requiredSignatures: number;
}

export interface DisbursementRecord {
  id: string;
  fundId: string;
  beneficiary: string;
  amount: string;
  timestamp: number;
  purpose: string;
  approvedBy: string[];
  transactionHash: string;
}

export interface ConditionalTransfer {
  id: string;
  beneficiaryId: string;
  amount: string;
  token: string;
  createdAt: number;
  expiresAt: number;
  spendingRules: SpendingRule[];
  isActive: boolean;
  spentAmount: string;
  remainingAmount: string;
  creator: string;
  purpose: string;
}

export interface SpendingRule {
  ruleType: string; // "category_limit", "merchant_whitelist", "time_window", "location_based"
  parameters: Record<string, string>;
  limit: string;
  currentUsage: string;
}

export interface TransferTransaction {
  id: string;
  transferId: string;
  merchantId: string;
  amount: string;
  category: string;
  timestamp: number;
  location: string;
  isApproved: boolean;
  rejectionReason: string;
}

export interface SupplyShipment {
  id: string;
  donorId: string;
  supplyType: string;
  quantity: string;
  unit: string;
  origin: Location;
  destination: Location;
  createdAt: number;
  estimatedArrival: number;
  currentStatus: string; // "in_transit", "at_checkpoint", "delivered", "lost"
  checkpoints: Checkpoint[];
  assignedTransporter?: string;
  temperatureRequirements?: TemperatureRequirements;
  specialHandling: string[];
}

export interface Checkpoint {
  id: string;
  location: Location;
  timestamp: number;
  verifiedBy: string;
  quantityVerified: string;
  condition: string; // "good", "damaged", "partial_loss"
  photos: string[]; // IPFS hashes
  notes: string;
  temperature?: number;
}

export interface TemperatureRequirements {
  minTemp: number;
  maxTemp: number;
  critical: boolean;
}

export interface RecipientConfirmation {
  shipmentId: string;
  recipientId: string;
  receivedQuantity: string;
  receivedAt: number;
  conditionReport: string;
  confirmedBy: string;
  photos: string[];
}

export interface FraudPattern {
  id: string;
  patternType: string; // "duplicate_registration", "suspicious_transactions", "velocity_check"
  severity: string; // "low", "medium", "high", "critical"
  description: string;
  detectedAt: number;
  entitiesInvolved: string[];
  confidenceScore: number;
  status: string; // "detected", "investigating", "resolved", "false_positive"
  resolutionNotes: string;
}

export interface RiskProfile {
  entityId: string;
  entityType: string; // "beneficiary", "merchant", "donor"
  riskScore: number;
  lastUpdated: number;
  riskFactors: RiskFactor[];
  flaggedTransactions: number;
  totalTransactions: number;
}

export interface RiskFactor {
  factorType: string;
  weight: number;
  value: string;
  detectedAt: number;
}

export interface SuspiciousTransaction {
  id: string;
  transactionHash: string;
  beneficiaryId: string;
  merchantId: string;
  amount: string;
  timestamp: number;
  riskScore: number;
  alertReasons: string[];
  status: string; // "flagged", "reviewed", "cleared", "blocked"
  reviewer?: string;
  reviewNotes: string;
}

export interface DisasterResponseConfig {
  disasterId: string;
  disasterType: string;
  affectedArea: string;
  estimatedAffected: number;
  responseTeam: string[];
  budget: string;
  duration: number; // days
}

export interface QRCodeData {
  type: string; // "beneficiary_id", "transfer", "recovery"
  data: string;
  expiresAt: number;
  signature: string;
}

export interface USSDSession {
  sessionId: string;
  phoneNumber: string;
  beneficiaryId?: string;
  currentStep: string;
  data: Record<string, string>;
  lastActivity: number;
}

export interface NetworkConfig {
  network: "testnet" | "mainnet" | "standalone";
  rpcUrl: string;
  horizonUrl: string;
  contractIds: {
    platform: string;
    aidRegistry: string;
    beneficiaryManager: string;
    merchantNetwork: string;
    cashTransfer: string;
    supplyChainTracker: string;
    antiFraud: string;
  };
}

export interface DeploymentOptions {
  network: "testnet" | "mainnet";
  adminKey: string;
  ngoSigner: string;
  govSigner: string;
  unSigner: string;
}

export interface PaymentRequest {
  beneficiaryId: string;
  merchantId: string;
  amount: string;
  token: string;
  purpose: string;
  location?: string;
}

export interface VerificationRequest {
  beneficiaryId: string;
  providedFactors: VerificationFactor[];
  verifierId: string;
}

export interface MerchantOnboardingRequest {
  name: string;
  businessType: string;
  location: Location;
  contactInfo: string;
  stellarTomlUrl: string;
  acceptedTokens: string[];
  dailyLimit: string;
  monthlyLimit: string;
  verificationDocuments: string[];
}

export interface SupplyChainRequest {
  donorId: string;
  supplyType: string;
  quantity: string;
  unit: string;
  origin: Location;
  destination: Location;
  estimatedArrival: number;
  temperatureRequirements?: TemperatureRequirements;
  specialHandling: string[];
}

// Biometric-Free Identity System Types

export interface BeneficiaryIdentity {
  idHash: string; // Pseudonymous identifier (never real name)
  creationFactors: IdentityFactor[];
  recoveryContacts: string[]; // Stellar addresses
  trustScore: number; // 0-100 based on behavioral patterns
  campLocation: string;
  createdAt: number;
  lastVerified: number;
  walletAddress: string;
  isActive: boolean;
  duressPinHash?: string; // Fake PIN for safety
  geofenceZones: GeofenceZone[];
  temporaryCredentials: TemporaryCredential[];
}

export interface IdentityFactor {
  factorType: 'knowledge' | 'possession' | 'social' | 'behavioral' | 'institutional';
  value: string; // Actual value (hashed before storage)
  factorHash: string; // Hashed value for privacy
  weight: number; // Importance weight (0-100)
  verifiedAt: number;
  verifier: string | null; // NGO worker or community member address
}

export interface TemporaryCredential {
  credentialHash: string;
  createdAt: number;
  expiresAt: number;
  deviceFingerprint: string; // For shared device tracking
  isActive: boolean;
}

export interface GeofenceZone {
  zoneName: string;
  latitude: number; // Scaled by 1e6 for precision
  longitude: number;
  radiusMeters: number;
  isSafe: boolean;
}

export interface SocialRecoveryRequest {
  beneficiaryIdHash: string;
  newWallet: string;
  approvals: string[]; // Addresses of approving contacts
  requiredApprovals: number; // Threshold (e.g., 3 of 5)
  createdAt: number;
  expiresAt: number;
  isCompleted: boolean;
}

export interface OfflineAuthCode {
  type: 'qr' | 'paper' | 'sms';
  code: string;
  idHash: string;
  expiresAt: number;
  signature: string;
  checksum?: string; // For paper codes
}

export interface BluetoothMeshNode {
  nodeId: string;
  publicKey: string;
  lastSeen: number;
  trustScore: number;
  location: string;
}

export interface PaperBackupCode {
  code: string;
  checksum: string;
  createdAt: number;
  instructions: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// RBAC – Role-Based Access Control
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Role bitmask flags – mirror src/rbac.rs constants.
 * Multiple roles are stored as a bitwise OR of these values.
 */
export const RoleFlag = {
  SUPER_ADMIN:  1 << 0,  // 1
  ADMIN:        1 << 1,  // 2
  NGO_WORKER:   1 << 2,  // 4
  GOV_OFFICER:  1 << 3,  // 8
  UN_OFFICER:   1 << 4,  // 16
  FIELD_AGENT:  1 << 5,  // 32
  AUDITOR:      1 << 6,  // 64
  MERCHANT:     1 << 7,  // 128
  ORACLE:       1 << 8,  // 256
} as const;

export type RoleFlagKey = keyof typeof RoleFlag;

/**
 * Permission bitmask flags – mirror src/rbac.rs constants.
 * Stored as bigint because the Soroban contract uses u64.
 */
export const PermissionFlag = {
  MANAGE_ROLES:           BigInt(1) << BigInt(0),
  CREATE_FUND:            BigInt(1) << BigInt(1),
  MANAGE_FUND:            BigInt(1) << BigInt(2),
  DISBURSE_FUNDS:         BigInt(1) << BigInt(3),
  REGISTER_BENEFICIARY:   BigInt(1) << BigInt(4),
  VERIFY_BENEFICIARY:     BigInt(1) << BigInt(5),
  DEACTIVATE_BENEFICIARY: BigInt(1) << BigInt(6),
  CREATE_TRANSFER:        BigInt(1) << BigInt(7),
  PROCESS_PAYMENT:        BigInt(1) << BigInt(8),
  REGISTER_MERCHANT:      BigInt(1) << BigInt(9),
  VERIFY_MERCHANT:        BigInt(1) << BigInt(10),
  MANAGE_SHIPMENT:        BigInt(1) << BigInt(11),
  CONFIRM_DELIVERY:       BigInt(1) << BigInt(12),
  SUBMIT_ORACLE_DATA:     BigInt(1) << BigInt(13),
  REVIEW_FRAUD:           BigInt(1) << BigInt(14),
  UPDATE_RISK_PROFILE:    BigInt(1) << BigInt(15),
  READ_ALL:               BigInt(1) << BigInt(16),
  MANAGE_TRIGGERS:        BigInt(1) << BigInt(17),
  RECALL_FUNDS:           BigInt(1) << BigInt(18),
} as const;

export type PermissionFlagKey = keyof typeof PermissionFlag;

/** Human-readable name for each role flag. */
export const RoleName: Record<number, string> = {
  [RoleFlag.SUPER_ADMIN]: 'SuperAdmin',
  [RoleFlag.ADMIN]:       'Admin',
  [RoleFlag.NGO_WORKER]:  'NGOWorker',
  [RoleFlag.GOV_OFFICER]: 'GovOfficer',
  [RoleFlag.UN_OFFICER]:  'UNOfficer',
  [RoleFlag.FIELD_AGENT]: 'FieldAgent',
  [RoleFlag.AUDITOR]:     'Auditor',
  [RoleFlag.MERCHANT]:    'Merchant',
  [RoleFlag.ORACLE]:      'Oracle',
};

/** Request payload for granting a role. */
export interface GrantRoleRequest {
  /** Address of the caller (must hold MANAGE_ROLES permission). */
  callerKey: string;
  /** Address receiving the role(s). */
  targetAddress: string;
  /** Bitmask of role flags to grant (OR of RoleFlag values). */
  roleMask: number;
}

/** Request payload for revoking a role. */
export interface RevokeRoleRequest {
  callerKey: string;
  targetAddress: string;
  roleMask: number;
}

/** Request payload for granting explicit permissions. */
export interface GrantPermissionRequest {
  callerKey: string;
  targetAddress: string;
  permMask: bigint;
}

/** Request payload for revoking explicit permissions. */
export interface RevokePermissionRequest {
  callerKey: string;
  targetAddress: string;
  permMask: bigint;
}

/** Decoded role assignment for a single address. */
export interface RoleAssignment {
  address: string;
  /** Raw bitmask value stored on-chain. */
  roleMask: number;
  /** Expanded list of role names this address holds. */
  roles: string[];
}

/** Effective permission summary for an address. */
export interface PermissionSummary {
  address: string;
  /** Raw u64 permission bitmask. */
  permMask: bigint;
  /** Expanded list of permission names. */
  permissions: string[];
}
