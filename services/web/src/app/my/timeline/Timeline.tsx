import TimelineDefault from './component/TimelineDefault/TimelineDefault';
import TimelineNull from './component/TimelineNull/TimelineNull';
import { getPrevTimeline, getUpcomingTimeline } from './hooks/useGetNearSchedule';

export default async function Timeline() {
  const prevData = await getPrevTimeline();
  const upcomingData = await getUpcomingTimeline();
  const concatSchedules = [];

  concatSchedules.push(prevData.schedules);
  concatSchedules.push(upcomingData.schedules);

  const uniqueSchedules = [...new Set(concatSchedules)];

  return (
    <>
      {uniqueSchedules.length === 0 ? (
        <TimelineNull />
      ) : (
        <TimelineDefault upComingData={upcomingData} prevData={prevData} />
      )}
    </>
  );
}
