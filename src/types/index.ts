export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  thumbnail: string;
}

export interface Booking {
  id: string;
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
  userId: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserProgress {
  coursesCompleted: number;
  certificationsEarned: number;
  totalPlayTime: number;
  skillLevel: string;
}