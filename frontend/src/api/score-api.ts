import axiosClient from "./axios-client";

const scoreApi = {
  getScore: (id: string) => {
    return axiosClient.get(`/score/${id}`);
  },

  getStatistic: (subjectName: string) => {
    return axiosClient.get(`/score/statistic?subject=${subjectName}`);
  },

  getTopScore: (subjectName: string) => {
    return axiosClient.get(
      `/score/top-scores?group-name=${subjectName}&limit=10`
    );
  },
};

export default scoreApi;
