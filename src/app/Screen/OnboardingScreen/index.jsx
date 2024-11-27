import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native";
import { firestore } from "../../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { useUser } from "../../contexts/UserContext";
import Slider from "@react-native-community/slider";
import ModalSelector from "react-native-modal-selector";

const Onboarding = ({ navigation }) => {
  const { userId } = useUser();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    birthDate: new Date(),
    gender: "",
    experienceLevel: "",
    goal: "",
    height: "",
    weight: "",
  });

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      try {
        const userDoc = doc(firestore, "users", userId);
        await updateDoc(userDoc, formData);
        Alert.alert("Sucesso", "Onboarding completo!");
        navigation.navigate("Stats");
      } catch (error) {
        console.error("Erro ao salvar dados:", error);
        Alert.alert("Erro", "Ocorreu um erro ao salvar seus dados.");
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const CustomPicker = ({ label, selectedValue, items, onValueChange }) => {
    const [isPickerVisible, setPickerVisible] = useState(false);
  
    return (
      <View style={styles.pickerWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.displayBox}
          onPress={() => setPickerVisible(true)}>
          <Text style={styles.displayText}>
            {selectedValue ? `${selectedValue}` : "Selecione"}
          </Text>
        </TouchableOpacity>
  
        {/* Picker Modal */}
        {isPickerVisible && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={isPickerVisible}>
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setPickerVisible(false)}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(value) => {
                  onValueChange(value);
                  setPickerVisible(false); // Fechar picker após selecionar
                }}>
                {items.map((item) => (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={item.value}
                  />
                ))}
              </Picker>
            </View>
          </Modal>
        )}
      </View>
    );
  };

  const steps = [
    {
      title: "Qual sua data de nascimento?",
      component: (
        <DateTimePicker
          value={formData.birthDate}
          mode="date"
          display="spinner"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || formData.birthDate;
            setFormData((prev) => ({ ...prev, birthDate: currentDate }));
          }}
        />
      ),
    },
    {
      title: "Como você se identifica?",
      component: (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(itemValue) =>
              setFormData((prev) => ({ ...prev, gender: itemValue }))
            }
          >
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
            <Picker.Item
              label="Prefiro não responder"
              value="Prefiro não responder"
            />
          </Picker>
        </View>
      ),
    },
    {
      title: "Qual seu nível de experiência?",
      component: (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.experienceLevel}
            onValueChange={(itemValue) =>
              setFormData((prev) => ({ ...prev, experienceLevel: itemValue }))
            }
          >
            <Picker.Item label="Iniciante" value="Iniciante" />
            <Picker.Item label="Intermediário" value="Intermediário" />
            <Picker.Item label="Avançado" value="Avançado" />
          </Picker>
        </View>
      ),
    },
    {
      title: "Qual seu objetivo principal?",
      component: (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.goal}
            onValueChange={(itemValue) =>
              setFormData((prev) => ({ ...prev, goal: itemValue }))
            }
          >
            <Picker.Item label="Perder peso" value="Perder peso" />
            <Picker.Item label="Ganhar massa" value="Ganhar massa" />
            <Picker.Item
              label="Melhorar condicionamento"
              value="Melhorar condicionamento"
            />
            <Picker.Item label="Manter saúde" value="Manter saúde" />
          </Picker>
        </View>
      ),
    },
    {
      title: "Qual sua altura e peso?",
      component: (
        <View style={styles.container}>
            <View style={styles.selectorWrapper}>
                <Text style={styles.label}>Altura</Text>
                <ModalSelector
                data={Array.from({ length: 151 }, (_, i) => ({
                    key: i + 100,
                    label: `${i + 100} cm`,
                }))}
                initValue="Selecione sua altura"
                onChange={(option) =>
                    setFormData((prev) => ({ ...prev, height: option.key }))
                }
                style={styles.selector}
                initValueTextStyle={styles.initValueText}
                optionTextStyle={styles.optionText}
                />
            </View>
            <View style={styles.selectorWrapper}>
                <Text style={styles.label}>Peso</Text>
                <ModalSelector
                data={Array.from({ length: 171 }, (_, i) => ({
                    key: i + 30,
                    label: `${i + 30} kg`,
                }))}
                initValue="Selecione seu peso"
                onChange={(option) =>
                    setFormData((prev) => ({ ...prev, weight: option.key }))
                }
                style={styles.selector}
                initValueTextStyle={styles.initValueText}
                optionTextStyle={styles.optionText}
                />
            </View>
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{steps[currentStep].title}</Text>
      {steps[currentStep].component}
      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <Button title="Voltar" onPress={handleBack} color="gray" />
        )}
        <Button
          title={currentStep === steps.length - 1 ? "Concluir" : "Próximo"}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  pickerContainer: {
    width: "100%", // Para ocupar toda a largura disponível
    maxWidth: 400, // Limitar em telas maiores
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15, // Espaço entre elementos
    backgroundColor: "#fff", // Fundo branco
  },
  picker: {
    height: 50, // Altura do Picker
    paddingHorizontal: 10, // Espaçamento interno
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    maxWidth: 400,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 400,
  },
  pickerGroup: {
    marginBottom: 20,
  },
  pickerWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  displayBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  displayText: {
    fontSize: 16,
    color: "#555",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  selectorWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  selector: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  initValueText: {
    fontSize: 16,
    color: "#555",
  },
  optionText: {
    fontSize: 16,
  },
});

export default Onboarding;
