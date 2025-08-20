import { rsaAuth } from "$lib/utils/auth";
// import {retrieveLaunchParams} from "@telegram-apps/sdk";
export interface UserData {
  USERID: number;
  NAME: string;
  USERNAME: string;
  BALANCE: number;
  // Add other fields as needed 
}


/**
 * Fetch User Data from API
 */export async function fetchUserData(): Promise<UserData | null> {
  try {
    console.log('Fetching user data...');
// const { initDataRaw, initData } = retrieveLaunchParams();
//        const userId = (initData as { user?: { id?: number } })?.user?.id ?? 0;
//        console.log('telegram ');
       
    const reqHeaders: HeadersInit = new Headers();
    const pem = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCJgAKU22+VqDoRpa6s/dc4Vf4zwo2IdyQv
LTxUZXpkv23TyaDLR+IDG09mHKxdRnGUGx/LTMRBzl7Us4eK0mKN4L3xV0rPVJHIRvHxaK0K1vG
HHeYUiCCaSRkeMenB5Gsfg5/mRfprwcTqR0PEajr4E5NU1S6RLlwPYhF4nRAswIDAQAB
-----END PUBLIC KEY-----`;
    console.log("encrption started");

    const authString = await rsaAuth(pem, ' LetsBetAPITESTPasswordXX0011@'); // Replace with your actual auth string
    reqHeaders.set('AUTH', authString);
    // console.log(authString);
    
    const response = await fetch('http://ec2-13-49-240-203.eu-north-1.compute.amazonaws.com:5000/user?uid='+'',
      {
        method: 'GET',
        headers: reqHeaders
      });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user data. Status: ${response.status}`);
    }

    const data: UserData = await response.json();
    console.log('User Data:', data);

    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
