import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 1000 * 60 * 5 },
  },
});

const sticksTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#84d7af',
    background: '#101511',
    card: '#101511',
    text: '#dfe4dd',
    border: '#3f4943',
    notification: '#e9c349',
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Newsreader: require('./assets/fonts/Newsreader-Regular.ttf'),
    'Newsreader-Italic': require('./assets/fonts/Newsreader-Italic.ttf'),
    Manrope: require('./assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Medium': require('./assets/fonts/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('./assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('./assets/fonts/Manrope-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer theme={sticksTheme}>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: '#101511', alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#dfe4dd', fontSize: 16, fontFamily: 'Manrope' },
});
