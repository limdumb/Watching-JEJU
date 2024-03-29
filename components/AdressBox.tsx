import { StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

interface AdressBoxProps {
  name: string;
  adress: string;
  setJibunAdressValue: React.Dispatch<React.SetStateAction<string>>;
  setRoadAdressValue: React.Dispatch<React.SetStateAction<string>>;
  jibunAdressValue: string;
  roadAdressValue: string;
}

export default function AdressBox(props: AdressBoxProps) {
  const onAdressClicked = () => {
    props.setJibunAdressValue(props.adress);
    props.setRoadAdressValue(props.adress);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => onAdressClicked()}>
      <CustomText children={props.name} fontSize={"20px"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: 85,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});