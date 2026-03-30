import InternalRadio from './Radio';
import RadioGroup from './RadioGroup';

type radioType= typeof InternalRadio
interface RadioInterface extends radioType {
  Group:typeof RadioGroup
}
const Radio=InternalRadio as RadioInterface
Radio.Group=RadioGroup

export default Radio