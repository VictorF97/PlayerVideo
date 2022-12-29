import { useState, useRef, useEffect } from 'react'
import { Container, ModeTeater, Progress, Options, ButtonLeft, ButtonRight } from './styles';

import {BsArrowLeftShort, BsArrowRightShort, BsPlay, BsPause} from "react-icons/bs";
import { FiVolumeX, FiVolume2 } from 'react-icons/fi';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'
import { CgScreenWide, CgScreen } from 'react-icons/cg'

export const Video = ({isTheaterMode, setIsTheaterMode, chosenVideo, theme}) => {
  const [isVideoPaused, setIsVideoPaused] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(true)
  const [isMute, setIsMute] = useState(true)
  const [duration, setDuration] = useState(null)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [speed, setSpeed] = useState(1)
  const vidRef = useRef(null)
  const fullScreenRef = useRef(null)
  const volumeRef = useRef(null)
   

  const toggleTheaterMode = () =>  setIsTheaterMode(prev => !prev);

  //play
  const togglePlay = () => {
    isVideoPaused ? vidRef.current.play() : vidRef.current.pause();
    setIsVideoPaused(prev => !prev)
    }
  //mutar
  const toggleMute = () => {
    setIsMute(prev => !prev)
    isMute ? vidRef.current.volume = 0 : vidRef.current.volume = 1;
    isMute ? volumeRef.current.value = 0 : volumeRef.current.value = 1
    }



  //tela cheia
  const toggleFullScreen = () => {
    setIsFullScreen(prev => !prev)    
    if (!isFullScreen)document.exitFullscreen()
    else fullScreenRef.current.requestFullscreen()
    }

  //muda o status do play ao trocar de video enquanto ainda está rodando
  useEffect(() => {
    setIsVideoPaused(true)
  },[chosenVideo])


  //ajuste de volume
  const  handleRange= (e)=>{
    if(e.target.value < 0.01) vidRef.current.volume = 0, setIsMute(false);
    else if(e.target.value > 0.01 && e.target.value < 0.3) vidRef.current.volume = 0.2, setIsMute(true)
    else if(e.target.value > 0.3 && e.target.value < 0.7) vidRef.current.volume = 0.6, setIsMute(true)
    else vidRef.current.volume = 1
    }

  //deixa os menutos e segundos com 2 digitos
  const startWithZero = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
    })

  //altera velocidade de reprodução
  const changeSpeed = () => {
    let newSpeed = vidRef.current.playbackRate + 0.50
    if (newSpeed > 2) newSpeed = 0.50
    vidRef.current.playbackRate = newSpeed
    setSpeed(newSpeed)
    }
    
  //ajusta a duração do video
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

   //mostra a barra de progresso 
  const width = 100 / parseInt(duration?.replace(':', '')) * parseInt(currentTime?.replace(':', ''))

  return (
    <Container>
      <div ref={fullScreenRef} className={`video-container paused  ${isTheaterMode ? "theater" : ""} ${theme ? 'light' : ''}`}>
        <Progress className='progress' style={{width: `${width}%`}}></Progress>
        <div className='video-controls-container'>
        <Options>
          <div className="timeline-container"></div>
          <div className="controls">
            <ButtonLeft> <BsArrowLeftShort/></ButtonLeft>
            <button onClick={togglePlay}>
              {!isVideoPaused ? <BsPause /> : <BsPlay />}
            </button>
            <ButtonRight> <BsArrowRightShort/></ButtonRight>

            <div className='volume-container'>
              <button onClick={toggleMute}>{isMute ? <FiVolume2 /> : <FiVolumeX />}</button>
              <input ref={volumeRef} onInput={(e) => handleRange(e)} className='volume-slider' type='range' min='0' max='1' step='any' defaultValue='1'></input>
            </div>

            <div className='duration-container'>
              <div className='current-time'>{currentTime}</div>/
              <div className='total-time'>{duration}</div>
            </div>
            
            <button onClick={changeSpeed} className='speed-btn wider-btn'>{speed}x</button>
            <ModeTeater onClick={toggleTheaterMode}>{isTheaterMode ? <CgScreenWide/> : <CgScreen />}</ModeTeater>
            <button onClick={toggleFullScreen}>{ isFullScreen ? <MdFullscreen /> : <MdFullscreenExit/>}</button>
          </div>
          </Options>
        </div>
        <video ref={vidRef} onTimeUpdate={()=>setCurrentTime(formatDuration(vidRef?.current?.currentTime))} onLoadedMetadata={()=>setDuration(formatDuration(vidRef?.current?.duration))} 
        src={chosenVideo} loop type='video/mp4'></video>
      </div>
    </Container>
  )
}

