import { Image, Platform, StyleSheet, View } from 'react-native'
import CommonInput from '../CommonInput'
import CustomText from '../CustomText'

interface ProfilePropsType {
  imageUrl: string
  name: string
  storeName: string
  setStoreName: React.Dispatch<React.SetStateAction<string>>
  storeDescription: string
  setStoreDescription: React.Dispatch<React.SetStateAction<string>>
  
}

export default function StoreProfile (props: ProfilePropsType) {

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.storeImage}
          source={{
            uri: 'https://thumb.mtstarnews.com/06/2023/05/2023051815100436917_1.jpg/dims/optimize'
          }}
        />
      </View>
      <View style={styles.storeInputContainer}>
        <CommonInput
          changeFunc={props.setStoreName}
          type={'text'}
          width={'200px'}
          height={'41px'}
          value={props.storeName}
          backgroundColor={'white'}
          placeholder={'업체명을 입력해주세요'}
          border={'1px solid #CACACA'}
        />
        <View>
          <CommonInput
            changeFunc={props.setStoreDescription}
            type={'text'}
            width={'200px'}
            height={'41px'}
            value={props.storeDescription}
            backgroundColor={'white'}
            border={'1px solid #CACACA'}
            placeholder={'업체 소개를 입력해주세요'}
          />
          <CustomText
            marginTop="5px"
            marginLft="4px"
            fontSize="9px"
            color="#949494"
            children="업체 소개는 10자 이상 30자 이하로 입력 해주세요"
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center'
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginRight: 10,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowColor: 'gray'
      }
    })
  },
  storeImage: { width: '100%', height: '100%', borderRadius: 10 },
  storeInputContainer: { height: 125, justifyContent: 'space-between' }
})
