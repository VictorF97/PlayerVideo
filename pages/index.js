import  React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Video } from '../components/PlayerVideo/PlayerVideo'
import { videos } from '../components/Database/Database'

export default function Home() {
  const [theaterMode, setTheaterMode] = useState(false);
  const [pickedVideo, setPickedVideo] = useState(videos[0].url);
  const [theme, setTheme] = useState(false)

  return (
    <>
      <Head>
        <title>React VideoPlayer</title>
        <meta name="viewport" content="width=device-width, initial-scale=2" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800" rel="stylesheet"></link>
      </Head>
      <main className={`${styles.main}`}>
         <Video theaterMode={theaterMode} setTheaterMode={setTheaterMode} pickedVideo={pickedVideo} setPickedVideo={setPickedVideo} theme={theme} setTheme={setTheme} />
         {!theaterMode && <Sidebar setPickedVideo={setPickedVideo}  theme={theme} setTheme={setTheme} /> }
      </main>
    </>
  )
}
