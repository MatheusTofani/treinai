import { FooterContainer, FooterContainerIcon, FooterIcon, FooterItem, FooterText } from "./style";
import calendario from '../../../assets/calendario.png';
import grafico from '../../../assets/grafico.png';
import trofeu from '../../../assets/trofeu.png';
import user from '../../../assets/user.png';

const Footer = () => {
    return (

        < FooterContainer>

            <FooterItem>
                < FooterText source={calendario} />
            </FooterItem>

            <FooterItem>
            < FooterText source={grafico} />
            </FooterItem>

            <FooterItem>
                <FooterContainerIcon>
                    <FooterIcon>+</FooterIcon>
                </FooterContainerIcon>
            </FooterItem>

            <FooterItem>
            < FooterText source={trofeu} />
            </FooterItem>

            <FooterItem>
            < FooterText source={user} />
            </FooterItem>



        </FooterContainer>
    )

}

export default Footer;