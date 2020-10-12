// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Loading from './Loading';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import axios from 'axios';
import Weather from './Weather';

// export default function App() {
//   return <Loading /> ;
// }

const API_KEY = "6bcba254b4a97aa3209a7fb8f751494a";

export default class extends React.Component {
  state = {
    isLoading: true
  }

  // 날씨 API
  getWeather = async(latitude, longitude) => {
    const { data: {main :{temp}, weather} } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    console.log(weather,temp);
    this.setState({ isLoading: false, condition: weather[0].main, temp });
  };

  // 위치정보 API
  getLocation = async() => {
    try {
      // throw Error();
      await Location.requestPermissionsAsync();
      const {coords: { latitude, longitude }} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}
