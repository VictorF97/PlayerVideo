import React, { useEffect, useState } from 'react'
import { ListVideo } from '../ListVideo/ListVideo'
import { Container } from './styles';
import { videos } from '../Database/Database'

export const Sidebar = ({setChosenVideo, theme, setTheme }) => {
  const [filter, setFilter] = useState('Rock');
  const [filteredVideos, setFilteredVideos] = useState([]);


  //filtra os videos de mesmo genero
  useEffect(()=>{
    setFilteredVideos([])
      for(let i = 0; i < videos.length; i++){
        if(videos[i].genre === filter) setFilteredVideos(prev => [...prev, videos[i]])  
    }
  },[filter])

//botoes dos generos 
  return (
    <Container >
        <div className={`sidebar ${theme ? 'light' : ''}`}>
          <div className={`filter ${theme ? 'light' : ''}`}> 
            <button className={`button ${theme ? 'light' : ''}`} onClick={()=>setFilter('Rock')}>Rock</button>
            <button className={`button ${theme ? 'light' : ''}`} onClick={()=>setFilter('Reggea')}>Reggea</button>
            <button className={`button ${theme ? 'light' : ''}`} onClick={()=>setFilter('Pop')}>Pop</button>
            <button className={`button ${theme ? 'light' : ''}`} onClick={()=>setFilter('Rap')}>Rap</button>
          </div>

       {filteredVideos.slice(0, 10).map(item=><ListVideo theme={theme} setTheme={setTheme} 
       setChosenVideo={setChosenVideo} url={item.url} key={item.id} name={item.name} author={item.author} views={item.views} img={item.img} />       
       )}
 
      </div>
    </Container>
  )
}