import { View, StyleSheet } from 'react-native';
import DisplayData from './DisplayData';

function DisplayCategoryData({ categoryData }) {
    return (
        <>
            <View style={styles.container}>
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
});