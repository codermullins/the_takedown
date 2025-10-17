import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

import DropDownPicker from "react-native-dropdown-picker";
import { FirebaseError } from "firebase/app";
import SchoolDropdown from "@/components/SchoolDropdown";
import auth from "@react-native-firebase/auth";

function register({}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [sport, setSport] = useState<string | null>(null);
  const [parent, setParent] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [shirt, setShirt] = useState("");
  const [pant, setPant] = useState("");
  const [shoe, setShoe] = useState("");
  const [grade, setGrade] = useState("");

  const handleSelection = (sportId: string | null) => {
    console.log("Selected sport:", sportId);
    setSport(sportId);
  };

  const [items, setItems] = useState([
    { label: "Coach", value: "coach" },
    { label: "Athlete", value: "athlete" },
  ]);

  const signUp = async () => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          userCredential.user.getIdToken().then((idToken) => {
            fetch("http://192.168.1.68:4000/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idToken,
                role,
                name,
                parent,
                sport,
                phone,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Registration successful:", data);
              });
          });
        });
      //Add the rest of the fields to Mongo
      alert("Check your emails!");
      console.log(role);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.text}>Create and Account </Text>
        <SchoolDropdown onSport={handleSelection} />
        <DropDownPicker
          open={open}
          value={role}
          items={items}
          setOpen={setOpen}
          setValue={setRole}
          setItems={setItems}
          style={styles.input}
        />
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Name"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Only show If Role of Athlete is selected */}
        {/* {role === 'athlete' && (
                <>
                <TextInput style={styles.input}
                value={parent}
                placeholder='Parent' 
                onChangeText={setParent}/> 

                <TextInput style={styles.input}
                value={shirt}
                placeholder='Shirt Size' 
                onChangeText={setShirt}/>

                <TextInput style={styles.input}
                value={pant}
                placeholder='Pant Size' 
                onChangeText={setPant}/>

                <TextInput style={styles.input}
                value={shoe}
                placeholder='Shoe Size' 
                onChangeText={setShoe}/>

                <TextInput style={styles.input}
                value={grade}
                placeholder='Grade'
                onChangeText={setGrade}/>
                </>
                )} */}

        <TextInput
          style={styles.input}
          value={phone}
          placeholder="Phone"
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button onPress={signUp} title="Register" />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 50,
    flex: 1,
  },
  input: {
    marginVertical: 4,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    zIndex: 10,
  },
  link: {
    color: "blue",
  },
  text: {
    marginTop: 75,
    fontSize: 30,
    marginBottom: 5,
  },
  btn: {
    borderRadius: 5,
  },
});

export default register;
