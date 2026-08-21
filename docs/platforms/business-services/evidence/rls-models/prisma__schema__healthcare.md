# Tenant model to RLS migration linkage: prisma/schema/healthcare.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `HealthScoreConfig` | `health_score_configs` | yes | no | RLS LINK GAP |
| `AppointmentSchedule` | `appointment_schedules` | yes | no | RLS LINK GAP |
| `HealthcarePatient` | `healthcare_patients` | yes | no | RLS LINK GAP |
| `HealthcarePractitioner` | `healthcare_practitioners` | yes | no | RLS LINK GAP |
| `HealthcareAppointment` | `healthcare_appointments` | yes | no | RLS LINK GAP |
| `HealthcarePrescription` | `healthcare_prescriptions` | yes | no | RLS LINK GAP |
| `HealthcareEncounter` | `healthcare_encounters` | yes | no | RLS LINK GAP |
| `HealthcareDrug` | `healthcare_drugs` | yes | no | RLS LINK GAP |
| `HealthcareVital` | `healthcare_vitals` | yes | no | RLS LINK GAP |
| `HealthcareFhirResource` | `healthcare_fhir_resources` | yes | no | RLS LINK GAP |
| `HealthcarePatientAllergy` | `healthcare_patient_allergies` | yes | no | RLS LINK GAP |
| `HealthcareAppointmentSchedule` | `healthcare_appointment_schedules` | yes | no | RLS LINK GAP |
| `HealthcarePrescriptionItem` | `healthcare_prescription_items` | yes | no | RLS LINK GAP |
| `HealthcareLabOrder` | `healthcare_lab_orders` | yes | no | RLS LINK GAP |
| `HealthcareLabResult` | `healthcare_lab_results` | yes | no | RLS LINK GAP |
| `HealthcareInsurancePolicy` | `healthcare_insurance_policies` | yes | no | RLS LINK GAP |
| `HealthcareInsuranceClaim` | `healthcare_insurance_claims` | yes | no | RLS LINK GAP |
| `HealthcarePharmacyBatch` | `healthcare_pharmacy_batches` | yes | no | RLS LINK GAP |
| `HealthcareControlledSubstanceLog` | `healthcare_controlled_substance_logs` | yes | no | RLS LINK GAP |
| `HealthcareDoctorSchedule` | `healthcare_doctor_schedules` | yes | no | RLS LINK GAP |
| `HealthcareMedicalRecord` | `healthcare_medical_records` | yes | no | RLS LINK GAP |
| `HealthcareClinicalNote` | `healthcare_clinical_notes` | yes | no | RLS LINK GAP |
| `HealthcareTelemedicineSession` | `healthcare_telemedicine_sessions` | yes | no | RLS LINK GAP |
| `HealthcareMedicalBill` | `healthcare_medical_bills` | yes | no | RLS LINK GAP |

