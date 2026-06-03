import { Stack } from "expo-router";
import AddCompanyScreen from "../screens/AddCompanyScreen";

export default function AddCompanyRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AddCompanyScreen />
    </>
  );
}
