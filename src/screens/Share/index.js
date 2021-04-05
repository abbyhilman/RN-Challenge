import React from "react";
import { Text, View } from "react-native";
import { IconLabel } from "../../components";

const Share = () => {
    return (
        <View style={styles.container}>
        <IconLabel
          icon="facebook-f"
          label="Share to Facebook"
          bgColor="#4267b2"
        />

        <IconLabel
          icon="google-plus"
          label="Share to Google+"
          bgColor="#db4437"
        />

        <IconLabel icon="twitter" label="Share to Twitter" bgColor="#1B95E0" />

        <IconLabel
          icon="linkedin"
          label="Share to LinkedIn"
          bgColor="#0077B5"
        />
      </View>
    )
}

export default Share

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
};
