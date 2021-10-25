import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const api_url = process.env.API_URL
const content_api_key = process.env.CONTENT_API_KEY

type Post = {}

async function getPosts() {

  const res = await fetch(`${api_url}/ghost/api/v3/content/posts/?key=${content_api_key}`)
  const payload = await res.json()

  let titles = payload.posts.map(post => post.title)

  console.log(titles);
  

  return titles
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()

  return {
    props: {posts}
  }
}

const Home: React.FC<{ posts: Post[] }> = (props) => {

  const router = useRouter()

  return (
    <div className={styles.container}>
      <h1>`Hello :)`</h1>
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