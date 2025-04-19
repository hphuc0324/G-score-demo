import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ScoreCardProps {
  subject: string;
  score: any;
}

function ScoreCard({ subject, score }: ScoreCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{subject}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="w-full text-end font-bold text-3xl">{score}</p>
      </CardContent>
    </Card>
  );
}

export default ScoreCard;
