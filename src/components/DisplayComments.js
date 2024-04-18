import { Text, View, StyleSheet, Image } from 'react-native';
import {TimeFormat} from '../utils/TimeFormat';
function DisplayComments({ comment }) {
    return (
        <>
            <View style={styles.commentCont} >
                <View style={styles.nameCont} >
                    <Image style={styles.eventImage} source={{ uri: `http://192.168.1.67:8080/avatar.png` }} accessibilityLabel="placeholder" />
                    <Text style={styles.commmentUser}>{comment.user}</Text>
                    <Text style={styles.commmentDate}>. {TimeFormat(comment.created_at)}</Text>
                </View>
                <View >
                    <Text style={styles.commmentData}>{comment.comment}</Text>
                </View>
            </View>
        </>
    )
}
export default DisplayComments;

const styles = StyleSheet.create({
    commentCont :{
        padding: 10,
        margin:10,
        borderColor: 'gray',
        borderStyle: 'solid',
        borderRadius: 15,
        backgroundColor: '#7a6f6f4d'
    },
    nameCont :{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        gap: 20
    },
    eventImage: {
        width: 30,
        height: 30,
        borderRadius: 5
    },
    commmentUser :{
        color:'white'
    },
    commmentDate: {
        color:'white'
    },
    commmentData:{
        color:'white',
        paddingVertical: 10
    }
});