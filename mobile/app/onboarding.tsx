import { View, Text, Pressable, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";

const DRIVER_NAME = "MCH";

export default function OnboardingScreen() {
  const router = useRouter();

  const enterApp = () => router.replace("/");

  return (
    <View className="flex-1 bg-background">
      <ImageBackground
        source={require("../assets/images/Onboarding.png")}
        className="flex-1"
        resizeMode="cover"
      >
        <LinearGradient
          colors={["transparent", "rgba(28,28,28,0.55)", "#F5F6F6"]}
          locations={[0, 0.55, 1]}
          className="flex-1 justify-end"
        >
          <SafeAreaView edges={["bottom"]}>
            <View className="px-6 pt-16 pb-4">
              <Text
                className="text-primary text-4xl leading-[44px]"
                style={{ fontFamily: "Poppins_600SemiBold" }}
              >
                Livraisons simples,{"\n"}chaque jour,{"\n"}
                <Text className="text-accent-foreground">{DRIVER_NAME}</Text>
              </Text>

              <Text
                className="text-neutral-foreground text-base mt-3"
                style={{ fontFamily: "Poppins_400Regular" }}
              >
                Gérez vos livraisons facilement. Suivi de vos livraisons pour
                les livreurs.
              </Text>

              <Pressable
                onPress={enterApp}
                className="btn-primary mt-8"
                accessibilityRole="button"
              >
                <Text
                  className="text-primary-foreground text-base"
                  style={{ fontFamily: "Poppins_500Medium" }}
                >
                  Commencer
                </Text>
                <ArrowRight size={18} color="#FFFFFF" />
              </Pressable>

              <Pressable
                onPress={enterApp}
                className="mt-4 items-center"
                accessibilityRole="button"
              >
                <Text
                  className="text-primary text-sm"
                  style={{ fontFamily: "Poppins_500Medium" }}
                >
                  Se connecter
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
