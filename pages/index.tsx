import Head from 'next/head'
import Image from 'next/image'
import { getHeapCodeStatistics } from 'v8'
import styles from '../styles/Home.module.scss'

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()

  return {
    props: {posts}
  }
}

export default function Home() {
  return (
    <div className={styles.container}>
      
    </div>
  )
}
