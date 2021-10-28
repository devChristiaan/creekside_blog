import Link from "next/link"
import { useRouter } from "next/router"
import styles from '../../styles/Home.module.scss'

const { API_URL, CONTENT_API_KEY } = process.env

type Post = {
  title: string
  slug: string
  feature_image: string
  html: string
}

async function getPost(slug: string) {

  const res = await fetch(`${API_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html,feature_image`)

  const payload = await res.json()

  return payload.posts[0]
}

//Execute on Server
export const getStaticProps = async ({ params }) => {

  const post = await getPost(params.slug)

  return {
    revalidate: 10,
    props: { post }
  }
}

//runs at build time
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  }
}
 

const Post: React.FC<{post: Post}> = (props) => {

  const router = useRouter()

  const { post } = props

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  return (
  <div className={styles.container}>
    <h1>{post.title}</h1>
    <div dangerouslySetInnerHTML={{__html: post.html}}>
    </div>
    <Link href="/"><a>Go Back</a></Link>
    </div>
  
  )
}

export default Post