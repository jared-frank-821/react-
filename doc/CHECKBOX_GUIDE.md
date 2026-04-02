# Checkbox 组件详解

## 文件结构总览

```
src/checkbox/
├── Checkbox.tsx          # 单个复选框组件
├── CheckboxGroup.tsx     # 复选框组组件
├── content.tsx           # Context（组件间通信桥梁）
├── index.tsx             # 入口文件，对外导出
├── index.scss            # 样式文件
├── Checkbox.stories.tsx      # Checkbox 的 Storybook 文档
└── CheckboxGroup.stories.tsx # CheckboxGroup 的 Storybook 文档
```

---

## 一、整体数据流向

```
CheckboxGroup (父)
    │
    │  通过 checkboxContext.Provider 向下注入：
    │  { onChange, disabled, value }
    │
    ▼
Checkbox (子)
    │
    │  用户点击后，调用 ctxOnChange(event)
    │  把 { value, checked } 上报给 CheckboxGroup
    │
    ▼
CheckboxGroup 的 handleChange
    │
    │  计算出新的 checkedValues 数组
    │  调用 props.onChange(newValue) 通知外部使用者
    ▼
外部父组件（你的业务代码）
```

**关键思路**：Checkbox 和 CheckboxGroup 不靠 props 直接传函数，而是靠 **Context** 通信，这样中间无论嵌套多少层都能正常工作。

---

## 二、content.tsx —— 组件间的通信桥梁

```ts
// content.tsx
const checkboxContext = createContext<checkboxContextType>({
  value: [],
  onChange: () => {},
  disabled: false,
})
```

### 作用

Context 是 React 的"跨层传参"机制。这里专门为 Checkbox 组件族创建了一个 Context，包含三个字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `value` | `Array<string>` | 当前已选中的 value 列表，由 CheckboxGroup 维护 |
| `onChange` | `Function` | 某个 Checkbox 被点击时调用，通知 CheckboxGroup 更新 |
| `disabled` | `boolean` | 是否禁用所有子 Checkbox |

### 为什么不直接用 props 传？

因为 CheckboxGroup 的子节点是通过 `props.children` 传入的，你无法在外部给每个 `<Checkbox>` 手动加上 `onChange`、`disabled`。用 Context，CheckboxGroup 只需包一层 Provider，内部所有 Checkbox 自动都能读到这些值。

---

## 三、CheckboxGroup.tsx —— 状态管理者

### 职责

- 维护一个 `value` 数组（记录哪些 Checkbox 被勾选了）
- 把 `onChange`、`disabled`、`value` 通过 Context 下发给子 Checkbox
- 监听子 Checkbox 的变化，更新自身状态，并通知外部

### Props 详解

```ts
interface checkboxGroupProps {
  disabled?:    boolean             // 禁用组内所有 Checkbox
  defaultValue?: Array<string>      // 初始默认选中的 value 列表（非受控）
  value?:        Array<string>      // 外部控制选中的 value 列表（受控）
  onChange?:    (checkedValues: Array<string>) => void  // 选中变化时回调
  className?:   string
  children?:    React.ReactNode    // 内部的 <Checkbox> 们
  style?:       object
}
```

#### `defaultValue` vs `value` 的区别

| | `defaultValue` | `value` |
|---|---|---|
| 模式 | 非受控（uncontrolled） | 受控（controlled） |
| 含义 | 只在初始渲染时用一次 | 每次渲染都以它为准 |
| 使用场景 | 不需要从外部控制状态 | 需要从外部精确控制哪些被选中 |

```tsx
// 非受控：自己管理状态，初始选中 A
<CheckboxGroup defaultValue={['A']}>...</CheckboxGroup>

// 受控：父组件控制状态
const [selected, setSelected] = useState(['A']);
<CheckboxGroup value={selected} onChange={setSelected}>...</CheckboxGroup>
```

### 内部逻辑

#### 1. 初始化状态

```ts
const [value, setValue] = useState(props.defaultValue || props.value || [])
```

优先用 `defaultValue`，其次 `value`，都没有就空数组。

#### 2. 受控模式同步（useEffect）

```ts
useEffect(() => {
  if ('value' in props) {
    setValue(props.value || []);
  }
}, [props.value])
```

当外部传入的 `value` prop 变化时，同步更新内部状态。用 `'value' in props` 判断是否处于受控模式，而不是 `props.value != null`，因为受控模式允许传 `undefined` 来清空。

#### 3. 处理子 Checkbox 的点击

