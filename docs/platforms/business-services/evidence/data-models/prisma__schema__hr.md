# Models in prisma/schema/hr.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `Employee` | yes | yes | 0 | 0 | 2 | tenant signal |
| `EmployeeDocument` | yes | no | 0 | 0 | 2 | tenant signal |
| `EmployeeSkill` | yes | no | 0 | 0 | 2 | tenant signal |
| `PayrollRun` | yes | no | 3 | 0 | 1 | tenant signal |
| `PayrollSlip` | yes | no | 3 | 0 | 1 | tenant signal |
| `LeavePolicy` | yes | no | 0 | 0 | 2 | tenant signal |
| `LeaveRequest` | yes | no | 0 | 0 | 1 | tenant signal |
| `EmployeeBenefit` | yes | no | 1 | 0 | 2 | tenant signal |
| `EmployeeAchievement` | yes | no | 0 | 0 | 1 | tenant signal |
| `EmployeeReferral` | yes | no | 1 | 0 | 1 | tenant signal |
| `EmployeeEducation` | yes | no | 0 | 0 | 1 | tenant signal |
| `EmployeeDependent` | yes | no | 0 | 0 | 1 | tenant signal |
| `EmployeeEmergencyContact` | yes | no | 0 | 0 | 1 | tenant signal |
| `HrExpenseClaim` | yes | no | 1 | 0 | 1 | tenant signal |
| `HrExpenseClaimItem` | yes | no | 1 | 0 | 1 | tenant signal |
| `EmployeePromotion` | yes | no | 2 | 0 | 1 | tenant signal |
| `EmployeeSeparation` | yes | no | 1 | 0 | 1 | tenant signal |
| `EmployeeWarning` | yes | no | 0 | 0 | 1 | tenant signal |
| `HrPolicy` | yes | no | 0 | 0 | 1 | tenant signal |
| `HrPolicyAcknowledgment` | yes | no | 0 | 0 | 2 | tenant signal |
| `HrAnnouncement` | yes | no | 0 | 0 | 1 | tenant signal |
| `PayrollTaxEntry` | yes | no | 2 | 0 | 1 | tenant signal |
| `PayrollContribution` | yes | no | 2 | 0 | 1 | tenant signal |
| `HrTicketCategory` | yes | no | 0 | 0 | 1 | tenant signal |
| `HrTicket` | yes | no | 0 | 0 | 3 | tenant signal |
| `HrTicketAssignment` | yes | no | 0 | 0 | 2 | tenant signal |
| `EmployeeGrievance` | yes | no | 0 | 0 | 2 | tenant signal |
| `EmployeeWellnessProgram` | yes | no | 0 | 0 | 1 | tenant signal |
| `HrHeadcountPlan` | yes | no | 0 | 0 | 1 | tenant signal |
| `HrHeadcountPlanLine` | yes | no | 1 | 0 | 1 | tenant signal |
| `HrSuccessionPlan` | yes | no | 0 | 0 | 2 | tenant signal |
| `HrSuccessionCandidate` | yes | no | 0 | 0 | 2 | tenant signal |
| `EmployeeRecognition` | yes | no | 0 | 0 | 2 | tenant signal |
| `EmployeeRecognitionAward` | yes | no | 0 | 0 | 1 | tenant signal |
| `HrSurveyResponse` | yes | no | 0 | 0 | 3 | tenant signal |
| `EmployeeJourneyMilestone` | yes | no | 0 | 0 | 2 | tenant signal |

