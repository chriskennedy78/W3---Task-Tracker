import { StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);

export default function App() {
    return (
        <SafeAreaProvider>
            <View>
                <HomeScreen />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({});
