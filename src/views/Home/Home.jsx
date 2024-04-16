
import { useContext, createContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import GreenButton from '../../components/GreenButton';
import GrayButton from '../../components/GrayButton';
import { StyledHeaderWrapper,BottomBlockContainer,BackgroundImageHideble,BottomBlock, Header, HeroBlock, StyledH1, StyledH2, StyledParagraph, TextColumn, ImageTextBlock, BackgroundImage } from './styles'


function Home() {
    let ctx = useContext(GlobalContext)
    console.log(ctx);
    return <>
        <StyledHeaderWrapper>
            <Header>
                <img style={{ width: '170px' }} src='../src/assets/logo-home.svg' />
                <GrayButton text={"Увійти"} href={'/auth/login'} />
            </Header>
            <BackgroundImage src='./src/assets/bubble2.svg' style={{ width: "250px", top: "100px", left: "0" }} />
            <BackgroundImage src='./src/assets/bubble1.svg' style={{ width: "250px", top: "200px", left: "100px" }} />
        </StyledHeaderWrapper>
        <HeroBlock>
            <StyledH1>Простий спосіб<br />керувати <b>особистими фінансами</b></StyledH1>
            <GreenButton style={{ width: "170px" }} text={"Почати"} href={'/auth/login'} />
            <BackgroundImageHideble src='./src/assets/coin1.svg' style={{ width: "250px", top: "250px", right: "0%" }} />

        </HeroBlock>
        <ImageTextBlock>
            <img src='./src/assets/home1.png' style={{ width: "40%", objectFit: "contain" }} />
            <TextColumn>
                <div style={{backgroundColor: "rgba(23, 25, 26, 0.5)", padding: "20px 40px", borderRadius: "5px"}} >
                    <StyledH2>Простий трекер грошей</StyledH2>
                    <StyledParagraph>Запис щоденних транзакцій займає кілька секунд. Розмістіть їх у чітких  категоріях, таких як «їжа», «Дім» або «Шопінг».</StyledParagraph>
                </div>

            </TextColumn>
            <BackgroundImage src='./src/assets/bubble3.svg' style={{ width: "150px", top: "45%", right: "0" }} />
        </ImageTextBlock>
        <ImageTextBlock style={{backgroundColor:"#17191A",flexWrap:'wrap-reverse'}}>
            
            <TextColumn>
                <div style={{backgroundColor: "rgba(45, 47, 49, 0.5)", padding: "20px 40px", borderRadius: "5px"}} >
                    <StyledH2>Вся картинка в одному місці</StyledH2>
                    <StyledParagraph>Один звіт, щоб надати чітке уявлення про ваші моделі витрат. Зрозумійте, куди приходять і йдуть ваші гроші за допомогою зручних для читання графіків.</StyledParagraph>
                </div>

            </TextColumn>
            <img src='./src/assets/home2.png' style={{ width: "40%",  objectFit: "contain" }} />
            <BackgroundImageHideble src='./src/assets/purplecoin.svg' style={{ width: "200px", top: "60%", left: "5%" }} />
        </ImageTextBlock>
        <BottomBlock>
            <BottomBlockContainer>
                <img style={{ width: '170px' }} src='../src/assets/logo-home.svg' />
                <StyledParagraph style={{textAlign:'center'}}>Один звіт, щоб надати чітке уявлення про ваші моделі витрат. Зрозумійте, куди приходять і йдуть ваші гроші за допомогою зручних для читання графіків.</StyledParagraph>
                <GreenButton style={{ width: "170px" }} text={"Почати"} href={'/auth/login'} />
            </BottomBlockContainer>
       
        <BackgroundImageHideble src='./src/assets/green-bag.svg' style={{ width: "400px", top: "30%", left: "5%" }} />
        <BackgroundImage src='./src/assets/blur-buble.svg' style={{ width: "300px", top: "10%", right: "-10%" }} />
        <BackgroundImageHideble src='./src/assets/x-coin.svg' style={{ width: "200px", top: "50%", right: "15%" }} />
       
        </BottomBlock>

    </>
}

export default Home