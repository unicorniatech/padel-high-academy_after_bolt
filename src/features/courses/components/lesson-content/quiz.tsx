import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuizQuestion } from '@/lib/supabase/types';
import { toast } from 'sonner';
import { i18n } from '@/lib/i18n';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast.error(i18n.t('courses.quiz.selectAnswer'));
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        totalScore += question.points;
      }
    });

    setScore(totalScore);
    setIsCompleted(true);
    onComplete(totalScore);
  };

  if (isCompleted) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">
          {i18n.t('courses.quiz.completed')}
        </h3>
        <p className="text-lg mb-2">
          {i18n.t('courses.quiz.score', { score: score.toString() })}
        </p>
        <Button onClick={() => setCurrentQuestion(0)}>
          {i18n.t('courses.quiz.review')}
        </Button>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {i18n.t('courses.quiz.question', { 
              current: (currentQuestion + 1).toString(),
              total: questions.length.toString()
            })}
          </h3>
          <span className="text-sm text-muted-foreground">
            {question.points} {i18n.t('courses.quiz.points')}
          </span>
        </div>
        <p className="text-lg mb-4">{question.text}</p>
      </div>

      <RadioGroup
        value={answers[currentQuestion]}
        onValueChange={handleAnswer}
        className="space-y-3"
      >
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleNext}>
          {currentQuestion < questions.length - 1
            ? i18n.t('common.next')
            : i18n.t('common.finish')}
        </Button>
      </div>
    </Card>
  );
}