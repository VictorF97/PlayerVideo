import  React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Video } from '../components/PlayerVideo/PlayerVideo'
import { videos } from '../components/Database/Database'

export default function Home() {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [chosenVideo, setChosenVideo] = useState(videos[0].url);
  const [theme, setTheme] = useState(false)

  return (
    <>
      <Head>
        <title>React VideoPlayer</title>
        <meta name="description" content="Criaçao de App" />
        <meta name="viewport" content="width=device-width, initial-scale=2" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/play.ico" />
      </Head>
      <main className={`${styles.main} ${ theme ? styles.light : ''}`}>
         <Video isTheaterMode={isTheaterMode} setIsTheaterMode={setIsTheaterMode} chosenVideo={chosenVideo} setChosenVideo={setChosenVideo} theme={theme} setTheme={setTheme} />
         {!isTheaterMode && <Sidebar setChosenVideo={setChosenVideo}  theme={theme} setTheme={setTheme} /> }
      </main>
    </>
  )
}
