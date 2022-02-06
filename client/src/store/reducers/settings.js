import { SET_OTODOMURL } from "../actions/types";

const initOtodomURL =
  "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/krakow?roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&market=ALL&page=1&limit=12&by=DEFAULT&direction=DESC&locations%5B0%5D%5BregionId%5D=6&locations%5B0%5D%5BcityId%5D=38&locations%5B0%5D%5BsubregionId%5D=410";

const initialState = {
  otodomUrl: initOtodomURL,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OTODOMURL:
      return { ...state, otodomUrl: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;

