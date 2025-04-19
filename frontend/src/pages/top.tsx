import { Group, GroupSubjects, Subject } from "@/enums/common";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TopScore } from "@/types/dtos";
import scoreApi from "@/api/score-api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

function TopScorePage() {
  const [group, setGroup] = useState<string>(Group.A1);
  const [data, setData] = useState<TopScore[]>([]);

  function toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await scoreApi.getTopScore(group);
        setData(res.data.data.topList);
      } catch (error: AxiosError | any) {
        if (error.response) {
          console.log(error);
          toast.error(<p>{error.response.data.message}</p>);
        }
      }
    };

    fetchData();
  }, [group]);

  return (
    <div className="w-full max-w-[1400px] h-full md:px-8 px-4 pb-8">
      <p className="w-full text-start text-lg font-bold">Top scores</p>

      <Select value={group} onValueChange={(value) => setGroup(value)}>
        <SelectTrigger className="w-[180px] my-2">
          <SelectValue placeholder="Change subject" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(Group).map((group) => (
            <SelectItem key={group} value={group}>
              {group}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full max-w-3xl mx-auto">
        <Table>
          <TableCaption>Top 10 students in {group} group.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              {GroupSubjects.find((t) => t.name === group)?.subjects.map(
                (subject: Subject) => (
                  <TableHead className="text-end" key={subject}>
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </TableHead>
                )
              )}

              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-start">
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {item.studentScore.id}
                </TableCell>
                {GroupSubjects.find((t) => t.name === group)?.subjects.map(
                  (subject: Subject) => {
                    const subjectName = toCamelCase(
                      subject
                    ) as keyof typeof item.studentScore;
                    return (
                      <TableCell className="text-end" key={subject}>
                        {String(item.studentScore[subjectName])}
                      </TableCell>
                    );
                  }
                )}
                <TableCell className="text-end">{item.totalScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TopScorePage;
