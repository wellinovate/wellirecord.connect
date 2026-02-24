
export interface SystemNode {
  id: string;
  name: string;
  type: 'clinic' | 'lab' | 'pharmacy' | 'telemedicine' | 'identity';
  status: 'connected' | 'syncing' | 'error' | 'offline';
  lastSync: string;
  healthScore: number;
  region: string;
  coordinates?: { x: number; y: number };
  ipAddress?: string;
  version?: string;
  latency?: number;
}

export interface ActivityLog {
  id: string;
  type: 'data_transfer' | 'consent_update' | 'alert' | 'system';
  message: string;
  timestamp: string;
  source: string;
  status: 'success' | 'warning' | 'error';
}

export interface Metric {
  label: string;
  value: string;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export enum ViewState {
  DASHBOARD = 'dashboard',
  SYSTEMS = 'systems',
  IDENTITY = 'identity',
  ANALYTICS = 'analytics',
  SETTINGS = 'settings',
  CLINIC = 'clinic',
  LAB = 'lab',
  PHARMACY = 'pharmacy',
  TELEMEDICINE = 'telemedicine',
  DEVELOPER = 'developer'
}

export type Language = 'EN' | 'YOR' | 'IGB' | 'HAU';

export type UserRole = 'admin' | 'clinician' | 'lab_tech' | 'pharmacist' | 'telemedicine' | 'regulator' | 'developer' | 'patient';

// New types for Consent Management
export type DataScope = 'demographics' | 'clinical_notes' | 'medications' | 'lab_results' | 'genomics' | 'mental_health';

export type AccessDuration = '24h' | '7d' | '30d' | 'forever';

export interface ConsentScope {
  key: DataScope;
  label: string;
  enabled: boolean;
  sensitive: boolean;
  duration: AccessDuration;
}

export interface ConsentRecord {
  id: string;
  providerName: string;
  providerType: SystemNode['type'] | 'research';
  trustScore: number;
  lastAccess: string;
  scopes: ConsentScope[];
  status: 'active' | 'revoked' | 'pending' | 'expired';
}

// Clinical Types
export interface Patient {
  id: string;
  did: string; // Decentralized ID
  name: string;
  dob: string;
  gender: string;
  bloodType: string;
  allergies: string[];
  lastVisit: string;
  status: 'active' | 'archived';
  fhirCompliant?: boolean;
}

export interface ClinicalNote {
  id: string;
  date: string;
  provider: string;
  role: string;
  type: 'visit' | 'prescription' | 'referral' | 'lab_order';
  title: string;
  content: string;
  signedAt: string;
  signatureHash: string;
  verified: boolean;
  fhirCompliant?: boolean;
  fhirIssues?: string[];
}

export interface VitalSign {
  type: 'heart_rate' | 'blood_pressure' | 'temperature' | 'sp02' | 'weight';
  value: string;
  unit: string;
  timestamp: string;
  status: 'normal' | 'warning' | 'critical';
}

// Lab Types
export interface LabOrder {
  id: string;
  patientName: string;
  patientId: string;
  requester: string;
  testName: string;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'processing' | 'completed';
  receivedAt: string;
  specimenId: string;
}

export interface LabResultAnalyte {
  id: string;
  name: string;
  value: string;
  unit: string;
  range: string;
  flag: 'normal' | 'abnormal' | 'critical';
  history: { date: string; value: number }[]; // For trend analysis
}

// Pharmacy Types
export interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  provider: string;
  medication: string;
  genericName?: string;
  dosage: string;
  instructions: string;
  date: string;
  status: 'pending' | 'verified' | 'filled' | 'flagged';
  type: 'new' | 'refill';
  refillsRemaining: number;
  interactions?: { type: 'drug' | 'allergy' | 'condition'; severity: 'high' | 'moderate' | 'low'; description: string }[];
  isControlled?: boolean;
}

// Telemedicine Types
export interface TeleConsultation {
  id: string;
  patientName: string;
  patientId: string;
  scheduledTime: string;
  status: 'scheduled' | 'waiting' | 'in-progress' | 'completed';
  reason: string;
  remoteVitals?: {
    heartRate: number;
    spo2: number;
    bloodPressure?: string;
    deviceStatus: 'connected' | 'offline';
    lastUpdate: string;
  };
  symptoms: string[];
}
