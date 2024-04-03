import { getContact, getContactBookMarks } from '@api/contacts';
import { Txt } from '@linker/lds';
import { colors } from '@linker/styles';

import { getTokens } from '@utils/token/server';

import Contact from './Contact';
import { nonLoginWrapper } from './Contact.css';

export default async function ContactPage() {
  const { accessToken } = getTokens();
  const contactData = await getContact();
  const bookmarkData = await getContactBookMarks();

  return (
    <div>
      {accessToken == null ? (
        <article className={nonLoginWrapper}>
          <section className={nonLoginWrapper}>
            <Txt typography="p1" color={colors.gray700} fontWeight="regular">
              예정된 일정이 없습니다.
            </Txt>
            <Txt typography="p1" color={colors.gray700} fontWeight="regular">
              일정을 추가해주세요.
            </Txt>
          </section>
        </article>
      ) : (
        <Contact defaultContact={contactData} bookmarksContact={bookmarkData} />
      )}
    </div>
  );
}
