import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/models";
import * as SecureStore from "expo-secure-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInRequest } from "@/services/authService";

type Session = {
  user: User;
  accessToken: string;
};

const AuthContext = createContext<{
  signIn: (handle: string) => void;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>();
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  const { mutate: signIn } = useMutation({
    mutationFn: (handle: string) => signInRequest(handle),
    onSuccess: (data) => {
      setSession(data);
      saveSession(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    loadSession();
  }, []);

  const signOut = () => {
    setSession(null);
    saveSession(null);
    queryClient.clear();
  };

  const saveSession = async (value: Session | null) => {
    if (value) {
      await SecureStore.setItemAsync("session", JSON.stringify(value));
    } else {
      await SecureStore.deleteItemAsync("session");
    }
  };

  const loadSession = async () => {
    const sessionData = await SecureStore.getItemAsync("session");

    if (session) {
      setSession(JSON.parse(sessionData!));
    } else {
      setSession(null);
    }

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
