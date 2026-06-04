import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function KaartScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20,
          longitude: 0,
          latitudeDelta: 120,
          longitudeDelta: 120,
        }}
      >
        <Marker
          coordinate={{
            latitude: 52.0116,
            longitude: 4.5347,
          }}
          title="Smart"
          description="Van der Waalsstraat 18, Bleiswijk"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
