import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TaskScreen from "../screen/TaskScreen";

const FallbackImage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={{ alignItems: "center" }}>
            <Image
                source={require("../../assets/choreList.png")}
                style={{ height: 300, width: 300 }}
            />
            {/* <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={setModalVisible}
            >
                <Text style={styles.touchableOpacityText}>
                    Start Adding Chores
                </Text>
            </TouchableOpacity> */}
        </View>
    );
};

export default FallbackImage;

const styles = StyleSheet.create({
    touchableOpacity: {
        backgroundColor: "#000",
        borderRadius: 6,
        paddingVertical: 8,
        marginVertical: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
    touchableOpacityText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        margin: 5,
    },
});
