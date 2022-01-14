import React, { useState } from 'react'
import styled from 'styled-components'
const URL = 'https://avatars.dicebear.com/api/'

const Icone = ({ editor, name, theme, setUser, user, isHost }) => {
  const [seed, setSeed] = useState(!editor ? name : 'p')
  const [sprite, setSprite] = useState(!editor ? theme : 'adventurer')
  const [img, setImg] = useState(URL + sprite + '/' + seed + '.svg')
  const handleChange = (e) => {
    e.preventDefault()
    const newSeed = e.target.value
    setSeed(e.target.value)
    setImg(URL + sprite + '/' + newSeed + '.svg')
    setUser({...user, name: newSeed })
  }
  const handleSelect = (e) => {
    e.preventDefault()
    const newSprite = e.target.value.toLowerCase().replace(/\s/g, '-')
    setSprite(newSprite)
    setImg(URL + newSprite + '/' + seed + '.svg')
    setUser({...user, sprite: newSprite })
  }
  const options = ['Adventurer', 'Adventurer Neutral', 'Avataaars', 'Big Ears', 'Big Ears Neutral', 'Big Smile', 'Bottts', 'Croodles', 'Croodles Neutral', 'Female', 'Gridy', 'Human', 'Identicon', 'Initials', 'Jdenticon', 'Male', 'Micah', 'Miniavs', 'Open Peeps', 'Personas', 'Pixel Art', 'Pixel Art Neutral']
  if (editor) {
    return (
      <StyledDiv>
        <StyledWrapper>
          <img src={img} />
        </StyledWrapper>
        <StyledInput onChange={e => handleChange(e)} type='text' placeholder='Votre pseudo' />
        <StyledSelect onChange={e => handleSelect(e)} name='sprite'>
          {
            options.map(opt => (
              <option
                key={opt}
              >
                {opt}
              </option>
            ))
          }
        </StyledSelect>
      </StyledDiv>
    )
  } else {
    return (
      <StyledDivMin isHost={isHost}>
        <StyledWrapperMin >
          <img src={img} />
        </StyledWrapperMin>
        <h3>{seed}</h3>
      </StyledDivMin>
    )
  }
}
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`
const StyledDivMin = styled(StyledDiv)`
  position: absolute;
  gap: 0px;
  z-index: 99;
  top: ${({ isHost }) => (isHost ? 'calc(50% - 40px)': '-120px' )};
  left: ${({ isHost }) => (isHost ? '-120px': 'calc(50% - 40px)' )}; 
  h3{
    margin: 5px 0px;
  }
`
const StyledSelect = styled.select`
  background-color: transparent;
  border: 1px solid #AD8785;
  padding: 10px 5px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 900;
  text-align: center;
  color : #937271;
`
const StyledInput = styled.input`
  background-color: transparent;
  border: 1px solid #AD8785;
  padding: 15px 10px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 900;
  text-align: center;
  color : #937271;
  outline: none;
  ::placeholder{
    font-family: 'Manrope', sans-serif;
    font-size: 20px;
    font-weight: 900;
    text-align: center;
    color : #AD8785;
  }
  :focus{
    border-color: #DAA25D;
  }
`
const StyledWrapper = styled.div`
  background-color: #fff;
  display: grid;
  place-items: center;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  overflow: hidden;
  img{
    width: 100%;
  }
`
const StyledWrapperMin = styled(StyledWrapper)`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`
export default Icone
