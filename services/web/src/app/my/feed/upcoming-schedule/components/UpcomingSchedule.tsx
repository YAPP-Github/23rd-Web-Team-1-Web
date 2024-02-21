import type { Schedule } from '@/types/schedule';
import { ky } from '@linker/ky';
import { List } from '@linker/lds';
import Link from 'next/link';

import { getTokens } from '@utils/token/server';

import ScheduleItem from './ScheduleItem';
import { listWrapper, listItem, listHeader } from './UpcomingSchedule.css';
import { ContactBanner } from '../../contact-banner';

const getUpcomingSchedule = ({ limit }: { limit: number }) => {
  return ky.get<{
    schedules: Schedule[];
  }>(`/v1/schedules/near-term?type=UPCOMING&limit=${limit}`);
};

async function UpcomingSchedule() {
  const accessToken = getTokens().accessToken;

  if (accessToken == null) {
    return <ContactBanner />;
  }

  const { schedules } = await getUpcomingSchedule({ limit: 3 });

  if (!schedules.length) {
    return null;
  }

  return (
    <List className={listWrapper}>
      <List.Header
        title="다가오는 일정 확인하기"
        description="예정된 일정의 관심 대화주제를 확인해보세요"
        typograyphy="h7"
        className={listHeader}
      />
      {schedules.map((schedule) => (
        <Link
          /** @todo 일정상세페이지 href 추가필요 */
          href=""
          key={schedule.scheduleId}
          className={listItem}
        >
          <List.Row content={<ScheduleItem schedule={schedule} />} withArrow />
        </Link>
      ))}
    </List>
  );
}

export default UpcomingSchedule;
