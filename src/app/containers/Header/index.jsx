import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderContainer, HeaderLogo, HeaderMenu, HeaderMenuContainer } from "./style";
import { TouchableOpacity } from "react-native";

const Header = () => {
    return (
        <SafeAreaView>
<HeaderContainer>

<TouchableOpacity>
    <HeaderLogo>Treinai</HeaderLogo>
</TouchableOpacity>

<TouchableOpacity>
    <HeaderMenuContainer>
<HeaderMenu></HeaderMenu>
<HeaderMenu></HeaderMenu>
<HeaderMenu></HeaderMenu>
    </HeaderMenuContainer>
</TouchableOpacity>

</HeaderContainer>
        </SafeAreaView>
       
    );
};

export default Header;