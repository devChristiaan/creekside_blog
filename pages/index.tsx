import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const api_url = process.env.API_URL
const content_api_key = process.env.CONTENT_API_KEY

type Post = {
  title: string
  slug: string
  feature_image: string
  custome_excerpt: string
}

async function getPosts() {

  const res = await fetch(`${api_url}/ghost/api/v3/content/posts/?key=${content_api_key}&fields=title,slug,custome_excerpt,feature_image`)
  const payload = await res.json()

  return payload.posts
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()

  return {
    props: {posts}
  }
}

const Home: React.FC<{ posts: Post[] }> = (props) => {

  const { posts } = props

  const router = useRouter()

  return (
    <div className={styles.container}>
      <h1>Hello World</h1>
      <ul>
        {posts.map((post, index) => {
          return <li key={post.slug}><Link href="/post/[slug]" as={`/post/${post.slug}`}><a>{post.title}</a></Link></li>
        })}
      </ul>
      <ul>
        {router.locales.map(lan => (
         <li key={lan}>
           <Link href={router.asPath} locale={lan}><a>{lan}</a></Link>
           </li>
        ))}
      </ul>
    </div>
  )
}

export default Home