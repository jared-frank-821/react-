import {createContext} from 'react';

export interface checkboxContextType{
  onChange:Function;
  disabled:boolean;
  value:Array<string>;
}
const checkboxContext=createContext<checkboxContextType>({
  value:[],
  onChange:()=>{},
  disabled:false
})
export default checkboxContext;