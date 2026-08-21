# Tenant model to RLS migration linkage: prisma/schema/hr.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `Employee` | `employees` | yes | no | RLS LINK GAP |
| `EmployeeDocument` | `employee_documents` | yes | no | RLS LINK GAP |
| `EmployeeSkill` | `employee_skills` | yes | no | RLS LINK GAP |
| `PayrollRun` | `payroll_runs` | yes | no | RLS LINK GAP |
| `PayrollSlip` | `payroll_slips` | yes | no | RLS LINK GAP |
| `LeavePolicy` | `leave_policies` | yes | no | RLS LINK GAP |
| `LeaveRequest` | `leave_requests` | yes | no | RLS LINK GAP |
| `EmployeeBenefit` | `employee_benefits` | yes | no | RLS LINK GAP |
| `EmployeeAchievement` | `employee_achievements` | yes | no | RLS LINK GAP |
| `EmployeeReferral` | `employee_referrals` | yes | no | RLS LINK GAP |
| `EmployeeEducation` | `employee_education` | yes | no | RLS LINK GAP |
| `EmployeeDependent` | `employee_dependents` | yes | no | RLS LINK GAP |
| `EmployeeEmergencyContact` | `employee_emergency_contacts` | yes | no | RLS LINK GAP |
| `HrExpenseClaim` | `hr_expense_claims` | yes | no | RLS LINK GAP |
| `HrExpenseClaimItem` | `hr_expense_claim_items` | yes | no | RLS LINK GAP |
| `EmployeePromotion` | `employee_promotions` | yes | no | RLS LINK GAP |
| `EmployeeSeparation` | `employee_separations` | yes | no | RLS LINK GAP |
| `EmployeeWarning` | `employee_warnings` | yes | no | RLS LINK GAP |
| `HrPolicy` | `hr_policies` | yes | no | RLS LINK GAP |
| `HrPolicyAcknowledgment` | `hr_policy_acknowledgments` | yes | no | RLS LINK GAP |
| `HrAnnouncement` | `hr_announcements` | yes | no | RLS LINK GAP |
| `PayrollTaxEntry` | `payroll_tax_entries` | yes | no | RLS LINK GAP |
| `PayrollContribution` | `payroll_contributions` | yes | no | RLS LINK GAP |
| `HrTicketCategory` | `hr_ticket_categories` | yes | no | RLS LINK GAP |
| `HrTicket` | `hr_advanced_tickets` | yes | no | RLS LINK GAP |
| `HrTicketAssignment` | `hr_ticket_assignments` | yes | no | RLS LINK GAP |
| `EmployeeGrievance` | `employee_grievances` | yes | no | RLS LINK GAP |
| `EmployeeWellnessProgram` | `employee_wellness_programs` | yes | no | RLS LINK GAP |
| `HrHeadcountPlan` | `hr_headcount_plans` | yes | no | RLS LINK GAP |
| `HrHeadcountPlanLine` | `hr_headcount_plan_lines` | yes | no | RLS LINK GAP |
| `HrSuccessionPlan` | `hr_succession_plans` | yes | no | RLS LINK GAP |
| `HrSuccessionCandidate` | `hr_succession_candidates` | yes | no | RLS LINK GAP |
| `EmployeeRecognition` | `employee_recognitions` | yes | no | RLS LINK GAP |
| `EmployeeRecognitionAward` | `employee_recognition_awards` | yes | no | RLS LINK GAP |
| `HrSurveyResponse` | `hr_survey_responses` | yes | no | RLS LINK GAP |
| `EmployeeJourneyMilestone` | `employee_journey_milestones` | yes | no | RLS LINK GAP |

