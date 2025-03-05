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
  Flex,
} from "@chakra-ui/react";

const SignUp = () => {
  const router = useRouter(); // Correct usage

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!signup(email, password)) {
      setError("User already exists");
      return;
    }
    router.push("./login"); // This will now work correctly
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      direction="column"
      position="relative"
      width="full"
    >
      {/* First Box - Form Container */}
      <Box
        p={8}
        bg="whiteAlpha.800"
        borderRadius="lg"
        boxShadow="lg"
        zIndex={2} // Ensure it appears on top of the image
      >
        <Heading mb={6} textAlign="center">
          Signup
        </Heading>
        {error && (
          <Text color="red.500" mb={4} textAlign="center">
            {error}
          </Text>
        )}
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              border="1px solid black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              border="1px solid black"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              border="1px solid black"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            width="full"
            mt={4}
            _hover={{ bg: "blue.600" }}
          >
            Signup
          </Button>
        </VStack>
      </Box>

      {/* Second Box - Background Image */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bgImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZFU0XBNQ5LhfPmy1ZCk2_CDChPA_W6OgTWA&s"
        bgSize="cover"
        bgPos="center"
        zIndex={1} // Ensure the image stays behind the form
      />
    </Flex>
  );
};

export default SignUp;
