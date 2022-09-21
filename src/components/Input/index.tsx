import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import * as S from './styles';

type InputProps = {
  name: string;
  control: Control<FieldValues, any>;
  rules: {
    required: string
  }
} & TextInputProps

function Input({ name, control, rules, ...rest }: InputProps){

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <S.Container value={value} onChangeText={onChange} {...rest} />
      )}
    />
  )
}

export default Input;