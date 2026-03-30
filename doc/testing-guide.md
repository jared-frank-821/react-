# React 组件测试指南

本项目使用 **Vitest** + **@testing-library/react** 进行组件单元测试。

---

## 基本概念

| 概念 | 说明 |
|---|---|
| `render` | 把组件渲染到虚拟 DOM |
| `screen` | 从渲染结果里查询元素 |
| `fireEvent` | 模拟用户操作（点击、输入等） |
| `expect` | 断言结果是否符合预期 |
| `vi.fn()` | 创建 mock 函数，用于验证回调是否被调用 |

---

## 一、渲染测试 — 验证组件能正常渲染

**目标：** 组件挂载后页面上能找到预期内容。

```tsx
import { render, screen } from '@testing-library/react';
import Radio from './index';

test('renders Radio with children', () => {
  render(<Radio>click me</Radio>);
  expect(screen.getByText(/click me/i)).toBeInTheDocument();
});
```

> `getByText` 找不到元素会直接报错（测试失败）。
> `/click me/i` 是正则，`i` 表示忽略大小写。

---

## 二、CSS 类名测试 — 验证 className 逻辑

**目标：** 组件在不同 props 下应用正确的 CSS 类。

```tsx
test('renders with ant-radio class', () => {
  const { container } = render(<Radio>click me</Radio>);
  // container.firstChild 是根 DOM 元素
  expect(container.firstChild).toHaveClass('ant-radio');
});

test('checked 时有 ant-radio-checked 类', () => {
  const { container } = render(<Radio checked={true} onChange={() => {}}>click me</Radio>);
  expect(container.firstChild).toHaveClass('ant-radio-checked');
});

test('unchecked 时没有 ant-radio-checked 类', () => {
  const { container } = render(<Radio checked={false} onChange={() => {}}>click me</Radio>);
  expect(container.firstChild).not.toHaveClass('ant-radio-checked');
});
```

> `toHaveClass` 来自 `@testing-library/jest-dom`，通过 `setupTests.ts` 自动引入。
> 用 `.not` 取反。

---

## 三、属性测试 — 验证 DOM 属性和样式

**目标：** props 正确传递到底层 DOM 元素。

```tsx
// 验证 disabled 属性
test('renders disabled input', () => {
  const { container } = render(<Radio disabled>click me</Radio>);
  const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
  expect(input).toBeDisabled();
});

// 验证 checked 属性
test('defaultChecked=true 时 input 是 checked', () => {
  const { container } = render(<Radio defaultChecked={true}>click me</Radio>);
  const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
  expect(input.checked).toBe(true);
});

// 验证 style
// 注意：toHaveStyle 会把颜色名转成 rgb 值，需用 rgb 格式断言
test('applies custom style', () => {
  const { container } = render(<Radio style={{ color: 'red' }}>click me</Radio>);
  expect(container.firstChild).toHaveStyle({ color: 'rgb(255, 0, 0)' });
});
```

> `container.querySelector` 用于查找非文本的 DOM 节点（如 input、svg）。
> `toBeDisabled()` 检查 `disabled` 属性。
> `toHaveStyle` 检查内联样式。

---

## 四、交互测试 — 验证回调函数

**目标：** 用户操作后对应的回调被正确触发。

```tsx
// 点击触发 onChange
test('calls onChange when input is clicked', () => {
  const onChange = vi.fn();              // 创建 mock 函数
  const { container } = render(
    <Radio checked={false} onChange={onChange}>click me</Radio>
  );
  const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
  fireEvent.click(input);               // 模拟点击
  expect(onChange).toHaveBeenCalledTimes(1);  // 验证调用了 1 次
});

// disabled 时不触发
test('disabled 时不调用 onChange', () => {
  const onChange = vi.fn();
  const { container } = render(<Radio disabled onChange={onChange}>click me</Radio>);
  const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
  fireEvent.click(input);
  expect(onChange).not.toHaveBeenCalled();
});
```

> `vi.fn()` 是 Vitest 提供的 mock 函数（等同于 Jest 的 `jest.fn()`）。
> `toHaveBeenCalledTimes(n)` 验证调用次数。
> `toHaveBeenCalled()` 只验证是否被调用过。

---

## 五、状态测试 — 验证受控 vs 非受控

**目标：** 组件内部状态在用户操作后正确切换。

```tsx
// 非受控模式：点击后 checked 变为 true
test('uncontrolled: 点击后变为 checked', () => {
  const { container } = render(<Radio>click me</Radio>);
  const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
  expect(input.checked).toBe(false);   // 初始未选中
  fireEvent.click(input);
  expect(input.checked).toBe(true);    // 点击后选中
});
```

---

## 六、查询方法速查

| 方法 | 用途 | 找不到时 |
|---|---|---|
| `screen.getByText(...)` | 按文本内容找元素 | 报错（测试失败） |
| `screen.queryByText(...)` | 按文本内容找元素 | 返回 `null` |
| `screen.getByRole(...)` | 按 ARIA role 找元素 | 报错 |
| `container.querySelector(...)` | CSS 选择器，找 DOM 节点 | 返回 `null` |
| `container.firstChild` | 组件的根 DOM 节点 | — |

---

## 七、常用断言速查

| 断言 | 说明 |
|---|---|
| `toBeInTheDocument()` | 元素存在于 DOM |
| `toHaveClass('xxx')` | 元素有该 class |
| `not.toHaveClass('xxx')` | 元素没有该 class |
| `toBeDisabled()` | 元素有 disabled 属性 |
| `toHaveStyle({...})` | 元素有该内联样式 |
| `toHaveBeenCalled()` | mock 函数被调用过 |
| `toHaveBeenCalledTimes(n)` | mock 函数被调用 n 次 |
| `toBe(value)` | 严格相等 |

---

## 八、运行测试

```bash
# 运行全部测试
npx vitest run

# 监听模式（文件变化自动重跑）
npx vitest

# 只跑某个文件
npx vitest run src/radio/index.test.tsx
```
