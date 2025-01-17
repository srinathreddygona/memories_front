import * as api from '../api';
import { AUTH } from '../constants/actiontypes';

export const signin=(formData,router)=>async(dispatch)=>{
     try {
        //logintheuser..
        const {data}=await api.signIn(formData);
        dispatch({type:AUTH,data});
        router.push('/');
     } catch (error) {
        console.log(error);
     }
}
export const signup=(formData,router)=>async(dispatch)=>{
    try {
       //sign up inthe user..
       const {data}=await api.signUp(formData);
        dispatch({type:AUTH,data});
       router.push('/');
    } catch (error) {
       console.log(error);
    }
}