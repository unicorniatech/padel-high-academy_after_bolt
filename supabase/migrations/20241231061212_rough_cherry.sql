/*
  # Enhanced LMS with Gamification

  1. New Tables
    - `modules`
      - Course modules for better organization
    - `achievements`
      - Unlockable achievements and badges
    - `quizzes`
      - Assessment tools
    - `user_points`
      - Point tracking system
    - `learning_paths`
      - Structured learning journeys

  2. Security
    - Enable RLS on all tables
    - Policies for achievement tracking
*/

-- Modules table for course organization
CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id),
  title text NOT NULL,
  description text,
  sort_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Update lessons to reference modules
ALTER TABLE lessons ADD COLUMN module_id uuid REFERENCES modules(id);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  points integer NOT NULL DEFAULT 0,
  requirement_type text NOT NULL,
  requirement_value jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- User achievements tracking
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  achievement_id uuid NOT NULL REFERENCES achievements(id),
  unlocked_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Quizzes for lessons
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES lessons(id),
  title text NOT NULL,
  description text,
  passing_score integer NOT NULL DEFAULT 70,
  max_attempts integer NOT NULL DEFAULT 3,
  questions jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quiz attempts tracking
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES quizzes(id),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  score integer NOT NULL,
  answers jsonb NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now()
);

-- User points system
CREATE TABLE IF NOT EXISTS user_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  points integer NOT NULL DEFAULT 0,
  level integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Learning paths
CREATE TABLE IF NOT EXISTS learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  courses jsonb NOT NULL, -- Array of course IDs in order
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Modules: Viewable by enrolled students
CREATE POLICY "Modules are viewable by enrolled students"
  ON modules FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE user_id = auth.uid()
      AND course_id = modules.course_id
    )
  );

-- Achievements: Viewable by everyone
CREATE POLICY "Achievements are viewable by everyone"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- User Achievements: Users can view their own
CREATE POLICY "Users can view their own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Quizzes: Available to enrolled students
CREATE POLICY "Quizzes are available to enrolled students"
  ON quizzes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN enrollments ON lessons.course_id = enrollments.course_id
      WHERE lessons.id = quizzes.lesson_id
      AND enrollments.user_id = auth.uid()
    )
  );

-- Quiz Attempts: Users can view their own attempts
CREATE POLICY "Users can view their own quiz attempts"
  ON quiz_attempts FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- User Points: Users can view their own points
CREATE POLICY "Users can view their own points"
  ON user_points FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Learning Paths: Viewable by everyone
CREATE POLICY "Learning paths are viewable by everyone"
  ON learning_paths FOR SELECT
  TO authenticated
  USING (true);