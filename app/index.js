import { useAuth } from "../components/AuthContext";
import { useRouter } from "next/router";
import { Button, Box, Heading, Text } from "@chakra-ui/react";

const Home = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <Box p={8} maxW="md" mx="auto">
      <Heading>Welcome, {user.email}</Heading>
      <Text mt={4}>You are logged in.</Text>
      <Button mt={4} colorScheme="red" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};
export default Home;
