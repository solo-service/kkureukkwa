import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions : NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
  callbacks : {
    async signIn({user,account,profile}){
      const {id} = user;
      const userRef = doc(db,"users",id);
      if(!(await getDoc(userRef)).exists()){
        await setDoc(userRef,{
          uid : id,
          name : user.name,
          createdAt : Date.now()
        })
      }
      return true;
    },
    async session({session,token,user}){
      session.user.id = token.sub;
      return session;
    }
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
