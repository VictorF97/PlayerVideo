import { useState, useRef, useEffect } from 'react'
import { Container, ModeTeater, Progress, Options} from './styles';

import {BsPlay, BsPause} from "react-icons/bs";
import { FiVolumeX, FiVolume2 } from 'react-icons/fi';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'
import { CgScreenWide, CgScreen } from 'react-icons/cg'

export const Video = ({theaterMode, setTheaterMode, pickedVideo, theme}) => {
  const [videoPaude, setVideoPause] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(true)
  const [mute, setMute] = useState(true)
  const [duration, setDuration] = useState(null)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [speed, setSpeed] = useState(1)
  const vidRef = useRef(null)
  const fullScreenRef = useRef(null)
   

  const toggleTheaterMode = () =>  setTheaterMode(prev => !prev);

  const togglePlay = () => {
    videoPaude ? vidRef.current.play() : vidRef.current.pause();
    setVideoPause(prev => !prev)
    }

  const toggleMute = () => {
    setMute(prev => !prev)
    mute ? vidRef.current.volume = 0 : vidRef.current.volume = 1;
    mute ? volumeRef.current.value = 0 : volumeRef.current.value = 1
    }

  const toggleFullScreen = () => {
    setIsFullScreen(prev => !prev)    
    if (!isFullScreen)document.exitFullscreen()
    else fullScreenRef.current.requestFullscreen()
    }

  useEffect(() => {
    setVideoPause(true)
  },[pickedVideo])


  const  handleRange= (e)=>{
    if(e.target.value < 0.01) vidRef.current.volume = 0, setMute(false);
    else if(e.target.value > 0.01 && e.target.value < 0.3) vidRef.current.volume = 0.2, setMute(true)
    else if(e.target.value > 0.3 && e.target.value < 0.7) vidRef.current.volume = 0.6, setMute(true)
    else vidRef.current.volume = 1
    }

  const startWithZero = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
    })

  const speedVideo = () => {
    let newSpeed = vidRef.current.playbackRate + 0.50
    if (newSpeed > 2) newSpeed = 0.50
    vidRef.current.playbackRate = newSpeed
    setSpeed(newSpeed)
    }
    
  const formatDuration = (time) => {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)
    if (hours === 0) {
      return `${minutes}:${startWithZero.format(seconds)}`
      } else {
        return `${hours}:${startWithZero.format(minutes)}:${startWithZero.format(seconds)}`
      }
   }
 
  const width = 100 / parseInt(duration?.replace(':', '')) * parseInt(currentTime?.replace(':', ''))

  return (
    <Container>
      <div ref={fullScreenRef} className={`video-container paused  ${theaterMode ? "theater" : ""} ${theme ? 'light' : ''}`}>
        <Progress className='progress' style={{width: `${width}%`}}></Progress>
        <div className='video-controls-container'>
       
        <Options>
          <div className='timeline-container'></div>
          <div className='controls'>
            <button onClick={togglePlay}>
              {!videoPaude ? <BsPause /> : <BsPlay />}
            </button>

            <div className='volume-container'>
              <button onClick={toggleMute}>{mute ? <FiVolume2 /> : <FiVolumeX />}</button>
              <input  onInput={(e) => handleRange(e)} className='volume-slider' type='range' min='0' max='1' step='any'></input>
            </div>


            <div className='duration-container'>
              <b className='current-time'>{currentTime}</b>/
              <b className='total-time'>{duration}</b>
            </div>


            <button onClick={speedVideo} className='speed-btn wider-btn'>{speed}x</button>
            <ModeTeater onClick={toggleTheaterMode}>{theaterMode ? <CgScreenWide/> : <CgScreen />}</ModeTeater>
            <button onClick={toggleFullScreen}>{ isFullScreen ? <MdFullscreen /> : <MdFullscreenExit/>}</button>
         

           </div>
          </Options>
        </div>
        <video ref={vidRef} onTimeUpdate={()=>setCurrentTime(formatDuration(vidRef?.current?.currentTime))} onLoadedMetadata={()=>setDuration(formatDuration(vidRef?.current?.duration))} 
        src={pickedVideo} loop type='video/mp4'></video>
      </div>
    </Container>
  )
}

