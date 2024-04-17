import { Text, View, StyleSheet } from 'react-native';
import DisplayData from './DisplayData';

function DisplayCategoryData({ categoryData }) {
    console.log({ categoryData })
    return (
        <>
            <View style={styles.container}>
                {/* <Text style={styles.text}>{data.category}</Text> */}
                {categoryData &&
                    (categoryData.map((category) => (
                        <DisplayData key={category.id} category={category} />
                    )))
                }
            </View>

        </>
    )
}
export default DisplayCategoryData;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
});