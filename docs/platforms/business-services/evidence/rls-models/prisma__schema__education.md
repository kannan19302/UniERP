# Tenant model to RLS migration linkage: prisma/schema/education.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `EducationStudent` | `education_students` | yes | no | RLS LINK GAP |
| `EducationCourse` | `education_courses` | yes | no | RLS LINK GAP |
| `EducationFeeStructure` | `education_fee_structures` | yes | no | RLS LINK GAP |
| `StudentFee` | `student_fees` | yes | no | RLS LINK GAP |
| `EducationBook` | `education_books` | yes | no | RLS LINK GAP |
| `EducationAttendanceRecord` | `education_attendance_records` | yes | no | RLS LINK GAP |
| `EducationTimetable` | `education_timetables` | yes | no | RLS LINK GAP |
| `EducationParent` | `education_parents` | yes | no | RLS LINK GAP |
| `EducationStudentParent` | `education_student_parents` | yes | no | RLS LINK GAP |
| `EducationEnrollment` | `education_enrollments` | yes | no | RLS LINK GAP |
| `EducationCourseModule` | `education_course_modules` | yes | no | RLS LINK GAP |
| `EducationGradebook` | `education_gradebooks` | yes | no | RLS LINK GAP |
| `EducationGradeEntry` | `education_grade_entries` | yes | no | RLS LINK GAP |
| `EducationAttendance` | `education_attendances` | yes | no | RLS LINK GAP |
| `EducationFeeInvoice` | `education_fee_invoices` | yes | no | RLS LINK GAP |
| `EducationFeePayment` | `education_fee_payments` | yes | no | RLS LINK GAP |
| `EducationLibraryFine` | `education_library_fines` | yes | no | RLS LINK GAP |
| `EducationExamSchedule` | `education_exam_schedules` | yes | no | RLS LINK GAP |
| `EducationExamResult` | `education_exam_results` | yes | no | RLS LINK GAP |
| `EducationReportCard` | `education_report_cards` | yes | no | RLS LINK GAP |
| `EducationScholarship` | `education_scholarships` | yes | no | RLS LINK GAP |
| `EducationAssignmentSubmission` | `education_assignment_submissions` | yes | no | RLS LINK GAP |

