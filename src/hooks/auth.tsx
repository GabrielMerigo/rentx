import React, { 
  createContext ,
  useState,
  useContext,
  useEffect,
  useCallback
} from "react";

import { database } from "../database";
import { User as ModelUser } from "../database/model/User";
import api from "../services/api";

type User = {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
  user_id: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials){
    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      const { token, user } = response.data;
      api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.driver_license = user.driver_license,
          newUser.avatar = user.avatar,
          newUser.token = user.token
        })
      })

      setUser({ ...user, token });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut(){
    try{
      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.destroyPermanently();
      })

      setUser({} as User);
    }catch(error){
      throw new Error('');
    }
  }

  async function updateUser(currentUser: User) {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        const userSelected = await userCollection.find(currentUser.id);
        await userSelected.update(userData => {
          userData.name = currentUser.name;
          userData.driver_license = currentUser.driver_license;
          userData.avatar = currentUser.avatar;
        })
      })

      setUser(currentUser);
    } catch (error) {
      throw new Error('')
    }
  }

  const getUser = useCallback(async () => {
    const userCollection = database.get<ModelUser>('users');
    const response = await userCollection.query().fetch();
    
    if(response.length > 0){
      const userData = response[0]._raw as any as User;
      api.defaults.headers.common['Authorization'] = 'Bearer ' + userData.token;
      setUser(userData)
    }
  }, [])

  useEffect(() => {
    getUser();
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        user,
        signIn,
        signOut,
        updateUser
      }}
     >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export {
  AuthProvider,
  useAuth
}