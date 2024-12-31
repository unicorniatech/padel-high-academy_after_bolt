import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoUrl: string;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}

export function VideoPlayer({ videoUrl, onProgress, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = document.querySelector('video');
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
      onProgress(currentProgress);

      if (currentProgress >= 95) {
        onComplete();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', () => setDuration(video.duration));

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onProgress, onComplete]);

  const togglePlay = () => {
    const video = document.querySelector('video');
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const restart = () => {
    const video = document.querySelector('video');
    if (!video) return;
    
    video.currentTime = 0;
    setProgress(0);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <video
          className="w-full"
          src={videoUrl}
          controls={false}
          playsInline
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 p-4">
          <Progress value={progress} className="mb-2" />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={restart}
                className="text-white hover:bg-white/20"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-sm text-white">
              {formatTime(progress * duration / 100)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}