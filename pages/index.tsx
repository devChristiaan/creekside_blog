import { useRouter } from 'next/router'
import Link from 'next/link'


const Home: React.FC = () => {

  const router = useRouter()

  return (
    <div>
      <h1>Web Site Home</h1>
      <p>This is the home page</p>
      <Link href="/blog"><a>Blog</a></Link>
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