```ts
const handleChange = (e: checkboxChangeEvent) => {
  const targetValue = e.target.value;   // 被点击的那个 Checkbox 的 value
  const checked = e.target.checked;    // 它现在是选中还是取消

  let newValue: Array<string>;
  if (checked) {
    newValue = value.concat(targetValue);        // 添加
  } else {
    newValue = value.filter(v => v !== targetValue); // 移除
  }
  setValue(newValue);
  props.onChange?.(newValue); // 通知外部
};
```

#### 4. 通过 Context 下发给子组件

```tsx
<checkboxContext.Provider value={{ onChange: handleChange, disabled: !!disabled, value }}>
  {children}
</checkboxContext.Provider>
```

所有在这个 Provider 内部的 Checkbox，都能通过 `useContext` 读到这三个值。

#### 5. cloneElement 注入 checked

```ts
const children = React.Children.map(props.children, (child: any) => {
  return React.cloneElement(child, {
    checked: value.includes(child.props.value)
  })
})
```

遍历所有子节点，给每个 Checkbox 注入 `checked` prop（根据当前 `value` 数组判断它是否选中）。这样 Checkbox 就变成了受控组件，选中状态完全由 CheckboxGroup 决定。

---

## 四、Checkbox.tsx —— 单个复选框

### 职责

- 渲染一个可点击的复选框 UI
- 既能**单独使用**（自管理状态），也能**在 CheckboxGroup 内使用**（由 Context 控制）

### Props 详解

```ts
interface checkboxProps {
  prefixCls?:      string    // CSS 类名前缀，默认 'ant-'
  defaultChecked?: boolean   // 初始是否勾选（非受控）
  checked?:        boolean   // 外部控制是否勾选（受控）
  disabled?:       boolean   // 是否禁用此单个 Checkbox
  value?:          string    // 此 Checkbox 代表的值，在 Group 内必填
  onChange?:       (e: checkboxChangeEvent) => void  // 点击时回调
  className?:      string
  children?:       React.ReactNode   // Checkbox 右侧的文字标签
  style?:          object
}
```

### Props 流向图

```
单独使用时：
外部父组件
  │  checked / defaultChecked / disabled / onChange / value / children
  ▼
Checkbox
  │  渲染 <label> + <input type="checkbox"> + <span>children</span>

在 CheckboxGroup 内使用时：
CheckboxGroup（通过 cloneElement 注入）
  │  checked
  ▼
Checkbox props
  +
checkboxContext（通过 useContext 读取）
  │  onChange(ctxOnChange)、disabled(ctxDisabled)
  ▼
Checkbox 内部逻辑合并两个来源
```

### 内部逻辑

#### 1. 读取 Context

```ts
const { onChange: ctxOnChange, disabled: ctxDisabled } = useContext(checkboxContext)
```

如果 Checkbox 在 CheckboxGroup 内，这里会拿到真实的函数和 disabled 值；如果单独使用，则拿到 Context 的默认值（空函数、false）。

#### 2. 受控模式同步

```ts
useEffect(() => {
  if ('checked' in props) {
    setChecked(props.checked || false)
  }
}, [props.checked])
```

当 CheckboxGroup 通过 `cloneElement` 传入新的 `checked` 时，同步更新内部状态。

#### 3. 点击处理

```ts
const handleClick = () => {
  if (props.disabled || ctxDisabled) return; // 任意一个 disabled 都不响应

  const state = !checked; // 取反

  if (!('checked' in props)) {
    setChecked(state); // 非受控时自己更新状态
  }

  const event = { target: { value: props.value ?? '', checked: state } };

  props.onChange?.(event);   // 通知单独使用时的外部父组件
  ctxOnChange?.(event);      // 通知 CheckboxGroup（在 Group 内时）
}
```

**关键点**：同时调用两个 onChange，单独使用和 Group 内使用都能正常工作。

#### 4. CSS 类名生成

```ts
// 内层 span（checkbox 本体）
const cls = classNames({
  'ant-checkbox': true,
  'ant-checkbox-checked': checked,           // 选中时加这个类
  'ant-checkbox-disabled': props.disabled || ctxDisabled,  // 禁用时加这个类
  [props.className]: props.className         // 用户自定义类名
})

// 外层 label（包裹整体）
const wrapperCls = classNames({
  'ant-checkbox-wrapper': true,
  'ant-checkbox-wrapper-disabled': props.disabled || ctxDisabled,
})
```

#### 5. 渲染结构

