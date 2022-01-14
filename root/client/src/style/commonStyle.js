import styled from 'styled-components'

export const StyledHeader = styled.header`
height: 11%;
padding-top : 20px;
padding-left : 35px;
`
export const StyledFooter = styled.footer`
display: flex;
font-family: 'Manrope' sans-serif;
font-weight: 700;
line-height: 87.5%;
letter-spacing: 1.5px;
height: 8%;
align-items: flex-end;
padding-left: 15px;
`
export const StyledSpan = styled.span`
  filter: ${({ turn, yellow }) => ((turn === 'y' && !yellow) || (turn === 'r' && yellow) ? 'grayscale(100%)' : '')};
  color: ${({ yellow }) => (yellow ? '#DAA25D' : '#E02016')};
`
export const StyledMain = styled.main`
display: flex;
gap: 45px;
padding-left: 180px;
padding-right: 90px;
height: 78%;
align-items: center;
justify-content: center;
aside { //387
  svg { //653
    width: 60%;
    height: 100%;
  }
  display: flex;
  flex-direction : column;
  width: 40%;
  align-items: center;
  justify-content: center;
  overflow: visible;

  h1 {
    margin: 0;
    font-size: 42px;
    line-height: 114.5%;
    letter-spacing: 1.4px;
    font-weight: 700;
    width: auto;
  }
}
`
export const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 50px;
  border: none;
  color: white;
  font-family: 'Manrope', sans-serif;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
  width: 260px;
  height: 73px;
  line-height: 108.5%;
  letter-spacing: 2px;
  margin: 25px 0px;
  background-color: ${({ color }) => color};
  padding: 17px 40px 17px 20px;
  text-align: left;
  box-shadow: 0px 3px 20px #969696;
  gap: 15px;
  svg{
    width: 18% !important;
    min-height: 38px;
  }
`
