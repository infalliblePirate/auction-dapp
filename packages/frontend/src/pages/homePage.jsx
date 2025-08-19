import { useState, useEffect } from "react";
import { BrowserProvider, formatEther, isAddress } from "ethers";
import { Heading, VStack, Box, Text, Button } from "@chakra-ui/react";

const Home = () => {
  const [balance, setBalance] = useState();
  const [currentAccount, setCurrentAccount] = useState();
  const [chainId, setChainId] = useState();
  const [chainName, setChainName] = useState();

  useEffect(() => {
    if (!currentAccount || !isAddress(currentAccount)) return;
    if (!window.ethereum) return;

    const provider = new BrowserProvider(window.ethereum);

    provider.getBalance(currentAccount).then((result) => {
      setBalance(formatEther(result));
    });

    provider.getNetwork().then((result) => {
      setChainId(result.chainId);
      setChainName(result.name);
    });
  }, [currentAccount]);

  const onClickConnect = async () => {
    if (!window.ethereum) {
      console.log("Please install MetaMask");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickDisconnect = () => {
    console.log("onClickDisconnect");
    setBalance(undefined);
    setCurrentAccount(undefined);
    setChainId(undefined);
    setChainName(undefined);
  };

  return (
    <>
      <title>Auction</title>

      <VStack>
        <Box w="100%" my={4}>
          {currentAccount ? (
            <Button
              type="button"
              w="100%"
              h="60px"
              fontSize="x-large"
              onClick={onClickDisconnect}
            >
              Account: {currentAccount}
            </Button>
          ) : (
            <Button
              type="button"
              w="100%"
              h="60px"
              fontSize="x-large"
              onClick={onClickConnect}
            >
              Connect to Wallet
            </Button>
          )}
        </Box>

        {currentAccount && (
          <Box
            mb={0}
            p={4}
            w="100%"
            borderWidth="1px"
            borderRadius="lg"
            fontSize="x-large"
          >
            <Heading my={4} fontSize="x-large">
              Account info
            </Heading>
            <Text>ETH Balance: {balance}</Text>
            <Text>
              Chain Info: ChainId {chainId}, Name {chainName}
            </Text>
          </Box>
        )}
      </VStack>
    </>
  );
};

export default Home;
