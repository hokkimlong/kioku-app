import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  PaperProvider,
  TextInput,
  TextInputProps,
  MD3DarkTheme,
} from 'react-native-paper';
import { BaseInput, InputProps, Label } from './Input';
import { useController } from 'react-hook-form';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';
import { Colors } from '~/utils/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const paperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: Colors.background,
    primary: Colors.primary,
    onPrimary: Colors.textColorPrimary,
    surface: Colors.background,
  },
};

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
              color={Colors.textColorPrimary}
              onPress={() => setOpen(prev => !prev)}
              icon={props => <Ionicons name="calendar-outline" {...props} />}
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
      <PaperProvider theme={paperTheme}>
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
      </PaperProvider>
    </Label>
  );
};
