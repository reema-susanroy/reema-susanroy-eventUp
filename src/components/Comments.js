import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import DisplayComments from './DisplayComments';
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../screens/LoadingScreen";
import ErrorScreen from "../screens/ErrorScreen";

function Comments({ eventID }) {
    const [comments, setcomments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, sethasError] = useState(false);
    const [successData, setSuccessData] = useState(false);
    const [text, setText] = useState('');
    const [showAllComments, setShowAllComments] = useState(false);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = async () => {
        try {
            const commentData = await axios.get(`http://192.168.1.67:8080/api/events/${eventID}/comments`);
            setcomments(commentData.data);
            setSuccessData(true);
            setIsLoading(false);
            sethasError(false);
        } catch (error) {
            sethasError(true);
            setIsLoading(false);
            console.log("Unable to fetch event details from the database: " + error);
        }
    }
    const handlePostComment = async () => {
        if (text.trim() === '') {
            setError(true);
            setText("");
        }
        else {
            try {
                let data = {
                    "event_id": eventID,
                    "user": "Mohan Muruge",
                    "comment": text,
                    "like": 0
                };
                const respdata = await axios.post(`http://192.168.1.67:8080/api/events/${eventID}/comments`, data);
                setText("");
                let newpost = respdata.data;
                setcomments([ ...comments, newpost ]);
                // setCommentCount(comments.length + 1);
                getComments();
            }
            catch (error) {
                console.log("Unable to fetch post the comment :" + error);
            }
            // setText("");
        }
    }

    const handlePress = () => {
        handlePostComment();
      };

    const handleSeeAllComments = () => {
        setShowAllComments(true);
    };
    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }
    if (hasError) {
        return (
            <ErrorScreen />
        )
    }

    return (
        <>
            <View>
                <View style={styles.discussionCont}>
                    <Image style={styles.avatarImage} source={{ uri: `http://192.168.1.67:8080/avatar.png` }} accessibilityLabel="event name" />
                    <TextInput style={styles.input} placeholder="Start a discussion..." placeholderTextColor="gray" value={text} onChangeText={setText} />
                </View>
                <View style={[styles.buttonCont, styles.border]}>
                    <Button style={styles.button} title="Submit" onPress={handlePress} />
                </View>

                {successData && (
                    <>
                        {showAllComments ? (
                            comments.map((comment) => (
                                <DisplayComments key={comment.id} comment={comment} />
                            ))
                        ) : (
                            comments.slice(0, 3).map((comment) => (
                                <DisplayComments key={comment.id} comment={comment} />
                            ))
                        )}
                        {!showAllComments && comments.length > 5 && (
                            <Button title="See All" onPress={handleSeeAllComments} />
                        )}
                    </>
                )}
            </View>
        </>
    )
}
export default Comments;

const styles = StyleSheet.create({
    discussionCont: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'flex-end',
    },
    avatarImage: {
        width: 50,
        height: 50
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#7a6f6f4d',
        color: 'white'
    },
    buttonCont: {
        paddingHorizontal: 10,
        display: 'flex',
        alignItems: 'flex-end',
        marginVertical: 10,
    },
    border: {
        borderWidth: 1,
        borderBottomColor: '#7a6f6f4a',
        paddingBottom: 20
      },
});