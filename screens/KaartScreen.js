import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const API_URL = "https://to.internus.info/api/apicompanies";

export default function KaartScreen() {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    const list = Array.isArray(data) ? data : data.data;
    setCompanies(list || []);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCompanies();
    }, []),
  );

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
        {companies.map((company, index) => {
          const lat = parseFloat(company.latitude);
          const lng = parseFloat(company.longitude);

          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker
              key={company.id || company.apiCompanyId || index}
              coordinate={{ latitude: lat, longitude: lng }}
              title={company.name || company.companyName || "Bedrijf"}
              description={company.city || company.address || ""}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
