import type { UseFormRegister, FieldValues, Path, FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  InputText,
  InputNumber,
  InputDate,
  InputFile,
  SelectInput,
  TextareaInput,
  CheckboxInput,
  InputEmail,
  InputUrl,
  InputTel,
  InputHeight,
  MultiSelectInput,
} from './form-components';

export type InputConfig<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  type: 'text' | 'number' | 'date' | 'file' | 'select' | 'textarea' | 'checkbox' | 'url' | 'email' | 'tel' | 'height' | 'multiselect';
  placeholder?: string;
  required?: boolean;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'search' | 'email' | 'url';
  accept?: string;
  helperText?: string;
  colClass?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  checkboxLabel?: string;
  min?: number | string;
  max?: number | string;
  multiple?: boolean;
  autoComplete?: string;
  isMetric?: boolean; // Para InputHeight (cm vs ft)
  control?: unknown; // Para MultiSelectInput - será tipado en el componente
};

type RenderInputProps<T extends FieldValues> = {
  input: InputConfig<T>;
  register: UseFormRegister<T>;
  errors: Partial<Record<Path<T>, FieldError>>;
};

export const useRenderInput = <T extends FieldValues>() => {
  const { t, i18n } = useTranslation();

  const renderInput = ({ input, register, errors }: RenderInputProps<T>) => {
    const error = errors[input.id];
    const labelText = t(input.label, input.label);
    const placeholderText = input.placeholder ? t(input.placeholder, '') : undefined;
    const helperText = input.helperText ? t(input.helperText, '') : undefined;
    const checkboxLabelText = input.checkboxLabel ? t(input.checkboxLabel, input.checkboxLabel) : '';
    const isMetric = i18n.language === 'es'; // español usa cm, inglés usa ft

    // Preparar el mensaje de error traducido
    const errorMessage = error
      ? t(
          `${input.label.replace('.label', '.required')}`,
          `${labelText} es requerido`
        )
      : undefined;

    // Crear el objeto de error con el mensaje
    const errorWithMessage =
      error && errorMessage ? { ...error, message: errorMessage } : undefined;

    switch (input.type) {
      case 'text':
        return (
          <InputText
            key={input.id as string}
            id={input.id}
            label={labelText}
            placeholder={placeholderText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            autoComplete={input.autoComplete}
            colClass={input.colClass}
          />
        );

      case 'number':
        return (
          <InputNumber
            key={input.id as string}
            id={input.id}
            label={labelText}
            placeholder={placeholderText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            inputMode={input.inputMode as 'numeric' | 'decimal'}
            min={typeof input.min === 'number' ? input.min : undefined}
            max={typeof input.max === 'number' ? input.max : undefined}
            colClass={input.colClass}
          />
        );

      case 'date':
        return (
          <InputDate
            key={input.id as string}
            id={input.id}
            label={labelText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            min={typeof input.min === 'string' ? input.min : undefined}
            max={typeof input.max === 'string' ? input.max : undefined}
            colClass={input.colClass}
          />
        );

      case 'file':
        return (
          <InputFile
            key={input.id as string}
            id={input.id}
            label={labelText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            accept={input.accept}
            helperText={helperText}
            multiple={input.multiple}
            colClass={input.colClass}
          />
        );

      case 'select':
        return (
          <SelectInput
            key={input.id as string}
            id={input.id}
            label={labelText}
            options={input.options}
            placeholder={placeholderText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            colClass={input.colClass}
          />
        );

      case 'textarea':
        return (
          <TextareaInput
            key={input.id as string}
            id={input.id}
            label={labelText}
            placeholder={placeholderText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            rows={input.rows}
            colClass={input.colClass}
          />
        );

      case 'checkbox':
        return (
          <CheckboxInput
            key={input.id as string}
            id={input.id}
            label={labelText}
            checkboxLabel={checkboxLabelText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            colClass={input.colClass}
          />
        );

      case 'url':
        return (
          <InputUrl
            key={input.id as string}
            id={input.id}
            label={labelText}
            placeholder={placeholderText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            helperText={input.helperText}
            colClass={input.colClass}
          />
        );

      case 'email':
        return (
          <InputEmail
            key={input.id as string}
            id={input.id}
            label={labelText}
            placeholder={placeholderText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            autoComplete={input.autoComplete}
            colClass={input.colClass}
          />
        );

      case 'tel':
        return (
          <InputTel
            key={input.id as string}
            id={input.id}
            label={labelText}
            placeholder={placeholderText}
            register={register}
            required={input.required}
            error={error} // Pasar error original, no errorWithMessage
            autoComplete={input.autoComplete}
            requiredMessage={t(`${input.label.replace('.label', '.required')}`, `${labelText} is required`)}
            invalidMessage={t(`${input.label.replace('.label', '.invalid')}`, 'Invalid phone number')}
            colClass={input.colClass}
          />
        );

      case 'height':
        return (
          <InputHeight
            key={input.id as string}
            id={input.id}
            label={labelText}
            placeholder={placeholderText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            isMetric={isMetric}
            colClass={input.colClass}
          />
        );

      case 'multiselect':
        if (!input.control) {
          console.error(`MultiSelectInput "${input.id as string}" requires a control prop`);
          return null;
        }
        return (
          <MultiSelectInput
            key={input.id as string}
            id={input.id}
            label={labelText}
            options={input.options || []}
            control={input.control as never}
            placeholder={placeholderText}
            helperText={helperText}
            required={input.required}
            error={errorWithMessage}
            colClass={input.colClass}
          />
        );

      default:
        return null;
    }
  };

  return { renderInput };
};
