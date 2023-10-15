import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { BaseInput, InputProps, Label } from './Input';
import { useController } from 'react-hook-form';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';

export interface InputProps extends TextInputProps {
  label: string;
  name: string;
}
export const DateInput = ({
  label,
  name,
  keyboardType,
  ...props
}: InputProps) => {
  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    name,
    defaultValue: { startDate: new Date(), endDate: new Date() },
  });

  return (
    <Label label={label}>
      <TouchableOpacity onPress={() => setOpen(prev => !prev)}>
        <BaseInput
          right={
            <TextInput.Icon
              onPress={() => setOpen(prev => !prev)}
              icon={'calendar-range'}
            />
          }
          keyboardType={keyboardType}
          error={!!error}
          {...field}
          {...props}
          editable={false}
          value={`${format(value.startDate, 'dd/MM/yy')} - ${format(
            value.endDate,
            'dd/MM/yy',
          )}`}
        />
      </TouchableOpacity>
      <DatePickerModal
        validRange={{ startDate: new Date() }}
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={value.startDate}
        endDate={value.endDate}
        onConfirm={({ startDate, endDate }) => {
          if (startDate && endDate) {
            setOpen(false);
            onChange({ startDate, endDate });
          }
        }}
      />
    </Label>
  );
};
