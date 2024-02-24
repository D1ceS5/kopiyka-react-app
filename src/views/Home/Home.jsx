import styled from 'styled-components';
import { useContext,createContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';


const StyledHeaderWrapper = styled.header`
    width: 100%;
    height: 10vh;
    background-color: #2D2F31;
    display:flex;
    justify-content:center;
`
const Header = styled.div`
    width:80%;
    display: flex;
    align-items:center;
`

function Home() {
    let ctx = useContext(GlobalContext)
    console.log(ctx);
    return <>
        <StyledHeaderWrapper>
            <Header>
                <img src='../src/assets/logo-home.svg' />
                
            </Header>
        </StyledHeaderWrapper>
    </>
}

export default Home