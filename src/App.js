import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { theme } from "./core/theme";
import RouterNavigator from "./router/Router";
import store from "./store/store";


export default function App() {
  return (
    <ReduxProvider store={store}>
      <Provider theme={theme}>
        <NavigationContainer>
          <RouterNavigator />
        </NavigationContainer>
      </Provider>
    </ReduxProvider>
  );
}