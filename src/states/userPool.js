import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData={
    UserPoolId: "us-east-1_3xsrlfsJX",
    ClientId: "7jg8i8gdlrdaet518vctas88ns"
}


export default new CognitoUserPool(poolData);