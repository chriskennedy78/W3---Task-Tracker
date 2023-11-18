import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
    Alert,
} from "react-native";
import { IconButton } from "react-native-paper";
import FallbackImage from "../components/FallbackImage";

const ChoreScreen = () => {
    // initial local state
    const [choreWhat, setChoreWhat] = useState("");
    const [choreWho, setChoreWho] = useState("");
    const [choreWhen, setChoreWhen] = useState("");
    const [choreList, setChoreList] = useState([]);
    const [editedChore, setEditedChore] = useState(null);
    const [completedChores, setCompletedChores] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    // handle adding a chore
    const handleAddChore = () => {
        // id set to date string will give chore a unique number

        if (choreWhat === "" || choreWho === "" || choreWhen === "") {
            return; // early return
        }
        setChoreList([
            ...choreList,
            {
                id: Date.now().toString(),
                title: choreWhat,
                who: choreWho,
                when: choreWhen,
            },
        ]);
        setChoreWho("");
        setChoreWhat("");

        setChoreWhen("");
    };
    const handleDataIncomplete = () => {
        if (choreWhat === "" || choreWho === "" || choreWhen === "") {
            return Alert.alert(
                "Chore has incomplete data",
                "Complete the WHO, WHAT, and WHEN",
                [
                    {
                        text: "Try Again",
                        onPress: () => setModalVisible(true),
                    },
                    {
                        text: "Cancel",
                        onPress: () => {
                            setModalVisible(false);
                            setChoreWhat("");
                            setChoreWho("");
                            setChoreWhen("");
                        },
                    },
                ]
            );
        }
    };
    const handleDeleteChore = (id) => {
        const updatedChoreList = choreList.filter((chore) => chore.id !== id);
        setChoreList(updatedChoreList);
    };

    const handleEditChore = (chore) => {
        setEditedChore(chore);
        setChoreWhat(chore.title);
        setChoreWho(chore.who);
        setChoreWhen(chore.when);
    };

    //to mark as complete
    const handleToggleComplete = (id) => {
        const updatedCompletedChores = completedChores.includes(id)
            ? completedChores.filter((taskId) => taskId !== id)
            : [...completedChores, id];

        setCompletedChores(updatedCompletedChores);
    };

    const handleUpdateChore = () => {
        const updatedChores = choreList.map((item) => {
            if (item.id === editedChore.id) {
                return {
                    ...item,
                    title: choreWhat,
                    who: choreWho,
                    when: choreWhen,
                };
            }

            return item;
        });
        setChoreList(updatedChores);
        setEditedChore(null);
        setChoreWhat("");
        setChoreWho("");
        setChoreWhen("");
    };
    const renderChore = ({ item, index }) => {
        const isCompleted = completedChores.includes(item.id);
        return (
            <View>
                <View style={styles.taskOutput}>
                    <Text
                        style={[
                            styles.taskOutputText,
                            isCompleted && styles.completedText,
                        ]}
                    >
                        Who: {item.who}
                    </Text>

                    <Text
                        style={[
                            styles.taskOutputText,
                            isCompleted && styles.completedText,
                        ]}
                    >
                        What: {item.title}
                    </Text>
                    <Text
                        style={[
                            styles.taskOutputText,
                            isCompleted && styles.completedText,
                        ]}
                    >
                        When: {item.when}
                    </Text>

                    <View style={styles.taskOutputButtons}>
                        <TouchableOpacity
                            onPress={() => handleToggleComplete(item.id)}
                        >
                            <IconButton
                                icon={
                                    isCompleted
                                        ? "checkbox-marked"
                                        : "checkbox-blank"
                                }
                                iconColor="#fff"
                            />
                        </TouchableOpacity>

                        <IconButton
                            icon="pencil"
                            iconColor="#fff"
                            onPress={() => {
                                handleEditChore(item);
                                setModalVisible(true);
                            }}
                        />
                        <IconButton
                            icon="trash-can"
                            iconColor="#fff"
                            onPress={() => handleDeleteChore(item.id)}
                        />
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View>
                <Modal
                    style={styles.modalContent}
                    animationType="slide"
                    visible={modalVisible}
                >
                    <TextInput
                        style={styles.taskInput}
                        placeholder="WHO: Assign Chore"
                        value={choreWho}
                        onChangeText={(userText) => setChoreWho(userText)}
                    />
                    <TextInput
                        style={styles.taskInput}
                        placeholder="WHAT: Assign Chore"
                        value={choreWhat}
                        onChangeText={(userText) => setChoreWhat(userText)}
                    />
                    <TextInput
                        style={styles.taskInput}
                        placeholder="WHEN: Assign Due Date"
                        value={choreWhen}
                        onChangeText={(userText) => setChoreWhen(userText)}
                    />
                    {editedChore ? (
                        <TouchableOpacity
                            style={styles.touchableOpacity}
                            onPress={() => {
                                handleUpdateChore();
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.touchableOpacityText}>
                                Update Chore
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.touchableOpacity}
                            onPress={() => {
                                handleAddChore();
                                setModalVisible(false);
                                handleDataIncomplete();
                            }}
                        >
                            <Text style={styles.touchableOpacityText}>
                                Add Chore
                            </Text>
                        </TouchableOpacity>
                    )}
                </Modal>
                {choreList.length <= 0 && <FallbackImage />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 40,
    },
    taskInput: {
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 20,
        marginBottom: 5,
    },
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
    },
    titleView: {
        alignContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 30,
        paddingBottom: 10,
        paddingTop: 10,
    },
    taskOutput: {
        backgroundColor: "#10b5de",
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 8,
        marginBottom: 8,
        flexDirection: "column",
    },
    taskOutputButtons: {
        backgroundColor: "#324aa8",
        borderRadius: 6,
        flexDirection: "row",
        alignSelf: "flex-end",
    },
    taskOutputText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        flex: 1,
        alignItems: "center",
    },
    completedText: {
        textDecorationLine: "line-through",
        color: "#eb4034",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        borderColor: "#eb4034",
    },

    modalContent: {
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
    },
});

export default ChoreScreen;
