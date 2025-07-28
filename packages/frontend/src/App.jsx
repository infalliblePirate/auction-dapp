   import React from 'react';
   import { ChakraProvider, Button, defaultSystem } from '@chakra-ui/react';

   function App() {
     return (
       <ChakraProvider value={defaultSystem}>
         <div style={{ padding: '20px' }}>
           <Button colorScheme="teal">Button</Button>
         </div>
       </ChakraProvider>
     );
   }

export default App
