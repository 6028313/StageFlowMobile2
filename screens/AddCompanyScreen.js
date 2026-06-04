import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = "https://to.internus.info/api/apicompanies";

export default function AddCompanyScreen() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [addition, setAddition] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [timezone, setTimezone] = useState("");

  const saveCompany = async () => {
    if (!companyName || !address || !houseNumber || !postalCode || !city || !country) {
      Alert.alert("Let op", "Vul alle verplichte velden in.");
      return;
    }

   const company = {
  name: companyName.trim(),
  address: address.trim(),
  number: houseNumber.trim(),
  addition: addition.trim(),
  postalCode: postalCode.trim(),
  city: city.trim(),
  country: country.trim(),

  logo: logoUrl.trim(),
  logoUrl: logoUrl.trim(),
  logoURL: logoUrl.trim(),

  latitude: latitude.trim(),
  longitude: longitude.trim(),
  timezone: timezone.trim(),
};

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text);
      }

      Alert.alert("Succes", "Bedrijf toegevoegd.");
      router.back();
    } catch (error) {
      Alert.alert("Fout", `Opslaan mislukt.\n\n${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.closeButton}>Annuleer</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Bedrijf toevoegen</Text>

        <TouchableOpacity onPress={saveCompany}>
          <Text style={styles.saveButton}>Opslaan</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Bedrijf</Text>
            <TextInput style={styles.input} placeholder="Bedrijfsnaam *" placeholderTextColor="#374151" value={companyName} onChangeText={setCompanyName} />
            <TextInput style={styles.input} placeholder="Logo URL" placeholderTextColor="#374151" value={logoUrl} onChangeText={setLogoUrl} />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Adres</Text>
            <TextInput style={styles.input} placeholder="Adres *" placeholderTextColor="#374151" value={address} onChangeText={setAddress} />

            <View style={styles.row}>
              <TextInput style={[styles.input, styles.halfInput]} placeholder="Huisnummer *" placeholderTextColor="#374151" value={houseNumber} onChangeText={setHouseNumber} />
              <TextInput style={[styles.input, styles.halfInput]} placeholder="Toevoeging" placeholderTextColor="#374151" value={addition} onChangeText={setAddition} />
            </View>

            <View style={styles.row}>
              <TextInput style={[styles.input, styles.halfInput]} placeholder="Postcode *" placeholderTextColor="#374151" value={postalCode} onChangeText={setPostalCode} />
              <TextInput style={[styles.input, styles.halfInput]} placeholder="Stad *" placeholderTextColor="#374151" value={city} onChangeText={setCity} />
            </View>

            <TextInput style={styles.input} placeholder="Land *" placeholderTextColor="#374151" value={country} onChangeText={setCountry} />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Locatie</Text>

            <View style={styles.row}>
              <TextInput style={[styles.input, styles.halfInput]} placeholder="Latitude *" placeholderTextColor="#374151" value={latitude} onChangeText={setLatitude} />
              <TextInput style={[styles.input, styles.halfInput]} placeholder="Longitude *" placeholderTextColor="#374151" value={longitude} onChangeText={setLongitude} />
            </View>

            <TextInput style={styles.input} placeholder="Tijdzone *" placeholderTextColor="#374151" value={timezone} onChangeText={setTimezone} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8fc" },
  header: {
    height: 60,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: { fontSize: 18, fontWeight: "700", color: "#07143d" },
  closeButton: { color: "#0647b7", fontSize: 16 },
  saveButton: { color: "#0647b7", fontSize: 16, fontWeight: "700" },
  form: { padding: 18, paddingBottom: 180 },
  formSection: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: "#111827", marginBottom: 14 },
  row: { flexDirection: "row", gap: 10 },
  halfInput: { flex: 1 },
  input: {
    backgroundColor: "#ffffff",
    color: "#111827",
    minHeight: 54,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#cfd4dc",
    fontSize: 15,
  },
});