import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 1.5 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 2 },
  { day: 'Fri', hours: 2.5 },
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 1 },
];

export function WeeklyProgress() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold">Weekly Training Progress</h3>
      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}