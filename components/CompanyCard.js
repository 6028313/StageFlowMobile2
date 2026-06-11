import moment from "moment-timezone";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function CompanyCard({ company, currentTime }) {
  const companyName = company.name || "Onbekend bedrijf";
  const address = company.address || "";
  const houseNumber = company.number || "";
  const addition = company.addition || "";
  const postalCode = company.postalCode || "";
  const city = company.city || "";
  const country = company.country || "";
  const logo = company.logoUrl || "";

  let timezone = company.timeZone || "Europe/Amsterdam";

  if (!moment.tz.zone(timezone)) {
    timezone = "Europe/Amsterdam";
  }

  const localTime = moment
    .tz(currentTime || new Date(), timezone)
    .format("HH:mm:ss");

  return (
    <View style={styles.card}>
      {logo ? (
        <Image source={{ uri: logo }} style={styles.logo} />
      ) : (
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>🏢</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{companyName}</Text>

        <Text style={styles.text}>
          {address} {houseNumber}
          {addition ? ` ${addition}` : ""}
        </Text>

        <Text style={styles.text}>
          {postalCode} {city}
          {country ? `, ${country}` : ""}
        </Text>

        <View style={styles.line} />

        <Text style={styles.text}>
          🌐 Tijdzone: <Text style={styles.blue}>{timezone}</Text>
        </Text>

        <Text style={styles.text}>
          🕒 Lokale tijd: <Text style={styles.green}>{localTime}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: "#e5e7eb",
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 32,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#07143d",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#1f2a44",
    marginBottom: 5,
  },
  blue: {
    color: "#0647b7",
    fontWeight: "600",
  },
  green: {
    color: "#0b7a35",
    fontWeight: "700",
  },
  line: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 8,
  },
});
