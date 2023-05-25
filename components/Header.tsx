import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, Button } from "react-native";
import styled from "styled-components/native";
import { MainScreenNavigationProps } from "../pages/MainView";
import Icon from "react-native-vector-icons/FontAwesome";

const HeaderContainer = styled.View`
  height: 160px;
  width: 100%;
  background-color: white;
`;

interface TabType {
  tabName: string;
  navScreen: "MainView" | "CafeSearchView" | "CafeSuggestView";
}

export default function Header() {
  const navigate = useNavigation<MainScreenNavigationProps>();

  const tabArray: TabType[] = [
    { tabName: "지도", navScreen: "MainView" },
    { tabName: "카페검색", navScreen: "CafeSearchView" },
    { tabName: "추천카페", navScreen: "CafeSuggestView" },
  ];

  return (
    <HeaderContainer>
      <View style={styles.headerTopContainer}>
        <View style={styles.headerTop}>
          <Text>☁️Watching JEJU</Text>
          <Icon name="user-circle-o" size={30} />
        </View>
      </View>
      <View style={styles.tabContainer}>
        {tabArray.map((el) => {
          return (
            <Button
              key={el.tabName}
              color={"black"}
              title={el.tabName}
              onPress={() => {
                navigate.navigate(el.navScreen);
              }}
            />
          );
        })}
      </View>
    </HeaderContainer>
  );
}

const styles = StyleSheet.create({
  headerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 48,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    height: "70%",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 5,
    width: "100%",
  },
});
