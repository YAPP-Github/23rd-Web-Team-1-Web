import { ky } from '@linker/ky';
import { useSuspenseQuery } from '@tanstack/react-query';

import { GetTimelineRes } from '../types/schedule';

export const getPrevTimeline = () => {
  const res = ky.get<GetTimelineRes>('/v1/schedules/near-term?limit=32&type=PREV');

  return res;
};
export const getUpcomingTimeline = () => {
  const res = ky.get<GetTimelineRes>('/v1/schedules/near-term?limit=32&type=UPCOMING');

  return res;
};

const useGetPrevSchedule = (prevData: GetTimelineRes) => {
  const { data: prevTimelineData } = useSuspenseQuery<GetTimelineRes>({
    queryKey: useGetPrevSchedule.getKey(),
    queryFn: () => getPrevTimeline(),
    initialData: prevData,
  });

  return { prevTimelineData };
};
const useGetUpComingSchedule = (upcomingData: GetTimelineRes) => {
  const { data: upcomingTimelineData } = useSuspenseQuery<GetTimelineRes>({
    queryKey: useGetUpComingSchedule.getKey(),
    queryFn: () => getUpcomingTimeline(),
    initialData: upcomingData,
  });

  return { upcomingTimelineData };
};

useGetPrevSchedule.getKey = () => {
  return ['/api/v1/schedules/near-term'];
};
useGetUpComingSchedule.getKey = () => {
  return ['/api/v1/schedules/near-term'];
};

export { useGetPrevSchedule, useGetUpComingSchedule };
