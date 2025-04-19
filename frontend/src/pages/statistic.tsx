import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useMemo, useState } from "react";
import { Statistic } from "@/types/dtos";
import { Subject } from "@/enums/common";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import scoreApi from "@/api/score-api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  score: {
    label: "Amount",
    color: "#2a9d90",
  },
} satisfies ChartConfig;

function StatisticPage() {
  const [data, setData] = useState<Statistic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subject, setSubject] = useState<string>(Subject.MATH);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await scoreApi.getStatistic(subject);
        setData(res.data.data.count);
      } catch (error: AxiosError | any) {
        if (error.response) {
          toast.error(<p>{error.response.data.message}</p>);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subject]);

  const chartData = useMemo(
    () => [
      { level: "poor", score: data?.poor, description: "< 4" },
      { level: "average", score: data?.average, description: "≥ 4 and < 6" },
      { level: "good", score: data?.good, description: "≥ 6 and < 8" },
      { level: "excelent", score: data?.excellent, description: "≥ 8" },
    ],
    [data]
  );

  return (
    <div className="w-full max-w-[1400px] h-full md:px-8 px-4">
      <p className="w-full text-start text-lg font-bold">Statistics</p>

      <p className="text-start">
        The G-Score is a measure of a student's performance in the Vietnam's .
        It is calculated based on the student's performance in various subjects,
        including math, chemistry...
      </p>
      <div className="md:flex justify-center my-8 gap-4">
        <Select value={subject} onValueChange={(value) => setSubject(value)}>
          <SelectTrigger className="w-[180px] mb-2">
            <SelectValue placeholder="Change subject" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Subject).map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Card className="w-full max-w-[600px] mx-auto">
          <CardHeader>
            <CardTitle>G-Score Statistics</CardTitle>
            <CardDescription>
              {subject.charAt(0).toUpperCase() + subject.slice(1)} Statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!loading && (
              <ChartContainer config={chartConfig} className="max-w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="level"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value, index) => {
                      const item = chartData[index];
                      return `${value} (${item?.description})`;
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="score" fill="#2a9d90" radius={8}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}

            {loading && (
              <div className="w-full grid grid-cols-4 gap-6 h-52 mt-20 items-end">
                <Skeleton className="rounded-xl h-44" />
                <Skeleton className="rounded-xl h-50" />
                <Skeleton className="rounded-xl h-32" />
                <Skeleton className="rounded-xl h-20" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StatisticPage;
