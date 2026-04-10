import InterMenu from './Menu';
import Item from './Item';
import SubMenu from './SubMenu';

export type MenuProps = Parameters<typeof InterMenu>[0];

type MenuType=typeof InterMenu
interface MenuInterface extends MenuType {
  Item:typeof Item
  SubMenu:typeof SubMenu
}

const Menu=InterMenu as MenuInterface
Menu.Item=Item
Menu.SubMenu=SubMenu
export default Menu
