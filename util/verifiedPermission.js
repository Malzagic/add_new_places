import { Alert } from "react-native";

export async function verifiedPermission(device, request, permissionStatus) {
  if (device.status === permissionStatus.UNDETERMINED) {
    const permissionResponse = await request();

    return permissionResponse.granted;
  }

  if (device.status === permissionStatus.DENIED) {
    Alert.alert(
      "Insufficient Permission!",
      "You neet to grant camera permissions to use this app"
    );
    return false;
  }

  return true;
}
