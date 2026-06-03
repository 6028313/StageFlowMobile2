import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COMPANIES_API_URL = "https://to.internus.info/api/apicompanies";

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [companyFormVisible, setCompanyFormVisible] = useState(true);
  const [mapVisible, setMapVisible] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [addition, setAddition] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [companyLatitude, setCompanyLatitude] = useState("");
  const [companyLongitude, setCompanyLongitude] = useState("");
  const [timezone, setTimezone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  const getCompanyId = (company) =>
    company.companyId ?? company.id ?? company.apiCompanyId;

  const loadCompanies = async () => {
    try {
      const response = await fetch(COMPANIES_API_URL);
      const data = await response.json();
      setCompanies(data);
    } catch {
      Alert.alert("Fout", "Bedrijven konden niet worden geladen.");
    }
  };

  const resetCompanyForm = () => {
    setCompanyId(null);
    setCompanyName("");
    setAddress("");
    setHouseNumber("");
    setAddition("");
    setPostalCode("");
    setCity("");
    setCountry("");
    setLogoUrl("");
    setCompanyLatitude("");
    setCompanyLongitude("");
    setTimezone("");
  };

  const openCreateCompany = () => {
    resetCompanyForm();
    setCompanyFormVisible(true);
  };

  const openEditCompany = (company) => {
    setCompanyId(getCompanyId(company));
    setCompanyName(company.companyName ?? company.name ?? "");
    setAddress(company.address ?? "");
    setHouseNumber(String(company.houseNumber ?? company.number ?? ""));
    setAddition(company.addition ?? "");
    setPostalCode(company.postalCode ?? "");
    setCity(company.city ?? "");
    setCountry(company.country ?? "");
    setLogoUrl(company.logoUrl ?? company.logo ?? "");
    setCompanyLatitude(String(company.latitude ?? ""));
    setCompanyLongitude(String(company.longitude ?? ""));
    setTimezone(company.timezone ?? "");
    setCompanyFormVisible(true);
  };

  const saveCompany = async () => {
    if (
      !companyName ||
      !address ||
      !houseNumber ||
      !postalCode ||
      !city ||
      !country
    ) {
      Alert.alert("Let op", "Vul alle verplichte velden in.");
      return;
    }

    setLoading(true);

    const company = {
      name: companyName.trim(),
      address: address.trim(),
      number: houseNumber.trim(),
      addition: addition.trim(),
      postalCode: postalCode.trim(),
      city: city.trim(),
      country: country.trim(),
      logo: logoUrl.trim(),
      latitude: companyLatitude.trim(),
      longitude: companyLongitude.trim(),
      timezone: timezone.trim(),
    };

    try {
      const response = await fetch(
        companyId ? `${COMPANIES_API_URL}/${companyId}` : COMPANIES_API_URL,
        {
          method: companyId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(company),
        },
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText);
      }

      Alert.alert(
        "Succes",
        companyId ? "Bedrijf gewijzigd." : "Bedrijf toegevoegd.",
      );
      setCompanyFormVisible(false);
      resetCompanyForm();
      loadCompanies();
    } catch (error) {
      Alert.alert("Fout", `Bedrijf opslaan is mislukt.\n\n${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = () => {
    Alert.alert(
      "Verwijderen",
      "Weet je zeker dat je dit bedrijf wilt verwijderen?",
      [
        { text: "Annuleren", style: "cancel" },
        {
          text: "Verwijderen",
          style: "destructive",
          onPress: async () => {
            try {
              await fetch(`${COMPANIES_API_URL}/${companyId}`, {
                method: "DELETE",
              });

              setCompanyFormVisible(false);
              resetCompanyForm();
              loadCompanies();
            } catch {
              Alert.alert("Fout", "Bedrijf verwijderen is mislukt.");
            }
          },
        },
      ],
    );
  };

  const validCompanies = companies.filter(
    (company) =>
      company.latitude &&
      company.longitude &&
      !isNaN(parseFloat(company.latitude)) &&
      !isNaN(parseFloat(company.longitude)),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stagebedrijven</Text>
      </View>

      <FlatList
        data={companies}
        keyExtractor={(item, index) =>
          getCompanyId(item)?.toString() || index.toString()
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => openEditCompany(item)}
          >
            {item.logoUrl || item.logo ? (
              <Image
                source={{ uri: item.logoUrl || item.logo }}
                style={styles.logo}
              />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoLetter}>
                  {(item.companyName || item.name || "?")
                    .charAt(0)
                    .toUpperCase()}
                </Text>
              </View>
            )}

            <View style={styles.info}>
              <Text style={styles.companyName}>
                {item.companyName || item.name}
              </Text>
              <Text style={styles.text}>
                {item.address} {item.houseNumber || item.number}
                {item.addition ? ` ${item.addition}` : ""}
              </Text>
              <Text style={styles.text}>
                {item.postalCode} {item.city}, {item.country}
              </Text>
              <Text style={styles.timezone}>Tijdzone: {item.timezone}</Text>
              <Text style={styles.editText}>Tik om te wijzigen</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerIconActive}>🏢</Text>
          <Text style={styles.footerTextActive}>Bedrijven</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => setMapVisible(true)}
        >
          <Text style={styles.footerIcon}>🌍</Text>
          <Text style={styles.footerText}>Kaart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem} onPress={openCreateCompany}>
          <Text style={styles.footerIcon}>＋</Text>
          <Text style={styles.footerText}>Toevoegen</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={mapVisible} animationType="slide">
        <SafeAreaView style={styles.container}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setMapVisible(false)}>
              <Text style={styles.closeButton}>Sluiten</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Kaart</Text>
            <View style={{ width: 60 }} />
          </View>
        </SafeAreaView>
      </Modal>

      <Modal visible={companyFormVisible} animationType="slide">
        <SafeAreaView style={styles.container}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setCompanyFormVisible(false)}>
              <Text style={styles.closeButton}>Annuleer</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              {companyId ? "Bedrijf wijzigen" : "Bedrijf toevoegen"}
            </Text>

            <TouchableOpacity onPress={saveCompany} disabled={loading}>
              <Text style={styles.saveButton}>
                {loading ? "Bezig..." : "Opslaan"}
              </Text>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              contentContainerStyle={styles.form}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Bedrijf</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Bedrijfsnaam *"
                  value={companyName}
                  onChangeText={setCompanyName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Logo URL"
                  value={logoUrl}
                  onChangeText={setLogoUrl}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Adres</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Adres *"
                  value={address}
                  onChangeText={setAddress}
                />

                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Huisnummer *"
                    value={houseNumber}
                    onChangeText={setHouseNumber}
                  />
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Toevoeging"
                    value={addition}
                    onChangeText={setAddition}
                  />
                </View>

                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Postcode *"
                    value={postalCode}
                    onChangeText={setPostalCode}
                  />
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Stad *"
                    value={city}
                    onChangeText={setCity}
                  />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Land *"
                  value={country}
                  onChangeText={setCountry}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Locatie</Text>

                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Latitude *"
                    value={companyLatitude}
                    onChangeText={setCompanyLatitude}
                  />
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Longitude *"
                    value={companyLongitude}
                    onChangeText={setCompanyLongitude}
                  />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Tijdzone *"
                  value={timezone}
                  onChangeText={setTimezone}
                />
              </View>

              {companyId && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={deleteCompany}
                >
                  <Text style={styles.deleteText}>Bedrijf verwijderen</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8fc" },
  header: { paddingTop: 30, paddingHorizontal: 24, paddingBottom: 20 },
  title: { fontSize: 34, fontWeight: "bold", color: "#07143d" },
  list: { paddingHorizontal: 18, paddingBottom: 110 },

  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: { width: 80, height: 80, borderRadius: 16, marginRight: 16 },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
  },
  logoLetter: { fontSize: 30, fontWeight: "bold", color: "#0647b7" },
  info: { flex: 1 },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#07143d",
    marginBottom: 8,
  },
  text: { fontSize: 14, color: "#1f2a44", marginBottom: 5 },
  timezone: { fontSize: 14, color: "#0647b7", fontWeight: "600", marginTop: 6 },
  editText: { fontSize: 13, color: "#6b7280", marginTop: 8 },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerItem: { alignItems: "center" },
  footerIconActive: { fontSize: 28, color: "#0647b7" },
  footerIcon: { fontSize: 28, color: "#6b7280" },
  footerTextActive: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0647b7",
    marginTop: 4,
  },
  footerText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
    marginTop: 4,
  },

  modalHeader: {
    height: 60,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#07143d" },
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
  deleteButton: {
    backgroundColor: "#fee2e2",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  deleteText: { color: "#dc2626", fontWeight: "700" },
  map: { flex: 1 },
});
