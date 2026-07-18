import { firebaseAuth } from "../../config/firebase";

export const verifyGoogleToken = async (idToken: string) => {
  const decodedToken = await firebaseAuth.verifyIdToken(idToken);

  return {
    uid: decodedToken.uid,
    email: decodedToken.email,
    name: decodedToken.name,
    picture: decodedToken.picture,
    emailVerified: decodedToken.email_verified,
  };
};