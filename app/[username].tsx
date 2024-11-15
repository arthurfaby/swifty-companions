import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useIntraStore } from "@/stores/intra_store";
import { User42 } from "@/types/User42";
import { Skill } from "@/types/Skill";
import { Colors } from "@/constants/Colors";
import { ProjectStatus } from "@/types/ProjectStatus";

export default function UsernamePage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<ProjectStatus[]>([]);
  const [level, setLevel] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [correctionPoints, setCorrectionPoints] = useState<number>(0);
  const [wallet, setWallet] = useState<number>(0);
  const [cursus, setCursus] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  const { username } = useLocalSearchParams();
  const { accessToken, baseUrl, setAccessToken } = useIntraStore();

  // Fetch the access token from the 42 API if it's not already set
  useEffect(() => {
    const getAccessToken = async () => {
      if (accessToken === "") {
        try {
          const response = await fetch("https://api.intra.42.fr/oauth/token", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grant_type: "client_credentials",
              client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
              client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
            }),
          });
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setAccessToken(data.access_token);
        } catch (error) {
        }
      }
    };
    getAccessToken();
  }, []);

  // Fetch the user data
  // Récupérer les données de l'utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken && username) {
        try {
          console.log(`${baseUrl}/v2/users/${username}`);
          const response = await fetch(`${baseUrl}/v2/users/${username}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
          const userData: User42 = await response.json();
          if (response.ok) {
            const cursusUser = userData.cursus_users.find((cursusUser) => cursusUser.cursus.slug === "42cursus") ?? userData.cursus_users[0];
            setSkills(cursusUser?.skills ?? []);
            setProjects(userData.projects_users ?? []);
            setLevel(cursusUser?.level ?? 0);
            setCursus(cursusUser?.cursus.name ?? "Unknown cursus");
            setName(userData.usual_full_name ?? userData.login);
            setImage(userData.image.link ?? "https://42.fr/wp-content/uploads/2021/08/42.jpg");
            setCorrectionPoints(userData.correction_point);
            setWallet(userData.wallet);
            setIsLoading(false);
          } else {
            throw new Error("Impossible de récupérer les données de l'utilisateur");
          }
        } catch (error) {
          setIsLoading(false);
          router.dismissAll();
          if (error instanceof Error) {
            Alert.alert("Erreur", error.message);
          } else {
            Alert.alert("Erreur", "Une erreur inconnue est survenue");
          }
        }
      }
    };
    fetchUserData();
  }, [accessToken, username, baseUrl]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <>
            <View style={styles.headerContainer}>
              {image && <Image source={{ uri: image }} style={styles.headerImage} />}
              <View style={styles.headerContent}>
                <Text style={styles.headerText}>{name}</Text>
                <Text style={styles.headerText}>Points de correction: {correctionPoints}</Text>
                <Text style={styles.headerText}>{wallet} ₳</Text>
                <Text style={styles.headerText}>Niveau: {level} ({cursus})</Text>
              </View>
            </View>
            <ScrollView style={styles.projectsContainer}>
              {projects.filter((project) => project.status === "finished").sort((a, b) => b.final_mark! - a.final_mark!).map((project) => (
                <View style={styles.projectItem} key={project.id}>
                  <Text style={styles.projectName}>{project.project.name}</Text>
                  <Text style={styles.projectMark}>{project.final_mark}</Text>
                </View>
              ))}
            </ScrollView>
            <ScrollView style={styles.skillsContainer}>
              {skills.map((skill) => (
                <View style={styles.skillItem} key={skill.id}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillLevel}>{skill.level}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
  },
  headerImage: {
    width: 100,
    height: 100,
  },
  headerContent: {
    flex: 1,
    flexGrow: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "bold",
  },
  projectsContainer: {
    width: '100%',
    maxHeight: 200
  },
  projectItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  projectMark: {
    fontSize: 16,
    color: "#666",
  },
  skillsContainer: {
    width: '100%',
    maxHeight: 200
  },
  skillItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  skillName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  skillLevel: {
    fontSize: 14,
    color: "#666",
  },
});
