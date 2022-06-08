import { useQueryPosts } from '../hooks/query/useQueryPosts'
import { useSubscribePosts } from '../hooks/subscribe/useSubscribePosts'
import { PostItem } from './PostItem'
import { PostForm } from './PostForm'

export const Feed: React.FC = () => {
  const { data: posts } = useQueryPosts()
  useSubscribePosts()
  return (
    <>
      <p className="mb-4 text-center">Feed</p>
      <PostForm />
      <ul data-testid="ul-post" className="my-5">
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            post_url={post.post_url}
            user_id={post.user_id}
          />
        ))}
      </ul>
    </>
  )
}
