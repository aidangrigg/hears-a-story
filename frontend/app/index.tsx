import { Text, View } from "react-native";
import { Redirect } from "expo-router";

const StartPage = () => {
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text>Edit app/index.tsx to edit this screen.</Text>
    // </View>
    return <Redirect href="/storyPage" />;
};

export default StartPage;




