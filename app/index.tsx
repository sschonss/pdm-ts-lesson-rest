import { Redirect } from "expo-router";
import { Alert, Button, Text } from "react-native";
import { useTokenContext } from "../src/contexts/userContext";
import api from "../src/services/api";

export default function Login() {
  const { token, setToken } = useTokenContext();

  if (token) return <Redirect href="/userspace" />;

  return (
    <>
      <Text>
        Can u keep a secret? you should know that fulano can login with
        pdm123pdm
      </Text>

      <Button
        title="login"
        onPress={async () => {
          try {
            const result = await api.post(
              "/api/collections/users/auth-with-password",
              {
                identity: "schons",
                password: "12345678",
              }
            );

            setToken(result.data.token);
          } catch (error) {
            Alert.alert(error.message);
          }
        }}
      />
    </>
  );
}
