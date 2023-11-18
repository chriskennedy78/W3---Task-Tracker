import { StyleSheet, View, Image } from "react-native";
import React from "react";

const FallbackImage = () => {
    return (
        <View style={{ alignItems: "center" }}>
            <Image
                source={require("../../assets/choreList.png")}
                style={{ height: 300, width: 300 }}
            />
        </View>
    );
};

export default FallbackImage;

const styles = StyleSheet.create({});
