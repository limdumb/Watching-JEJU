import styled from "styled-components/native";
import CustomText from "./CustomText";

interface AuthBoxProps {
  platform: "kakao" | "google" | "normer";
}

const AuthBoxContainer = styled.View<AuthBoxProps>`
  background-color: ${(props) =>
    props.platform === "kakao" ? "#FEE500" : "#FBFBFB"};
  width: 80%;
  height: 54px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
`;

export default function AuthBox(props: AuthBoxProps) {
  const AuthTitle = () => {
    if (props.platform === "kakao") {
      return "KaKao Login";
    } else if (props.platform === "google") {
      return "Google Login";
    } else {
      return "일반계정 Login";
    }
  };
  return (
    <AuthBoxContainer platform={props.platform}>
      {/* 6월 3일 추후 로고 추가예정 */}
      <CustomText children={AuthTitle()} fontSize="18px" fontWeight="600" />
    </AuthBoxContainer>
  );
}