import styled from 'styled-components';

export const StyledHeaderWrapper = styled.header`
    width: 100%;
    height: 10vh;
    background-color: #2D2F31;
    display:flex;
    justify-content:center;
    border-bottom: 1px solid #6AA218;
`
export const Header = styled.div`
    width:80%;
    display: flex;
    align-items:center;
    justify-content: space-between;
    
`
export const HeroBlock = styled.div`
    padding: 100px 10%;
    width: 80%;
    background-color: #17191A;
    display:flex;
    flex-direction: column;
    align-items: center;
    
    justify-content: center;
`

export const StyledH1 = styled.h1`
    font-size: 50px;
    text-align: center;
    margin-block-start: 0;
    font-weight: 500;
    color: #fff;
    z-index: 2;
    @media (max-width: 768px) {
        font-size: 36px;
      }
`

export const StyledH2 = styled.h2`
    font-size: 34px;
    margin-block-start: 0;
    color: #fff;
    z-index: 2;
    @media (max-width: 768px) {
        font-size: 26px;
      }
`

export const StyledParagraph = styled.p`
    font-size: 16px;
    margin-block-start: 0;
    color: #fff;
    z-index: 2;

`

export const ImageTextBlock = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 100px 10% 100px 10%;
    background-color: #2D2F31;
    width: 80%;
    height:100%
    gap: 20px;
    position:relative;
    z-index: 2;
    flex-wrap:wrap;
    @media (max-width: 768px) {
        *{
            flex: 1 1 160px;
        }
      }
    
`

export const BottomBlock = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    padding: 100px 10% 100px 10%;
    background-color: #2D2F31;
    width: 80%;
    min-height:400px;
    gap: 20px;
    overflow:hidden;
    position:relative;
    z-index: 2;
`
export const BottomBlockContainer = styled.div`
display:flex;
flex-direction:column;
max-width:50%;
gap:20px;
padding:20px;
align-items:center;
background-color:rgba(23, 25, 26, 0.5);
border-radius:5px;
z-index:2;
@media (max-width: 768px) {
    max-width:80%;
  }
`

export const TextColumn = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 50%;
    min-width: 300px;
    z-index: 2;
`

export const BackgroundImage = styled.img`
    position: absolute;
    z-index: 1;
`
export const BackgroundImageHideble = styled.img`
position: absolute;
z-index: 1;
@media (max-width: 768px) {
    display:none;
  }
`