# Models in prisma/schema/healthcare.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `HealthScoreConfig` | yes | no | 7 | 0 | 2 | tenant signal |
| `AppointmentSchedule` | yes | no | 1 | 0 | 5 | tenant signal |
| `HealthcarePatient` | yes | no | 0 | 0 | 1 | tenant signal |
| `HealthcarePractitioner` | yes | no | 0 | 0 | 2 | tenant signal |
| `HealthcareAppointment` | yes | no | 0 | 0 | 5 | tenant signal |
| `HealthcarePrescription` | yes | no | 0 | 0 | 3 | tenant signal |
| `HealthcareEncounter` | yes | no | 1 | 0 | 3 | tenant signal |
| `HealthcareDrug` | yes | no | 0 | 0 | 3 | tenant signal |
| `HealthcareVital` | yes | no | 1 | 0 | 3 | tenant signal |
| `HealthcareFhirResource` | yes | no | 0 | 0 | 3 | tenant signal |
| `HealthcarePatientAllergy` | yes | no | 0 | 0 | 2 | tenant signal |
| `HealthcareAppointmentSchedule` | yes | no | 0 | 0 | 3 | tenant signal |
| `HealthcarePrescriptionItem` | yes | no | 0 | 0 | 2 | tenant signal |
| `HealthcareLabOrder` | yes | no | 0 | 0 | 4 | tenant signal |
| `HealthcareLabResult` | yes | no | 0 | 0 | 2 | tenant signal |
| `HealthcareInsurancePolicy` | yes | no | 3 | 0 | 2 | tenant signal |
| `HealthcareInsuranceClaim` | yes | no | 3 | 0 | 3 | tenant signal |
| `HealthcarePharmacyBatch` | yes | no | 1 | 0 | 4 | tenant signal |
| `HealthcareControlledSubstanceLog` | yes | no | 0 | 0 | 3 | tenant signal |
| `HealthcareDoctorSchedule` | yes | no | 0 | 0 | 2 | tenant signal |
| `HealthcareMedicalRecord` | yes | no | 0 | 0 | 3 | tenant signal |
| `HealthcareClinicalNote` | yes | no | 0 | 0 | 3 | tenant signal |
| `HealthcareTelemedicineSession` | yes | no | 0 | 0 | 3 | tenant signal |
| `HealthcareMedicalBill` | yes | no | 3 | 0 | 4 | tenant signal |

