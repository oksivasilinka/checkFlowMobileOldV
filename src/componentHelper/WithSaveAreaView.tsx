import {SafeAreaView} from "react-native-safe-area-context";
import {ReactNode} from "react";

type Props = {
    children: ReactNode
}

export const WithSaveAreaView = ({children}: Props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            {children}
        </SafeAreaView>
    )
}