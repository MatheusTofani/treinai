const { View } = require("react-native");
const { Input } = require("./style");
import React, { useState } from 'react';

function Form() {
    const [isFocusedUser, setIsFocusedUser] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);

    return (
        <View>
            <Input
                onFocus={() => setIsFocusedUser(true)}
                onBlur={() => setIsFocusedUser(false)}
                isFocused={isFocusedUser}
                placeholder="Digite seu usuário"
            />
            <Input
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(false)}
                isFocused={isFocusedPassword}
                placeholder="Digite sua senha"
                secureTextEntry={true}  
            />
        </View>
    );
}

export default Form;
