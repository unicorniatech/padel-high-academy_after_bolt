// Add to existing types.ts file

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  requirement_type: string;
  requirement_value: Record<string, unknown>;
  created_at: string;
}

export interface Quiz {
  id: string;
  lesson_id: string;
  title: string;
  description: string | null;
  passing_score: number;
  max_attempts: number;
  questions: QuizQuestion[];
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false' | 'open_ended';
  options?: string[];
  correct_answer: string | string[];
  points: number;
}

export interface UserPoints {
  id: string;
  user_id: string;
  points: number;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  created_at: string;
  updated_at: string;
}