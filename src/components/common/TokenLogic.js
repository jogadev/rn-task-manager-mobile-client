import AsyncStorage from "@react-native-community/async-storage";

export async function saveToken(token){
    try{
        await AsyncStorage.setItem('authToken', token);
        return true;
    }catch(error){
        alert("There has been an error");
        return false;
    }
}


export async function getToken(){
   try{
       const token = await AsyncStorage.getItem('authToken');
       return token;
   }catch(error){
       return null;
   }
}


export async function removeToken(){
    try{
        await AsyncStorage.removeItem('authToken');
        return true;
    }catch(error){
        return false;
    }
}