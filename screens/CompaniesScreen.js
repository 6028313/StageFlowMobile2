import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CompanyCard from "../components/CompanyCard";

const API_URL = "https://to.internus.info/api/apicompanies";

export default function CompaniesScreen() {
  const router = useRouter();

  const [companies, setCompanies] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("API fout");
      }

      const data = await response.json();
      const companiesData = Array.isArray(data) ? data : data.data;

      setCompanies(companiesData || []);
    } catch (err) {
      setError("Er is iets misgegaan bij het ophalen van de bedrijven.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateCompany = () => {
    router.push("/add-company");
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Bedrijven worden geladen...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Oeps!</Text>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Stagebedrijven</Text>
      </View>

      <FlatList
        data={companies}
        keyExtractor={(item, index) =>
          item.apiCompanyId?.toString() ||
          item.id?.toString() ||
          item.apiCompanyID?.toString() ||
          index.toString()
        }
        renderItem={({ item }) => (
          <CompanyCard company={item} currentTime={currentTime} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerIconActive}>🏢</Text>
          <Text style={styles.footerTextActive}>Bedrijven</Text>
        </View>

        <View style={styles.footerItem}>
          <Text style={styles.footerIcon}>🌍</Text>
          <Text style={styles.footerText}>Kaart</Text>
        </View>

        <TouchableOpacity style={styles.footerItem} onPress={openCreateCompany}>
          <Text style={styles.footerIcon}>＋</Text>
          <Text style={styles.footerText}>Toevoegen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fc",
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#f6f8fc",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#1f2a44",
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#07143d",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#1f2a44",
    textAlign: "center",
  },
  header: {
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#07143d",
  },
  list: {
    paddingHorizontal: 18,
    paddingBottom: 110,
  },
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
  footerItem: {
    alignItems: "center",
  },
  footerIconActive: {
    fontSize: 28,
    color: "#0647b7",
  },
  footerIcon: {
    fontSize: 28,
    color: "#6b7280",
  },
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
});
