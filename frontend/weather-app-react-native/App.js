import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import Weatherinfo from './components/Weatherinfo';
import ReloadIcon from './components/Reloading'
import WeatherDetails from './components/weatherDetails';
import {colors} from './utils/index'
const WEATHER_API_KEY = '98f890c17c62801b9969508c348065f2';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('imperial')
  //Initialized location
  useEffect(() => {
    load()
  }, [])
  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try{
      let { status } = await Location.requestForegroundPermissionsAsync()

      if(status !== 'granted') {
        setErrorMessage('Access to location REQUIRED')
        return 
      }
      const location = await Location.getCurrentPositionAsync()

      const {latitude, longitude} = location.coords
      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherURL)
      const result = await response.json()
      if(response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
    } catch(error) {
      setErrorMessage(error.message)
    }
  }
  if(currentWeather) {
  
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
    <View style={styles.main}>
      <ReloadIcon currentWeather={currentWeather} />
      <Weatherinfo currentWeather={currentWeather} />
    </View>
    <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />

    </View>
  )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
      <Text style={{textAlign: 'center'}}>{errorMessage}</Text> 
      <StatusBar style="auto" />
    </View>

    )
  }
  
  else {
    return (
      <View style={styles.container}>
        
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} /> 
        <StatusBar style="auto" />
      </View>
    )
  
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  },
})