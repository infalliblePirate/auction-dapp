   import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
   import { Layout } from './components/layout';
   import Home from './pages/homePage';

   function App() {
     return (
       <ChakraProvider value={defaultSystem}>
        <Layout>
        <Home />

        </Layout>
       </ChakraProvider>
     );
   }

export default App
