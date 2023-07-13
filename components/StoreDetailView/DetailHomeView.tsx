import CustomText from "../CustomText";
import StoreSchedule from "./StoreSchedule";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { type StoreDetailType } from "../../API/getStoreDetail";
import Icon from "react-native-vector-icons/FontAwesome5";
import StarIcon from "react-native-vector-icons/AntDesign";
import CallIcon from "react-native-vector-icons/MaterialIcons";
import InstagramIcon from "react-native-vector-icons/FontAwesome";

interface DetailHomeViewProps {
  storeDetails: StoreDetailType;
  favoritClickChange: (favoritStatus: boolean) => void;
  favoritAdd: boolean;
  userId: number | null;
}

export default function DetailHomeView(props: DetailHomeViewProps) {
  const favoritButton = () => {
    if (!props.favoritAdd) {
      return (
        <TouchableOpacity
          style={styles.favoritContainer}
          onPress={() => {
            props.favoritClickChange(true);
          }}
        >
          <StarIcon
            name="staro"
            color={"#FFD233"}
            size={20}
            style={styles.starIcon}
          />
          <CustomText children="즐겨찾기" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.favoritContainer}
          onPress={() => {
            props.favoritClickChange(false);
          }}
        >
          <StarIcon
            name="star"
            color={"#FFD233"}
            size={20}
            style={styles.starIcon}
          />
          <CustomText children="즐겨찾기" />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <View style={styles.adressInformationContainer}>
        <View style={styles.adressInfomation}>
          <Icon
            name="map-marker-alt"
            color={"#00B828"}
            size={25}
            style={styles.adressIcon}
          />
          <CustomText
            fontSize="15px"
            children={props.storeDetails.jubunAddress}
          />
        </View>
        {props.userId !== null ? (
          favoritButton()
        ) : (
          <TouchableOpacity
            style={styles.favoritContainer}
            onPress={() => {
              Alert.alert("로그인시 이용 가능한 기능입니다.");
            }}
          >
            <StarIcon
              name="staro"
              color={"#FFD233"}
              size={20}
              style={styles.starIcon}
            />
            <CustomText children="즐겨찾기" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.openTime}>
        <View style={styles.openTitle}>
          <Icon
            name="clock"
            color={"#80BFA0"}
            size={20}
            style={styles.clockIcon}
          />
          <CustomText
            children="카페 영업시간"
            fontWeight="600"
            fontSize="16px"
          />
        </View>
        <View style={styles.openSchedule}>
          <StoreSchedule storeSchedules={props.storeDetails.storeSchedules} />
        </View>
      </View>
      <View style={styles.contactContainer}>
        <View style={styles.contactContents}>
          <CallIcon name="call-end" size={30} color={"#4ECB71"} />
          <CustomText
            children={`전화번호 ${props.storeDetails.storePhoneNumber}`}
            fontWeight={"bold"}
            marginLft={"8px"}
            fontSize={"15px"}
          />
        </View>
        <View style={styles.contactContents}>
          <InstagramIcon name="instagram" size={30} color={"#E4405F"} />
          {props.storeDetails.sns.map((sns) => {
            return (
              <CustomText
                key={sns.nickName}
                children={sns.nickName}
                marginLft={"5px"}
                fontWeight={"bold"}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  starIcon: { marginRight: 8 },
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