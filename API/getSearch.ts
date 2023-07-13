export interface SearchCardType {
  id: number;
  imageUrl: string;
  name: string;
  rating: number;
  storeDescription: string;
}

export interface SearchDataType {
  total: number;
  hasNext: boolean;
  stores: SearchCardType[];
}

interface SearchProps {
  searchValue: string;
}

export default async function getSearch(
  props: SearchProps
): Promise<SearchDataType> {
  return await new Promise((resolve, reject) => {
    const response: SearchDataType = {
      total: 0,
      hasNext: false,
      stores: [],
    };
    try {
      for (let i = 1; i <= 10; i++) {
        response.stores.push({
          id: i,
          imageUrl:
            "https://thumb.mtstarnews.com/06/2023/05/2023051815100436917_1.jpg/dims/optimize",
          name: "덤덤카페",
          storeDescription:
            "안녕하세요 가격 뷰 모두 겸비한 임덤덤이 주비한 카페에용 히히",
          rating: i,
        });
      }
    } catch (err) {}
    resolve(response);
  });
}
