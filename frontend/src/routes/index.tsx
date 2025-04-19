import DefaultLayout from "@/layouts/default-layout";

import HomePage from "@/pages/home";
import StatisticPage from "@/pages/statistic";
import TopScorePage from "@/pages/top";

export const publicRoutes = [
  {
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "statistics",
        element: <StatisticPage />,
      },
      {
        path: "top-scores",
        element: <TopScorePage />,
      },
    ],
  },
];
