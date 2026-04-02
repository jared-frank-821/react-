import Input from './Component';
import TextArea from './TextArea';

const InputWithTextArea = Input as typeof Input & { TextArea: typeof TextArea };
InputWithTextArea.TextArea = TextArea;

export { TextArea };
export default InputWithTextArea;
export type { InputProps } from './Component';
export type { TextAreaProps } from './TextArea';