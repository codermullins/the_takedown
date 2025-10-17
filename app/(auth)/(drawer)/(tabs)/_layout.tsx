import { Drawer } from "expo-router/drawer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Provider } from "react-redux";
import ScreenHeader from "../../screenHeader";
import { Tabs } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "../../../store/store";

const Stack = createNativeStackNavigator();

export default function TabLayout() {
  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
          headerStyle: { backgroundColor: "lightblue" },
          headerTitle: () => <ScreenHeader />,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="roster"
          options={{
            title: "Roster",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="users" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="event"
          options={{
            title: "Event",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="calendar" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="video"
          options={{
            title: "Video",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="video-camera" color={color} />
            ),
            // tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="cog" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="athleteProfileScreen"
          options={{
            tabBarButton: () => null,
          }}
        />

        <Tabs.Screen
          name="schedule"
          options={{
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            tabBarButton: () => null,
          }}
        />
      </Tabs>
    </Provider>
  );
}
