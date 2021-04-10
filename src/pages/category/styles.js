import { StyleSheet } from "react-native";

import { primary } from "../../theme/colors";

export default StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    h1: {
        fontSize: 35,
        fontWeight: "bold",
    },

    h2: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    product: {
        marginBottom: 10,
    },

    searchInput: {
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 10,
    },
});
