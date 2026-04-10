import { fireEvent, render, screen } from '@testing-library/react';
import Menu from './index';
import { SettingOutlined } from '@ant-design/icons';

describe('Menu',()=>{
  test('renders Menu', () => {
    render(<Menu onClick={()=>{}} onBlur={()=>{}}>click me</Menu>);
    const MenuElement = screen.getByText(/click me/i);
    expect(MenuElement).toBeInTheDocument();
  });
  test('renders with different modes',()=>{
    const { container } = render(<Menu mode='horizontal' children={[<Menu.Item children='item1' />]} />);
    const menuElement = container.querySelector('.ant-menu-horizontal');
    expect(menuElement).toBeInTheDocument();
    const { container: container2 } = render(<Menu mode='vertical' children={[<Menu.Item children='item1' />]} />);
    const menuElement2 = container2.querySelector('.ant-menu-vertical');
    expect(menuElement2).toBeInTheDocument();
  });
  test('click to change selected key',()=>{
    const items = [
      {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
          { label: 'Option 1', key: 'setting:1' },
          { label: 'Option 2', key: 'setting:2' },
        ],
      },
    ];
    const onSelect=vi.fn()
    render(<Menu items={items} onSelect={onSelect} />)
    // 先点击 SubMenu 展开子菜单
    const menuSub=screen.getByRole('menuitem',{name:/Navigation Three - Submenu/i })
    fireEvent.click(menuSub)
    // 再点击 Option 1 子菜单项
    const menuItem1=screen.getByRole('menuitem',{name:/Option 1/i})
    expect(menuItem1).not.toHaveClass('ant-menu-item-selected')
    fireEvent.click(menuItem1)
    expect(menuItem1).toHaveClass('ant-menu-item-selected')
    expect(onSelect).toHaveBeenCalledTimes(1)
  });
  test('when disabled,the menu item should not be selected',()=>{
    const items=[
      {label:'item1',key:'item1',disabled:true},
      {label:'item2',key:'item2',disabled:false},
    ]
    const onSelect=vi.fn()
    render(<Menu items={items} onSelect={onSelect} />)
    const menuItem1=screen.getByRole('menuitem',{name:/item1/i})
    fireEvent.click(menuItem1)
    expect(menuItem1).not.toHaveClass('ant-menu-item-selected')
    expect(onSelect).not.toHaveBeenCalled()
    const menuItem2=screen.getByRole('menuitem',{name:/item2/i})
    fireEvent.click(menuItem2)
    expect(menuItem2).toHaveClass('ant-menu-item-selected')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
});