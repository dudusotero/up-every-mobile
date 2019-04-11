import { StyleSheet, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? getStatusBarHeight() : 0,
    flex: 1
  },

  backButton: {
    marginTop: 40,
    flexDirection: "row"
  },

  backButtonText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "bold"
  },

  list: {
    marginTop: 30
  },

  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20
  },

  separator: {
    height: 1,
    backgroundColor: "#EEE"
  },

  boxInfo: {
    flexDirection: "row",
    alignItems: "center"
  },

  boxTitle: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10
  },

  boxDate: {
    fontSize: 14,
    color: "#666"
  }
});

export default styles;
