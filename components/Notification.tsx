import { useQueryNotices } from '../hooks/query/useQueryNotices'
import { useSubscribeNotices } from '../hooks/subscribe/useSubscribeNotices'
import { NoticeItem } from './NoticeItem'
import { NoticeForm } from './NoticeForm'

export const Notification: React.FC = () => {
  const { data: notices } = useQueryNotices()
  useSubscribeNotices()

  return (
    <>
      <p className="mb-4 text-center"></p>
      <NoticeForm />
      <ul data-testid="ul-notice" className="my-5">
        {notices?.map((notice) => (
          <NoticeItem
            key={notice.id}
            id={notice.id}
            content={notice.content}
            user_id={notice.user_id}
          />
        ))}
      </ul>
    </>
  )
}
