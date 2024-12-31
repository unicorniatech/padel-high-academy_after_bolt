import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function getCourses({ 
  category, 
  level, 
  featured 
}: { 
  category?: string;
  level?: string;
  featured?: boolean;
}) {
  let query = supabase
    .from('courses')
    .select(`
      *,
      instructor:instructors(name, avatar_url),
      category:categories(name)
    `)
    .eq('published', true);

  if (category) query = query.eq('category_id', category);
  if (level) query = query.eq('level', level);
  if (featured) query = query.eq('featured', true);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getCourseBySlug(slug: string) {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      instructor:instructors(name, avatar_url, bio),
      category:categories(name),
      lessons:lessons(*)
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getEnrollments(userId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      course:courses(title, thumbnail_url)
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

export async function getLessonProgress(enrollmentId: string) {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('enrollment_id', enrollmentId);

  if (error) throw error;
  return data;
}

export async function updateLessonProgress(
  lessonProgressId: string,
  updates: { status: string; time_spent: number }
) {
  const { data, error } = await supabase
    .from('lesson_progress')
    .update(updates)
    .eq('id', lessonProgressId)
    .select()
    .single();

  if (error) throw error;
  return data;
}