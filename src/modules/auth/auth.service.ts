import { firebaseAuth } from "../../config/firebase";
import { generateToken } from "../../utils/jwt";

export const googleLoginService = async (idToken: string) => {
  const decodedToken = await firebaseAuth.verifyIdToken(idToken);

  const accessToken = generateToken({
    uid: decodedToken.uid,
    email: decodedToken.email!,
  });

  return {
    user: {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
      emailVerified: decodedToken.email_verified,
    },
    accessToken,
  };
};