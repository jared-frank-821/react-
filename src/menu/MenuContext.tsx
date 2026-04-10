import { createContext } from 'react';
export type MenuMode ='vertical' | 'horizontal'|'inline';

export interface MenuContextProps {
  mode:MenuMode;
  inlineIndent:number;
  level:number;
  selectedKeys: string[]
onSelect: (key: string) => void
onOpenChange?: (key: string, open: boolean) => void
  openKeys?: string[]
}

export default createContext<MenuContextProps>({
  mode:'vertical',
  inlineIndent:24,
  level:1,
  selectedKeys:[],
  onSelect:()=>{},
  onOpenChange:()=>{},
  openKeys:[]
  
})