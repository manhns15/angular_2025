// Step 1 — Thông tin cá nhân
export interface Step1Model {
  fullName: string;
  email: string;
  phone: string;
}

// Step 2 — Kinh nghiệm làm việc (FormArray)
export interface WorkExperience {
  company: string;
  position: string;
  years: number;
}

export interface Step2Model {
  experiences: WorkExperience[];
}

// Step 3 — Confirm (readonly, merged)
export interface FormData {
  step1: Step1Model;
  step2: Step2Model;
}
