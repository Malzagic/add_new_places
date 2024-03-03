import { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { verifiedPermission } from "../../util/verifiedPermission";

import OutlineButton from "../UI/OutlineButton";

import { Colors } from "../../constants/colors";

export default function ImagePicker({ onImagePicked }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const takeImageHandler = async () => {
    const hasPermission = await verifiedPermission(
      cameraPermissionInformation,
      requestPermission,
      PermissionStatus
    );

    if (!hasPermission) return;

    try {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      // Check if the user canceled the operation
      if (image === null) {
        return; // Do nothing if the user canceled
      }

      setPickedImage(image.assets[0].uri);
      onImagePicked(image.assets[0].uri);
    } catch (error) {
      return;
    }
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
