import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, Button, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./context";
import {
  SignIn,
  CreateAccount,
  Search,
  Home,
  Details,
  Search2,
  Profile,
  Splash,
} from "./Screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "SignIn Page" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "CreateAccount Page" }}
    />
  </AuthStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackSceen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);

const SearchStack = createStackNavigator();
const SearchStackSceen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackSceen} />
    <Tabs.Screen name="Profile" component={SearchStackSceen} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{ animationEnabled: false }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{ animationEnabled: false }}
      />
    )}
  </RootStack.Navigator>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("asd");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asd");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1400);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
