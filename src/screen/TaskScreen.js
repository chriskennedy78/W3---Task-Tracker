import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { IconButton } from "react-native-paper";
import FallbackImage from "../components/FallbackImage";

// const dummyData = [
//     {
//         id: "01",
//         title: "Wash Car",
//         who: "Chris",
//         when: "today",
//     },
//     {
//         id: "02",
//         title: "Walk dogs",
//         who: "Jill and Chris",
//         when: "Daily",
//     },
// ];
const TaskScreen = () => {
    // initial local state
    const [choreWhat, setChoreWhat] = useState("");
    const [choreWho, setChoreWho] = useState("");
    const [choreWhen, setChoreWhen] = useState("");
    const [choreList, setChoreList] = useState([]);
    const [editedChore, setEditedChore] = useState(null);
    const [completedChores, setCompletedChores] = useState([]);

    // handle adding a chore
    const handleAddChore = () => {
        // structure of single item
        // { id:
        // title:
        // who:
        // when:}
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
                            onPress={() => handleEditChore(item)}
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
            <View style={styles.titleView}>
                <Text style={styles.titleView}>W3 Chores</Text>
            </View>

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
                    onPress={() => handleUpdateChore()}
                >
                    <Text style={styles.touchableOpacityText}>
                        Update Chore
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => handleAddChore()}
                >
                    <Text style={styles.touchableOpacityText}>Add Chore</Text>
                </TouchableOpacity>
            )}

            {/* Render Chore List */}
            <FlatList data={choreList} renderItem={renderChore} />
            {choreList.length <= 0 && <FallbackImage />}
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
        // alignItems: "flex-start",
        // shadowColor: "#324aa8",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 3,
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
});

export default TaskScreen;

// From App.js file

// const [task, setTask] = useState();
//     const [taskItems, setTaskItems] = useState([]);

//     const handleAddTask = () => {
//         Keyboard.dismiss();
//         setTaskItems([...taskItems, task]);
//         setTask(null);
//     };

//     const completeTask = (index) => {
//         let itemsCopy = [...taskItems];
//         itemsCopy.splice(index, 1);
//         setTaskItems(itemsCopy);
//     };

//     {/* Todays Tasks */}
//     <View style={styles.taskWrapper}>
//     <Text style={styles.sectionTitle}>Today's Tasks</Text>
//     <View style={styles.items}>
//         {/* This is where tasks go */}
//         {taskItems.map((item, index) => {
//             return (
//                 <TouchableOpacity
//                     key={index}
//                     onPress={() => completeTask(task)}
//                 >
//                     <Task text={item} />
//                 </TouchableOpacity>
//             );
//         })}
//     </View>
// </View>
// {/* Write a Task */}
// <KeyboardAvoidingView
//     behavior={Platform.OS === "ios" ? "padding" : "height"}
//     style={styles.writeTaskWrapper}
// >
//     <TextInput
//         style={styles.input}
//         placeholder={"write a task"}
//         value={task}
//         onChangeText={(text) => setTask(text)}
//     />
//     <TouchableOpacity onPress={() => handleAddTask()}>
//         <View style={styles.addWrapper}>
//             <Text style={styles.addText}>+</Text>
//         </View>
//     </TouchableOpacity>
// </KeyboardAvoidingView>

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#E8EAED",
//     },

//     taskWrapper: {
//         paddingTop: 80,
//         paddingHorizontal: 20,
//     },
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: "bold",
//     },
//     items: {
//         marginTop: 30,
//     },
//     writeTaskWrapper: {
//         position: "absolute",
//         bottom: 60,
//         width: "100%",
//         flexDirection: "row",
//         justifyContent: "space-around",
//         alignItems: "center",
//     },
//     input: {
//         paddingVertical: 15,
//         paddingHorizontal: 15,
//         backgroundColor: "#FFF",
//         borderRadius: 60,
//         borderColor: "#C0C0C0",
//         borderWidth: 1,
//         width: 250,
//     },
//     addWrapper: {
//         width: 60,
//         height: 60,
//         backgroundColor: "#FFF",
//         borderRadius: 60,
//         justifyContent: "center",
//         alignItems: "center",
//         borderColor: "#C0C0C0",
//         borderWidth: 1,
//     },
//     addText: {},
// });
