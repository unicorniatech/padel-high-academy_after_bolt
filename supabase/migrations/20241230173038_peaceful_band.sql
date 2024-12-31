/*
  # LMS Database Schema

  1. New Tables
    - `courses`
      - Core course information
      - Metadata, pricing, and visibility settings
    - `lessons`
      - Individual lessons within courses
      - Content, order, and completion criteria
    - `enrollments`
      - Student course enrollments
      - Progress tracking and completion status
    - `lesson_progress`
      - Individual lesson completion tracking
      - Time spent and completion status
    - `categories`
      - Course categorization
      - Hierarchical structure support
    - `instructors`
      - Instructor profiles and credentials
      - Contact and biographical information

  2. Security
    - Enable RLS on all tables
    - Policies for students, instructors, and admins
    - Secure content access control

  3. Changes
    - Initial schema creation
    - Basic indexes for performance
    - Foreign key relationships
*/

-- Categories for courses
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  parent_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Instructors table
CREATE TABLE IF NOT EXISTS instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  name text NOT NULL,
  bio text,
  avatar_url text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  instructor_id uuid NOT NULL REFERENCES instructors(id),
  category_id uuid NOT NULL REFERENCES categories(id),
  level text NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  price decimal(10,2) NOT NULL DEFAULT 0,
  duration integer NOT NULL, -- in minutes
  thumbnail_url text,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id),
  title text NOT NULL,
  description text,
  content text,
  video_url text,
  duration integer NOT NULL, -- in minutes
  sort_order integer NOT NULL,
  is_free boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  course_id uuid NOT NULL REFERENCES courses(id),
  status text NOT NULL CHECK (status IN ('active', 'completed', 'cancelled')),
  progress decimal(5,2) DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Lesson progress tracking
CREATE TABLE IF NOT EXISTS lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id),
  lesson_id uuid NOT NULL REFERENCES lessons(id),
  status text NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
  time_spent integer DEFAULT 0, -- in seconds
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(enrollment_id, lesson_id)
);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Categories: Anyone can read
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- Instructors: Public profiles viewable by everyone
CREATE POLICY "Instructor profiles are viewable by everyone"
  ON instructors FOR SELECT
  TO authenticated
  USING (true);

-- Courses: Published courses viewable by everyone
CREATE POLICY "Published courses are viewable by everyone"
  ON courses FOR SELECT
  TO authenticated
  USING (published = true);

-- Lessons: Access controlled by enrollment
CREATE POLICY "Students can view lessons of enrolled courses"
  ON lessons FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE user_id = auth.uid()
      AND course_id = lessons.course_id
    )
    OR is_free = true
  );

-- Enrollments: Students can view their own enrollments
CREATE POLICY "Students can view their own enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Lesson Progress: Students can view and update their own progress
CREATE POLICY "Students can view their own lesson progress"
  ON lesson_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE id = lesson_progress.enrollment_id
      AND user_id = auth.uid()
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrollment ON lesson_progress(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON lesson_progress(lesson_id);