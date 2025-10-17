import {
  Button,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";

import { Link } from "expo-router";
import auth from "@react-native-firebase/auth";

// import axios from 'axios'

// const MongoUrl = 'http://192.168.1.68:4000/schools/getSchool'

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { height } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [schoolName, setSchoolName] = useState("");

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      //Add the rest of the fields to Mongo
      alert("Check your emails!");
    } catch (e: any) {
      const err = e.message;
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      //route function
    } catch (e: any) {
      const err = e.message;
      alert("Sign in failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const getSchool = async () => {

  //     const res = await axios.get(MongoUrl).then((res) => {
  //       const school = res.data
  //       setSchoolName(school[0])
  //     console.log(schoolName)
  //     })
  //   }
  //   getSchool()
  // }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={[styles.logo, { height: height * 0.3 }]}
      />
      <Text style={styles.logoText}>The TakeDown</Text>

      <KeyboardAvoidingView behavior="padding">
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button onPress={signIn} title="Sign In" />
        <Text>
          Create and Account{" "}
          <Link style={styles.link} href="/register">
            Here
          </Link>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20,
    flex: 1,
  },
  input: {
    marginVertical: 4,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  logo: {
    marginTop: 50,
    height: 150,
    maxWidth: 150,
    width: "30%",
    resizeMode: "contain",
  },
  logoText: {
    marginTop: -70,
    fontSize: 30,
    textShadowColor: "white",
    textShadowRadius: 10,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
  },
  link: {
    color: "blue",
  },
  btn: {
    borderRadius: 10,
  },
});
