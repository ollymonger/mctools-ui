import { View } from 'react-native';
import { Provider } from 'react-redux';
import { CustomDrawer } from './src/components/CustomDrawer';
import { CustomThemeProvider } from './src/components/CustomThemeProvider';
import { Header } from './src/components/Header';
import { store } from './src/redux/store';
import { Container } from './src/components/Container';

import { Home } from './src/pages/Home';

export default function App() {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <View>
          <Header />
          <CustomDrawer />
          <Container>
            <Home/>
          </Container>
        </View>
      </CustomThemeProvider> 
    </Provider>
  );
}