import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { QuizQuestion } from '@/lib/supabase/types';
import { i18n } from '@/lib/i18n';

interface QuizFormData {
  title: string;
  description: string;
  passing_score: number;
  max_attempts: number;
  questions: QuizQuestion[];
}

interface QuizFormProps {
  initialData?: Partial<QuizFormData>;
  onSubmit: (data: QuizFormData) => Promise<void>;
  isLoading?: boolean;
}

export function QuizForm({ initialData, onSubmit, isLoading }: QuizFormProps) {
  const [formData, setFormData] = useState<QuizFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    passing_score: initialData?.passing_score || 70,
    max_attempts: initialData?.max_attempts || 3,
    questions: initialData?.questions || [],
  });

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          id: crypto.randomUUID(),
          text: '',
          type: 'multiple_choice',
          options: ['', ''],
          correct_answer: '',
          points: 10,
        },
      ],
    });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateQuestion = (index: number, updates: Partial<QuizQuestion>) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], ...updates };
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">{i18n.t('courses.quiz.title')}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">{i18n.t('courses.quiz.description')}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="passing_score">
                  {i18n.t('courses.quiz.passingScore')}
                </Label>
                <Input
                  id="passing_score"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.passing_score}
                  onChange={(e) => setFormData({ ...formData, passing_score: parseInt(e.target.value) })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="max_attempts">
                  {i18n.t('courses.quiz.maxAttempts')}
                </Label>
                <Input
                  id="max_attempts"
                  type="number"
                  min="1"
                  value={formData.max_attempts}
                  onChange={(e) => setFormData({ ...formData, max_attempts: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {i18n.t('courses.quiz.questions')}
              </h3>
              <Button type="button" onClick={addQuestion} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                {i18n.t('courses.quiz.addQuestion')}
              </Button>
            </div>

            {formData.questions.map((question, index) => (
              <Card key={question.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      <Input
                        value={question.text}
                        onChange={(e) => updateQuestion(index, { text: e.target.value })}
                        placeholder={i18n.t('courses.quiz.questionText')}
                        required
                      />
                      
                      {question.options?.map((option, optionIndex) => (
                        <Input
                          key={optionIndex}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...question.options!];
                            newOptions[optionIndex] = e.target.value;
                            updateQuestion(index, { options: newOptions });
                          }}
                          placeholder={`${i18n.t('courses.quiz.option')} ${optionIndex + 1}`}
                          required
                        />
                      ))}

                      <Input
                        value={question.correct_answer as string}
                        onChange={(e) => updateQuestion(index, { correct_answer: e.target.value })}
                        placeholder={i18n.t('courses.quiz.correctAnswer')}
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQuestion(index)}
                      className="ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="animate-pulse">{i18n.t('common.saving')}</span>
          ) : (
            i18n.t('common.save')
          )}
        </Button>
      </Card>
    </form>
  );
}