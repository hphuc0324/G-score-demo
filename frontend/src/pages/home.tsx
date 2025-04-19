import ScoreCard from "@/components/score-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentScore } from "@/types/dtos";
import { useState } from "react";
import scoreApi from "@/api/score-api";
import { toast } from "react-toastify";

function HomePage() {
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<StudentScore | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handeSearch = async () => {
    try {
      setLoading(true);
      const res = await scoreApi.getScore(id);

      setData(res.data.data);
    } catch (error: any) {
      setData(null);
      if (error.response) {
        console.log(error);
        toast.error(<p>{error.response.data.message}</p>);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1400px] h-full">
      <div className="bg-[#604bfe] h-[200px] flex items-center justify-start md:px-12">
        <div className="flex w-full max-w-sm items-center space-x-2 h-12 gap-4 md:mx-0 mx-auto">
          <Input
            id="search"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="block max-w-[400px] h-full py-4  bg-white text-lg"
            placeholder="Registration ID"
          />
          <Button
            type="submit"
            onClick={handeSearch}
            className="h-full w-20 hover:opacity-90 cursor-pointer"
          >
            Search
          </Button>
        </div>
      </div>

      <div className="md:p-12 p-8 text-start">
        <p className="w-full text-start text-xl font-bold ">Detailed Scores</p>

        {!data && !loading && (
          <div className="my-4">
            <p className="text-gray-500">
              Use the search bar above to find your G-Scores by Registration ID.
            </p>
            <p className="text-gray-500">
              Scores will be shown for the subjects you have registered for.
            </p>
          </div>
        )}

        {loading && (
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-4">
            <Skeleton className="rounded-xl h-44" />
            <Skeleton className="rounded-xl h-44" />
            <Skeleton className="rounded-xl h-44" />
            <Skeleton className="rounded-xl h-44 md:hidden" />
          </div>
        )}

        {data && (
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-4">
            {Object.keys(data)
              .filter(
                (key) =>
                  data[key as keyof StudentScore] !== null &&
                  key !== "id" &&
                  key !== "language"
              )
              .map((key) => (
                <ScoreCard
                  key={key}
                  subject={key}
                  score={
                    typeof data[key as keyof StudentScore] === "number"
                      ? data[key as keyof StudentScore]
                      : 0
                  }
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
