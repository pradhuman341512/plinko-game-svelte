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
    const response = await fetch('http://localhost:3000/user');
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
