import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList, ImageBackground,
  TextInput, PermissionsAndroid, Platform} from 'react-native';
import ItemWeather from './component/ItemWeather';
import ItemNextDays from './component/ItemNextDays';
import Header from './component/Header';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Divider } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';

const App = () => {

  const API_URL = "https://www.metaweather.com/api/location/search/?lattlong=";
  const API_URL_LOCATION = "https://www.metaweather.com/api/location/";
  const [items, setItems] = useState([
    {id: 1, text: 'Milk'},
    {id: 2, text: 'Eggs'},
    {id: 3, text: 'Bread'},
    {id: 4, text: 'Juics'},
  ]);
  
  const [city, setCities] = useState("GPS searching...");
  const [cityID, setCityID] = useState({});
  const [weatherData, setWeatherData] = useState([
    {
      weather_state_name: "",
      applicable_date: "",
      the_temp: "",
      wind_speed: "",
      air_pressure: "",
      min_temp: "",
      max_temp: "",
      air_pressure: "",
      humidity: "",
      weather_state_abbr: "",
      
    },    {
      weather_state_name: "",
      applicable_date: "",
      the_temp: "",
      wind_speed: "",
      air_pressure: "",
      min_temp: "",
      max_temp: "",
      air_pressure: "",
      humidity: "",
      weather_state_abbr: "",
      
    },   {
      weather_state_name: "",
      applicable_date: "",
      the_temp: "",
      wind_speed: "",
      air_pressure: "",
      min_temp: "",
      max_temp: "",
      air_pressure: "",
      humidity: "",
      weather_state_abbr: "",
      
    },   {
      weather_state_name: "",
      applicable_date: "",
      the_temp: "",
      wind_speed: "",
      air_pressure: "",
      min_temp: "",
      max_temp: "",
      air_pressure: "",
      humidity: "",
      weather_state_abbr: "",
      
    },

  ]);
  const [weatherActualCity] = useState({});
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');


  // get fresh GPS data 
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);
  
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
  
        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);
  
        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);
  
        // //Setting Longitude state
        // setCurrentLongitude(currentLongitude);
        
        // //Setting Longitude state
        // setCurrentLatitude(currentLatitude);
          
        // //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        // //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 1000
      },
    );
  };
  
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        //getting the Longitude from the location json        
        const currentLongitude = JSON.stringify(position.coords.longitude);
  
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
        console.log(API_URL+currentLatitude+","+currentLongitude);
        fetch(API_URL+currentLatitude+","+currentLongitude, {
          method: 'GET',
          header: {
          'Content-Type': 'application/json'
        }})
        .then(response=> response.json())
        .then(data => {
          setCities(data[0].title);
          setCityID(data[0].woeid);
          fetch(API_URL_LOCATION+data[0].woeid+"/", {
            method: 'GET',
            header: {
            'Content-Type': 'application/json'
          }})
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setWeatherData(data.consolidated_weather.slice(0,4));
          })
        })
        .catch(() => {
          console.log("DOESNTWOKR");
          }
        );
        
    
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  const daysOfTheWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const day1 = daysOfTheWeek[new Date(weatherData[0].applicable_date).getDay()-1];
  const day2 = daysOfTheWeek[new Date(weatherData[1].applicable_date).getDay()-1];
  const day3 = daysOfTheWeek[new Date(weatherData[2].applicable_date).getDay()-1];
  const day4 = daysOfTheWeek[new Date(weatherData[3].applicable_date).getDay()-1];
  const todayFull = Date.now().getDay;
  const backgroundColNight = {
     backgroundColor: (new Date().getHours() % 24 >= 18 || (new Date().getHours() % 24 < 6)) ? '#01579B':'#F9C800' 
  };
  console.log("Godzina" + new Date().getHours() % 24);
  return (
    <View style={[styles.container, backgroundColNight]}>
        <Header weather_state_abbr={new Date().getHours() % 24 >= 20 || (new Date().getHours() % 24 < 6) ?  "Moon" : weatherData[0].weather_state_abbr}/>
        <View style={styles.columnTempCity}>
          <View style={styles.cityNow}>
            <TextInput style={styles.textCity}>
            
          <Icon name='map-marker' size={40}/>{city}</TextInput>
            <Text style={styles.textUnder}>{ day1 == todayFull ? "today" : day1 }</Text>
          </View>
          <View style={styles.temperatureNow}>
            <Text style={styles.textTemperature}>{Number(weatherData[0].the_temp).toFixed(1)+"°"}</Text>
            <Text style={styles.textUnder}>{weatherData[0].weather_state_name}</Text>
          </View>
        </View>
        <View style={styles.rowOtherData}>
          <ItemWeather symbolName="tint" propertyValue={weatherData[0].humidity} type="%"/>
          <Divider style={{ height: 10, backgroundColor: 'blue' }}/>
          <ItemWeather symbolName="moon-o"  propertyValue={weatherData[0].min_temp} type="°" />
          <Divider style={{ height: 10, backgroundColor: 'blue' }}/>
          <ItemWeather symbolName="indent"  propertyValue={weatherData[0].wind_speed} type="km/h"/>
          <Divider style={{ height: 10, backgroundColor: 'blue' }}/>
          <ItemWeather symbolName="snowflake-o" propertyValue={weatherData[0].air_pressure} type="hPa"/>
        </View>
        <View style={styles.rowOtherDays}>
          <ItemNextDays symbolName="cloud" nextDay={day2} temperature={weatherData[1].the_temp} />
          <Divider style={{ height: 30, backgroundColor: 'blue' }}/>
          <ItemNextDays symbolName="tint" nextDay={day3} temperature={weatherData[2].the_temp}/>
          <Divider style={{ height: 30, backgroundColor: 'blue' }}/>
          <ItemNextDays symbolName="sun-o" nextDay={day4} temperature={weatherData[3].the_temp}/>
        </View>
    </View>
  );


};

(weatherData) => {
  
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flexDirection: 'column',
    color: '#ffffff',
    margin: 0,
    flex:1,
    
  },
  columnTempCity: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  cityNow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },   
  textCity: {
    color: '#000', 
    fontSize: 30,
    fontFamily: 'Montserrat-Light',
    color: '#ffffff'
  },  
  temperatureNow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  textUnder: {
    color: '#000', 
    fontSize: 18,
    fontFamily: 'Montserrat-Light',
    color: '#ffffff',
    marginBottom: 10
  },
  textTemperature: {
      color: '#000', 
      fontSize: 50,
      fontFamily: 'Montserrat-Light',
      color: '#ffffff'
    },

  rowOtherData: {
    flexDirection: 'row',
    marginTop: 60,
    justifyContent: 'space-evenly',
  }, 
  rowOtherDays: {
    flexDirection: 'row',
    marginTop: 60,
    paddingBottom: 50,
    justifyContent: 'space-evenly',
  },
});

export default App;