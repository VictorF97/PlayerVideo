import styled from "styled-components";

export const Container = styled.div`
display: flex;
align-items: center;
height: 650px;
width: 440px;
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
overflow: hidden;


.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-inline: auto;    
  background: #000000e2;
}

.filter {
  height: 30px;
  width: 76%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 2rem;
}


button {
  background-color: #9C1515;
  border-radius: 1px;
  color: #FFFFFF;
  cursor: pointer;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none;
  font-family: 'Roboto';
  font-size: 13px;
  font-weight: 700;
  outline-style: none;
  width: 50px;
  height: 20px;
}

.office {
  font-size: 13px;
  width: 70px;
}


.button:focus {
  background-color: #000000;
  color: white;
}

@media (max-width: 1100px) {
  width: 320px;
  height: 580px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0px;
  .filter {
    width: 90%;
  }

  .sidebar {
    height: 100%;
  }
}

@media (min-width: 700px) and (max-width: 900px) {
  max-height: 70%;
  overflow-y: scroll;
  margin-top: 3rem;
  
}

@media (max-width: 768px) {
  width: 70vw;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 10px;
  height: 70%;
  .filter {
    width: 100%;
    height: 8%;
  }
  .sidebar {
    width: 100vw;
    height: 100%;


  }
}

@media (max-width: 620px) {
  width: 100vw;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 10px;
  height: 70%;
  .filter {
    width: 100%;
    height: 8%;
  }
  .sidebar {
    width: 80vw;
    height: 100%;


  }
}

@media (max-width: 450px) {
  border-top-right-radius: 0px;
  border-bottom-left-radius: 10px;
  height: 80%;
  .filter {
    width: 54%;
    height: 8%;
  }
  
  .sidebar {
    width: 100vw;
    height: 90%;
    /* margin-top: 1rem;
    margin-bottom: 1rem; */
  }
}
`

export const SidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 440px;
  height: 600px;
  margin-inline: auto;    
  background: #000000e2;
`