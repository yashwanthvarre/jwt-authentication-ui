"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthContext";
import {
  Box,
  Input,
  Button,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const handleSubmit = () => {
    if (!login(email, password)) {
      setError("Invalid credentials");
      return;
    }
    router.push("/");
  };
  return (
    <Box p={8} maxW="md" mx="auto">
      <Heading mb={6}>Login</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
