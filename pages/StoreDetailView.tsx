import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { type StoreDetailType } from "../API/getStoreDetail";
import CustomText from "../components/CustomText";
import StatusToggle from "../components/StatusToggle";
import TabSwitcher from "../components/TabSwitcher";
import { cautionText } from "../function/cautionText";
import DetailHomeView from "../components/StoreDetailView/DetailHomeView";
import DetailReviewView from "../components/StoreDetailView/DetailReviewView";
import { type ReviewResponseType } from "../API/getReviewList";
import useFetch from "../customHook/useFetch";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Spinner from "../components/Spinner";
import { useUserId } from "../customHook/useUserId";
import { addFavorit } from "../API/addFavorit";
import { deleteFavorit } from "../API/deleteFavorit";

type StoreDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "StoreDetailView"
>;

export default function StoreDetailView({ route }: StoreDetailProps) {
  const storeId = route.params.id;
  const userId = useUserId();
  const [isTabType, setIsTabType] = useState<"홈" | "리뷰">("홈");
  const [reviewData, setReviewData] = useState<ReviewResponseType>({
    hasNext: false,
    total: 0,
    reviews: [],
  });
  const [favoritAdd, setFavoritAdd] = useState(false);

  const { data, isLoading, error } = useFetch<StoreDetailType>(
    `api/store/${storeId}`
  );

  const favoritClickChange = async (favoritStatus: boolean) => {
    if (favoritAdd) {
      if (userId !== null) {
        const response = await addFavorit({ userId: userId });
        if (response === 200) {
          setFavoritAdd(favoritStatus);
        }
      }
    } else {
      if (userId !== null) {
        const response = await deleteFavorit({ userId: userId });
        if (response === 200) {
          setFavoritAdd(favoritStatus);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {!isLoading ? (
          <>
            <View style={styles.storePhotoContainer}>
              {data.images.map((el) => {
                return (
                  <Image
                    key={el}
                    style={styles.storePhoto}
                    source={{ uri: el }}
                  />
                );
              })}
            </View>
            <View style={styles.confirmatContainer}>
              <View style={styles.onOffStatusContainer}>
                <StatusToggle
                  storeStatus={data.storeStatus}
                  screen={"StoreDetailView"}
                />
              </View>
              <View style={styles.cautionTextContainer}>
                <CustomText
                  color="#9E9E9E"
                  fontSize="13px"
                  children={cautionText()}
                />
              </View>
            </View>
            <View style={styles.storeInfoTitleContainer}>
              <CustomText
                fontWeight="bold"
                fontSize="16px"
                children={data.storeDescription}
              />
            </View>
            <View style={styles.tabContainer}>
              <TabSwitcher setIsTabType={setIsTabType} />
            </View>
            {isTabType === "홈" ? (
              <DetailHomeView
                favoritClickChange={favoritClickChange}
                storeDetails={data}
                favoritAdd={favoritAdd}
                userId={userId}
              />
            ) : (
              <DetailReviewView
                storeId={storeId}
                hasNext={reviewData.hasNext}
                total={reviewData.total}
                reviews={reviewData.reviews}
              />
            )}
          </>
        ) : (
          <Spinner />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  scrollView: {
    width: "100%",
  },
  storePhotoContainer: {
    height: 240,
    width: "100%",
  },
  storePhoto: { width: "100%", height: "100%" },
  confirmatContainer: {
    height: 79,
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#C3C3C3",
  },
  cautionTextContainer: {
    height: "40%",
    justifyContent: "center",
    paddingBottom: 10,
  },
  onOffStatusContainer: {
    width: "100%",
    height: "60%",
    alignItems: "center",
  },
  storeInfoTitleContainer: {
    width: "100%",
    height: 65,
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#C3C3C3",
  },
  tabContainer: {
    height: 41,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#C3C3C3",
    backgroundColor: "white",
  },
  adressInformationContainer: {
    height: 59,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#C3C3C3",
  },
  adressInfomation: { flexDirection: "row", alignItems: "center" },
  favoritContainer: { flexDirection: "row", alignItems: "center" },
  adressIcon: { marginRight: 8 },
  openTime: {
    width: "100%",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#C3C3C3",
    height: 210,
    paddingLeft: 15,
    paddingTop: 12,
  },
  openTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  clockIcon: { marginRight: 8 },
  openSchedule: {
    marginTop: 6,
  },
  contactContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    height: 80,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#C3C3C3",
  },
  contactContents: {
    flexDirection: "row",
    alignItems: "center",
  },
});
