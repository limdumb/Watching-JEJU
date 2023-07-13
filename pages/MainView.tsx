import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { type RootStackParamList } from "../App";
import StoreCard, { StoreCardType } from "../components/MainView/StoreCard";
import Header from "../components/Header";
import { emdNameArray } from "../function/emdNameArray";
import AdressBox from "../components/AdressBox";
import useFetch from "../customHook/useFetch";
import Spinner from "../components/Spinner";
import CustomText from "../components/CustomText";

export interface StoreListDataType {
  total: number;
  hasNext: boolean;
  stores: StoreCardType[];
}

export type MainScreenNavigationProps = NavigationProp<
  RootStackParamList,
  "MainView"
>;

export default function MainView() {
  const [pages, setPages] = useState(0);
  const [adressValue, setAdressValue] = useState("");
  const { data, isLoading, error } = useFetch<StoreListDataType>(
    `/api/store/list?emdName=${adressValue}&page=${pages}`
  );
  const adressArr = emdNameArray();
  const onEndCatched = () => {
    if (data.hasNext) {
      setPages(pages + 1);
    }
  };
  

  const navigate = useNavigation<MainScreenNavigationProps>();
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.scrollViewContainer}>
        <View style={styles.map}>
          {adressArr.map((el) => {
            return (
              <AdressBox
                key={el.name}
                name={el.name}
                adress={el.adress}
                setAdressValue={setAdressValue}
                adressValue={adressValue}
              />
            );
          })}
        </View>
        <View style={styles.storeListContainer}>
          <CustomText children="카페 리스트" fontSize="20px" fontWeight="bold"/>
          <View style={styles.storeList}>
            {!isLoading ? (
              <>
                {data?.stores.length !== 0 ? (
                  <FlatList
                    data={data.stores}
                    onEndReached={onEndCatched}
                    onEndReachedThreshold={0.75}
                    renderItem={(item) => {
                      return (
                        <StoreCard
                          navigate={navigate}
                          id={item.item.id}
                          imageUrl={item.item.imageUrl}
                          name={item.item.name}
                          storeDescription={item.item.storeDescription}
                          storeStatus={item.item.storeStatus}
                        />
                      );
                    }}
                  />
                ) : null}
              </>
            ) : (
              <Spinner />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  scrollViewContainer: {
    width: "100%",
  },
  map: {
    height: 185,
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  storeListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  storeListContainer: {
    flex: 1,
    width: "100%",
    padding: 20,
    minHeight: "70%",
  },
  storeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});