```tsx
<label className="ant-checkbox-wrapper">        {/* 点击 label 也能触发 checkbox */}
  <span className="ant-checkbox">
    <input type="checkbox" ... />              {/* 真实的 checkbox，但被 CSS 隐藏 */}
    <span className="ant-checkbox-inner" />    {/* 自定义样式的方块，视觉上的 checkbox */}
  </span>
  <span>children</span>                        {/* Checkbox 右边的文字 */}
</label>
```

之所以这样写：原生 `<input type="checkbox">` 样式难以定制，所以用 `ant-checkbox-inner` 这个 `<span>` 作为视觉展示，通过 CSS 控制样式，原生 input 用 CSS 隐藏但保留功能。

---

## 五、index.tsx —— 入口文件

```ts
import Checkbox from './Checkbox';
export default Checkbox;
```

目前只导出 Checkbox，如果需要从外部同时使用 CheckboxGroup，可以扩展为：

```ts
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';
export { Checkbox, CheckboxGroup };
export default Checkbox;
```

---

## 六、Stories 文件 —— 组件的可视化文档

Stories 文件是 **Storybook** 的配置，与组件本身的逻辑无关，只负责展示和调试。

### Storybook 是什么？

Storybook 是一个独立运行的开发工具，让你在不启动整个应用的情况下，单独预览和调试组件。运行 `npm run storybook` 后，浏览器里就能看到所有 Stories。

### Checkbox.stories.tsx

```ts
// 告诉 Storybook：这个文件是在展示 Checkbox 组件
const meta = {
  title: 'Example/Checkbox',  // Storybook 侧边栏里的路径
  component: Checkbox,         // 主角是 Checkbox
  tags: ['autodocs'],          // 自动根据 props 类型生成文档
}

// 每个 export 是一个"故事"，代表组件的一种使用场景
export const Primary: Story = {
  args: { checked: false, children: 'Checkbox' }, // 传给组件的 props
};

export const Disabled: Story = {
  render: () => (              // 复杂场景用 render 自定义渲染
    <>
      <Checkbox defaultChecked={false} disabled />
      <Checkbox defaultChecked={true} disabled />
    </>
  ),
};
```

### CheckboxGroup.stories.tsx

```ts
// 展示 CheckboxGroup 的两种状态
export const Basic: Story = {
  args: { defaultValue: ['A'] },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox value="A">A</Checkbox>
      <Checkbox value="B">B</Checkbox>
      <Checkbox value="C">C</Checkbox>
    </CheckboxGroup>
  ),
};
```

### Stories 与组件的关系

```
Stories 文件                    组件文件
      │                             │
      │  import Checkbox            │
      │ ──────────────────────────► │
      │                             │
      │  传入不同的 props            │
      │  验证各种使用场景            │
      │                             │
      ▼                             │
  Storybook 界面                    │
  （可视化预览 + 交互调试）          │
```

Stories 不会影响组件的任何逻辑，删掉 stories 文件组件照常工作，只是少了可视化文档。

---

## 七、完整数据流例子

以下面这段代码为例，逐步追踪数据流：

```tsx
const [selected, setSelected] = useState(['A', 'C']);

<CheckboxGroup value={selected} onChange={setSelected} disabled={false}>
  <Checkbox value="A">选项A</Checkbox>
  <Checkbox value="B">选项B</Checkbox>
  <Checkbox value="C">选项C</Checkbox>
</CheckboxGroup>
```

**初始渲染：**
1. CheckboxGroup 接收 `value=['A','C']`，内部 state `value = ['A','C']`
2. Context Provider 向下注入 `{ onChange: handleChange, disabled: false, value: ['A','C'] }`
3. `cloneElement` 给每个 Checkbox 注入 `checked`：A=true, B=false, C=true
4. 每个 Checkbox 渲染时读 Context，拿到 `ctxDisabled=false`

**用户点击「选项B」：**
1. Checkbox B 的 `handleClick` 触发
2. `props.disabled=false`，`ctxDisabled=false`，不阻止
3. `state = !false = true`（B 被选中）
4. `ctxOnChange({ target: { value:'B', checked:true } })` 调用
5. CheckboxGroup 的 `handleChange` 收到事件
6. `checked=true`，所以 `newValue = ['A','C','B']`（concat）
7. `setValue(['A','C','B'])`，`props.onChange(['A','C','B'])` 调用
8. 外部 `setSelected(['A','C','B'])` 更新父组件状态
9. React 重新渲染，`value=['A','C','B']` 传回 CheckboxGroup，B 的 checked 变为 true
