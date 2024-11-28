import React from "react";

import AccountContext from "../context/AccountContext";

import userPool from "./userPool"
import { CognitoUser,AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountState = (props) =>{


    //logout

    const logout = async() =>{
        return await new Promise((resolve,reject) => {
            const user = userPool.getCurrentUser();
        if(user){
            user.signOut();
            resolve(user);
        }else{
            reject(new Error('No user found'));
        }
    
        })
    };


    //User session
    const getSession = async() =>{
        return await new Promise((resolve,reject) => {
            const user = userPool.getCurrentUser();
            if(user){
                user.getSession(async(err, session)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(session);
                    }
                })
            }else{
                reject();
            }
        })
    }
    //User registration

    const signup = async (email, name, password) => {
        return await new Promise((resolve, reject) => {
            var attributeList = [];
            var userName = {
                Name: "name",
                Value: name
            };
            attributeList.push(userName);
    
            userPool.signUp(email, password, attributeList, null, (err, data) => {
                if (err) {
                    // Check if `err` is an object and has a `message` property before logging it
                    const errorMessage = err && err.message ? err.message : "Unknown error occurred";
                    console.log("Failed to register", errorMessage);
                    reject(errorMessage); // Pass the error message to reject()
                } else {
                    console.log("Account Created Successfully", data);
                    resolve();
                }
            });
        });
    };


    //user-login

    const authenticate = async (Username,Password) =>{
        return await new Promise((resolve,reject)=>{
            const user = new CognitoUser({
                Username,
                Pool: userPool
            })
            const authDetails = new AuthenticationDetails({

                Username,
                Password
            })
            user.authenticateUser(authDetails,{
                onSuccess: (data)=>{
                    console.log("Login Success",data);
                    resolve(data);
                },
                onFailure: (err) =>{
                    console.log("Failure",err.message);
                    reject(err);
                },
                newPasswordRequired: (data) =>{
                    console.log("New Password required",data);
                    resolve(data);
                }
            })
        })
    }


    
    return(
        <AccountContext.Provider value={{signup,authenticate,getSession,logout}}>
        {props.children}
        </AccountContext.Provider>
    )
}

export default AccountState;