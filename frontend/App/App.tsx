import {useFonts} from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import {useEffect} from "react"
import RootNavigator from "./Navigation/RootNavigator"
SplashScreen.preventAutoHideAsync()
export default function App() {
  const [loaded,error] = useFonts({
    "Itim": require('./Sources/Fonts/Itim-Regular.ttf'),
  })
  useEffect(() => {
    if(loaded || error){
      SplashScreen.hideAsync()
    }
  }, [loaded,error])
  if(!loaded && !error){
    return null
  }
  return <RootNavigator />
}