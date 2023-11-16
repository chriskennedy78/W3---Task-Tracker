import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import TaskScreen from "./src/screen/TaskScreen";

export default function App() {
    return (
        <SafeAreaView>
            <View>
                <TaskScreen />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
