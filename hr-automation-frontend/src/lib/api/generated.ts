// Auto-generated types from OpenAPI spec
// Run: npm run generate:types to regenerate

export interface paths {
  // ==================== AUTHENTICATION ====================
  '/auth/signup/': {
    post: {
      requestBody: {
        content: {
          'application/json': components['schemas']['UserSignupRequest'];
        };
      };
      responses: {
        201: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        400: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        500: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/auth/login/': {
    post: {
      requestBody: {
        content: {
          'application/json': components['schemas']['UserLoginRequest'];
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        401: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        403: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        500: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/auth/logout/': {
    post: {
      parameters: {
        header: { 'user-id': string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        401: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        500: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/health/': {
    get: {
      responses: {
        200: {
          content: {
            'application/json': components['schemas']['HealthResponse'];
          };
        };
      };
    };
  };
  '/companies/register/': {
    post: {
      parameters: {
        header: {
          'workspace-id': string;
          'user-id': string;
        };
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['CompanyCreateRequest'];
        };
      };
      responses: {
        201: {
          content: {
            'application/json': components['schemas']['ApiResponse'];
          };
        };
        400: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        409: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        500: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/companies/{company_id}/': {
    get: {
      parameters: {
        path: { company_id: string };
        header: { 'workspace-id': string; 'user-id': string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
    put: {
      parameters: {
        path: { company_id: string };
        header: { 'workspace-id': string; 'user-id': string };
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['CompanyUpdateRequest'];
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        500: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
    delete: {
      parameters: {
        path: { company_id: string };
        header: { 'workspace-id': string; 'user-id': string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        500: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/companies/': {
    get: {
      parameters: {
        header: { 'workspace-id': string; 'user-id': string };
        query: { offset?: number; limit?: number; order_by?: string; search?: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['PaginatedResponse'] } };
      };
    };
  };
  '/companies/{company_id}/job-requirements/': {
    post: {
      parameters: {
        path: { company_id: string };
        header: { 'workspace-id': string; 'user-id': string };
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['JobRequirementCreateRequest'];
        };
      };
      responses: {
        201: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
    get: {
      parameters: {
        path: { company_id: string };
        header: { 'workspace-id': string; 'user-id': string };
        query: { status?: string; offset?: number; limit?: number };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['PaginatedResponse'] } };
      };
    };
  };
  '/job-requirements/{job_requirement_id}/': {
    get: {
      parameters: {
        path: { job_requirement_id: string };
        header: { 'workspace-id': string; 'user-id': string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
    put: {
      parameters: {
        path: { job_requirement_id: string };
        header: { 'workspace-id': string; 'user-id': string };
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['JobRequirementUpdateRequest'];
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
    delete: {
      parameters: {
        path: { job_requirement_id: string };
        header: { 'workspace-id': string; 'user-id': string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/job-requirements/{job_requirement_id}/status/': {
    patch: {
      parameters: {
        path: { job_requirement_id: string };
        header: { 'workspace-id': string; 'user-id': string };
      };
      requestBody: {
        content: {
          'application/json': { status: string };
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/job-requirements/': {
    get: {
      parameters: {
        header: { 'workspace-id': string; 'user-id': string };
        query: { status?: string; offset?: number; limit?: number; search?: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['PaginatedResponse'] } };
      };
    };
  };
  '/candidates/apply/{job_requirement_id}': {
    get: {
      parameters: {
        path: { job_requirement_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/candidates/apply': {
    post: {
      requestBody: {
        content: {
          'multipart/form-data': components['schemas']['CandidateApplicationRequest'];
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        409: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/candidates/{candidate_id}': {
    get: {
      parameters: {
        path: { candidate_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/candidates/': {
    get: {
      parameters: {
        query: {
          job_requirement_id?: string;
          page?: number;
          limit?: number;
          status?: string;
          search?: string;
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['PaginatedResponse'] } };
      };
    };
  };
  '/candidates/select-top-resumes/{job_requirement_id}': {
    post: {
      parameters: {
        path: { job_requirement_id: string };
        query: { top_n?: number };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/aptitude/generate-test/{job_requirement_id}': {
    get: {
      parameters: {
        path: { job_requirement_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/aptitude/create/{job_requirement_id}': {
    post: {
      parameters: {
        path: { job_requirement_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/aptitude/generate-test-form/{job_requirement_id}/{aptitude_test_id}': {
    get: {
      parameters: {
        path: { job_requirement_id: string; aptitude_test_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/aptitude/generate-login-form/{job_requirement_id}/{aptitude_test_id}': {
    get: {
      parameters: {
        path: { job_requirement_id: string; aptitude_test_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/aptitude/validate-login/{job_requirement_id}/{aptitude_test_id}': {
    post: {
      parameters: {
        path: { job_requirement_id: string; aptitude_test_id: string };
      };
      requestBody: {
        content: {
          'application/json': { email: string; password: string };
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        403: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/aptitude/submit-test': {
    post: {
      requestBody: {
        content: {
          'application/json': components['schemas']['TestAnswerSubmit'];
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/aptitude/select-top-candidates': {
    post: {
      parameters: {
        query: { job_requirement_id: string; aptitude_test_id: string; top_n?: number };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/technical-interview/start/{candidate_id}': {
    post: {
      parameters: {
        path: { candidate_id: string };
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['TechnicalInterviewLoginRequest'];
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        401: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        403: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/technical-interview/complete/{technical_interview_id}': {
    post: {
      parameters: {
        path: { technical_interview_id: string };
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['CompleteInterviewRequest'];
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/technical-interview/session/{session_id}': {
    get: {
      parameters: {
        path: { session_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/technical-interview/job/{job_requirement_id}/interviews': {
    get: {
      parameters: {
        path: { job_requirement_id: string };
        query: { status?: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/technical-interview/job/{job_requirement_id}/statistics': {
    get: {
      parameters: {
        path: { job_requirement_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/technical-interview/select-top-candidates': {
    post: {
      parameters: {
        query: { job_requirement_id: string; top_n?: number };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/technical-interview/candidate/{candidate_id}/status': {
    get: {
      parameters: {
        path: { candidate_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/technical-interview/{technical_interview_id}': {
    get: {
      parameters: {
        path: { technical_interview_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/hr-interview/start/{candidate_id}': {
    post: {
      parameters: {
        path: { candidate_id: string };
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['HRInterviewLoginRequest'];
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        403: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/hr-interview/complete/{hr_interview_id}': {
    post: {
      parameters: {
        path: { hr_interview_id: string };
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['CompleteHRInterviewRequest'];
        };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/hr-interview/session/{session_id}': {
    get: {
      parameters: {
        path: { session_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/hr-interview/job/{job_requirement_id}/interviews': {
    get: {
      parameters: {
        path: { job_requirement_id: string };
        query: { status?: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/hr-interview/job/{job_requirement_id}/statistics': {
    get: {
      parameters: {
        path: { job_requirement_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/hr-interview/select-top-candidates': {
    post: {
      parameters: {
        query: { job_requirement_id: string; top_n?: number };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/hr-interview/candidate/{candidate_id}/status': {
    get: {
      parameters: {
        path: { candidate_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
        404: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
  '/hr-interview/{hr_interview_id}': {
    get: {
      parameters: {
        path: { hr_interview_id: string };
      };
      responses: {
        200: { content: { 'application/json': components['schemas']['ApiResponse'] } };
      };
    };
  };
}

export interface components {
  schemas: {
    HealthResponse: {
      success: boolean;
      data: Record<string, unknown>;
      message: string;
    };
    // ==================== AUTH SCHEMAS ====================
    UserSignupRequest: {
      username: string;
      email: string;
      password: string;
    };
    UserLoginRequest: {
      email: string;
      password: string;
    };
    UserResponse: {
      user_id: string;
      username: string;
      email: string;
      workspace_id: string;
      is_active: boolean;
      is_logged_in: boolean;
      last_login_at: string | null;
      created_at: string;
      updated_at: string | null;
    };
    LoginResponse: {
      user_id: string;
      username: string;
      email: string;
      workspace_id: string;
      access_token: string;
      token_type: string;
    };
    ApiResponse: {
      success: boolean;
      data: Record<string, unknown>;
      message: string;
    };
    PaginatedResponse: {
      success: boolean;
      data: unknown[];
      pagination: components['schemas']['PaginationMeta'];
      message: string;
    };
    PaginationMeta: {
      total_count: number;
      offset: number;
      limit: number;
      total_pages: number;
    };
    AddressSchema: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      zip_code?: string;
    };
    CompanyCreateRequest: {
      company_name: string;
      email: string;
      password: string;
      industry: string;
      size: string;
      website?: string;
      address?: components['schemas']['AddressSchema'];
      phone?: string;
      logo?: string;
      subscription_plan?: string;
    };
    CompanyUpdateRequest: {
      company_name?: string;
      industry?: string;
      size?: string;
      website?: string;
      address?: components['schemas']['AddressSchema'];
      phone?: string;
      logo?: string;
      subscription_plan?: string;
      is_active?: boolean;
    };
    SkillRequirementSchema: {
      skill: string;
      level: string;
      required?: boolean;
    };
    ExperienceSchema: {
      min_years?: number;
      max_years?: number;
      preferred?: number;
    };
    SalaryRangeSchema: {
      min: number;
      max: number;
      currency?: string;
    };
    JobRequirementCreateRequest: {
      title: string;
      description: string;
      department?: string;
      location?: string;
      job_type?: string;
      requirements: components['schemas']['SkillRequirementSchema'][];
      experience?: components['schemas']['ExperienceSchema'];
      salary_range?: components['schemas']['SalaryRangeSchema'];
      benefits?: string[];
      status?: string;
    };
    JobRequirementUpdateRequest: {
      title?: string;
      description?: string;
      department?: string;
      location?: string;
      job_type?: string;
      requirements?: components['schemas']['SkillRequirementSchema'][];
      experience?: components['schemas']['ExperienceSchema'];
      salary_range?: components['schemas']['SalaryRangeSchema'];
      benefits?: string[];
      status?: string;
    };
    CandidateApplicationRequest: {
      job_requirement_id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone?: string;
      resume: File;
      cover_letter?: string;
      linkedin_url?: string;
      portfolio_url?: string;
    };
    TestAnswerSubmit: {
      attempt_id: string;
      answers: Record<string, string>;
      time_taken_seconds: number;
    };
    TechnicalInterviewLoginRequest: {
      job_requirement_id: string;
      email: string;
      password: string;
    };
    HRInterviewLoginRequest: {
      job_requirement_id: string;
      email: string;
      password: string;
    };
    CompleteInterviewRequest: {
      interview_duration_seconds: number;
      transcript: string;
      technical_score?: number;
      problem_solving_score?: number;
      communication_score?: number;
      overall_score?: number;
      result: string;
      ai_analysis?: string;
      strengths?: string[];
      weaknesses?: string[];
      recommendation?: string;
    };
    CompleteHRInterviewRequest: {
      interview_duration_seconds: number;
      transcript: string;
      cultural_fit_score?: number;
      communication_score?: number;
      motivation_score?: number;
      overall_score?: number;
      result: string;
      ai_analysis?: string;
      strengths?: string[];
      weaknesses?: string[];
      recommendation?: string;
    };
  };
}

// Custom types for the application
export interface Company {
  company_id: string;
  company_name: string;
  email: string;
  industry: string;
  size: string;
  website?: string;
  address?: components['schemas']['AddressSchema'];
  phone?: string;
  logo?: string;
  subscription_plan?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobRequirement {
  job_requirement_id: string;
  company_id: string;
  title: string;
  description: string;
  department?: string;
  location?: string;
  job_type?: string;
  requirements: components['schemas']['SkillRequirementSchema'][];
  experience?: components['schemas']['ExperienceSchema'];
  salary_range?: components['schemas']['SalaryRangeSchema'];
  benefits?: string[];
  status: 'draft' | 'active' | 'paused' | 'closed';
  candidates_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  candidate_id: string;
  job_requirement_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  resume_url?: string;
  resume_score?: number;
  status: CandidateStatus;
  password?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  created_at: string;
  updated_at: string;
}

export type CandidateStatus =
  | 'applied'
  | 'resume_screened'
  | 'aptitude_eligible'
  | 'aptitude_passed'
  | 'aptitude_failed'
  | 'technical_eligible'
  | 'technical_passed'
  | 'technical_failed'
  | 'hr_eligible'
  | 'hr_passed'
  | 'hr_failed'
  | 'hire_recommended'
  | 'rejected';

export interface AptitudeTest {
  aptitude_test_id: string;
  job_requirement_id: string;
  questions_count: number;
  duration_minutes: number;
  created_at: string;
}

export interface AptitudeAttempt {
  attempt_id: string;
  aptitude_test_id: string;
  candidate_id: string;
  score?: number;
  status: 'pending' | 'in_progress' | 'completed';
  started_at?: string;
  completed_at?: string;
}

export interface TechnicalInterview {
  technical_interview_id: string;
  candidate_id: string;
  job_requirement_id: string;
  session_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  technical_score?: number;
  problem_solving_score?: number;
  communication_score?: number;
  overall_score?: number;
  result?: 'pass' | 'fail';
  transcript?: string;
  ai_analysis?: string;
  strengths?: string[];
  weaknesses?: string[];
  recommendation?: string;
  duration_seconds?: number;
  started_at?: string;
  completed_at?: string;
}

export interface HRInterview {
  hr_interview_id: string;
  candidate_id: string;
  job_requirement_id: string;
  session_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  cultural_fit_score?: number;
  communication_score?: number;
  motivation_score?: number;
  overall_score?: number;
  result?: 'pass' | 'fail';
  transcript?: string;
  ai_analysis?: string;
  strengths?: string[];
  weaknesses?: string[];
  recommendation?: string;
  duration_seconds?: number;
  started_at?: string;
  completed_at?: string;
}

export interface TranscriptEntry {
  id: string;
  role: 'interviewer' | 'candidate';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}
