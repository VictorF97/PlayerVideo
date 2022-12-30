import React, { useEffect, useState } from 'react'
import { videos } from '../Database/Database'
import { ListVideo } from '../ListVideo/ListVideo'
import { Container, SidebarStyle } from './styles';


export const Sidebar = ({setPickedVideo, theme, setTheme }) => {
  const [select, setSelect] = useState('Rock');
  const [selectVideo, setSelectVideo] = useState([]);

  useEffect(()=>{
    setSelectVideo([])
      for(let i = 0; i < videos.length; i++){
        if(videos[i].genre === select) setSelectVideo(prev => [...prev, videos[i]])  
    }
  },[select])
  return (
    <Container >
        <SidebarStyle className={`sidebar ${theme ? 'light' : ''}`}>
          <div className={`select ${theme ? 'light' : ''}`}> 
            <button className={`button ${theme ? 'light' : ''}`} onClick={()=>setSelect('Rock')}>Rock</button>
            <button className={`button ${theme ? 'light' : ''}`} onClick={()=>setSelect('Reggea')}>Reggea</button>
            <button className={`button ${theme ? 'light' : ''}`} onClick={()=>setSelect('Pop')}>Pop</button>
            <button className={`button ${theme ? 'light' : ''}`} onClick={()=>setSelect('Rap')}>Rap</button>
          </div>

       {selectVideo.map(item=><ListVideo theme={theme} setTheme={setTheme} setPickedVideo={setPickedVideo} 
       url={item.url} key={item.id} name={item.name} author={item.author} views={item.views} img={item.img} />       
       )} 
      </SidebarStyle>
    </Container>
  )
}