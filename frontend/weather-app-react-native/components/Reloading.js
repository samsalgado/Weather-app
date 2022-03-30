import { Platform, View, StyleSheet } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import {colors} from '../utils/index'
export default function Reloading({load}) {
    const reloadIconName = Platform.os === 'ios' ? 'ios-refresh' : 'md-refresh'
    return (
      <View style={styles.reloadIcon}>
        <Ionicons onPress={load} name={reloadIconName} size={20} color={colors.PRIMARY_COLOR}/>
      </View>
    )
  
}
const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: 60,
        right: 20,
    },
})