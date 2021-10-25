import Head from 'next/head'
import Image from 'next/image'
import { json } from 'stream/consumers'
import { getHeapCodeStatistics } from 'v8'
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
  return (
    <div className={styles.container}>
      <h1>`Hello :)`</h1>
    </div>
  )
}

export default Home