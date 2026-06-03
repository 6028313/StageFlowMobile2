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

export default function AddCompanyScreen() {
  const router = useRouter();

  const saveCompany = () => {
    Alert.alert("Succes", "Bedrijf opgeslagen.");
    router.back();
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Bedrijf</Text>
            <TextInput style={styles.input} placeholder="Bedrijfsnaam *" />
            <TextInput style={styles.input} placeholder="Logo URL" />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Adres</Text>
            <TextInput style={styles.input} placeholder="Adres *" />

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Huisnummer *"
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Toevoeging"
              />
            </View>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Postcode *"
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Stad *"
              />
            </View>

            <TextInput style={styles.input} placeholder="Land *" />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Locatie</Text>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Latitude *"
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Longitude *"
              />
            </View>

            <TextInput style={styles.input} placeholder="Tijdzone *" />
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

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#07143d",
  },

  closeButton: {
    color: "#0647b7",
    fontSize: 16,
  },

  saveButton: {
    color: "#0647b7",
    fontSize: 16,
    fontWeight: "700",
  },

  form: {
    padding: 18,
    paddingBottom: 180,
  },

  formSection: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  halfInput: {
    flex: 1,
  },

  input: {
    backgroundColor: "#ffffff",
    minHeight: 54,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#cfd4dc",
    fontSize: 15,
  },
});
