import type { UseFormRegister, FieldValues, Path, FieldError } from 'react-hook-form'
import { isValidPhoneNumber } from 'libphonenumber-js'

// Base Props para todos los inputs
type BaseInputProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  required?: boolean;
  error?: FieldError;
  colClass?: string;
}

// Props específicas por tipo de input
type TextInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "search" | "email" | "url";
  autoComplete?: string;
}

type NumberInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  inputMode?: "numeric" | "decimal";
  min?: number;
  max?: number;
}

type DateInputProps<T extends FieldValues> = BaseInputProps<T> & {
  min?: string;
  max?: string;
}

type FileInputProps<T extends FieldValues> = BaseInputProps<T> & {
  accept?: string;
  helperText?: string;
  multiple?: boolean;
}

type SelectInputProps<T extends FieldValues> = BaseInputProps<T> & {
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

type TextareaInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  rows?: number;
}

type CheckboxInputProps<T extends FieldValues> = BaseInputProps<T> & {
  checkboxLabel: string;
}

type EmailInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  autoComplete?: string;
}

type TelInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  autoComplete?: string;
  invalidMessage?: string;
  requiredMessage?: string;
}

// Input Text
export const InputText = <T extends FieldValues>({
  id, label, placeholder, register, required, error, autoComplete, colClass = "col-12"
}: TextInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type='text'
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id as string}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(id, { required })}
      />
      {error && (
        <div className="invalid-feedback">{error.message}</div>
      )}
    </div>
  )
}

// Input Number
export const InputNumber = <T extends FieldValues>({
  id, label, placeholder, register, required, error, inputMode = "numeric", min, max, colClass = "col-12"
}: NumberInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="number"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id as string}
        placeholder={placeholder}
        inputMode={inputMode}
        min={min}
        max={max}
        {...register(id, { required, valueAsNumber: true })}
      />
      {error && (
        <div className="invalid-feedback">{error.message}</div>
      )}
    </div>
  )
}

// Input Date
export const InputDate = <T extends FieldValues>({
  id, label, register, required, error, min, max, colClass = "col-12"
}: DateInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="date"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id as string}
        min={min}
        max={max}
        {...register(id, { required })}
      />
      {error && (
        <div className="invalid-feedback">{error.message}</div>
      )}
    </div>
  )
}

// Input File
export const InputFile = <T extends FieldValues>({
  id, label, register, required, error, accept, helperText, multiple, colClass = "col-12"
}: FileInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="file"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id as string}
        accept={accept}
        multiple={multiple}
        {...register(id, { required })}
      />
      {helperText && (
        <small className="form-text text-muted">{helperText}</small>
      )}
      {error && (
        <div className="invalid-feedback">{error.message}</div>
      )}
    </div>
  )
}

// Select Input
export const SelectInput = <T extends FieldValues>({
  id, label, options, placeholder, register, required, error, colClass = "col-12"
}: SelectInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <select
        className={`form-select form-control ${error ? 'is-invalid' : ''}`}
        id={id as string}
        {...register(id, { required })}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="invalid-feedback">{error.message}</div>
      )}
    </div>
  )
}

// Textarea Input
export const TextareaInput = <T extends FieldValues>({
  id, label, placeholder, register, required, error, rows = 4, colClass = "col-12"
}: TextareaInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <textarea
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id as string}
        placeholder={placeholder}
        rows={rows}
        {...register(id, { required })}
      />
      {error && (
        <div className="invalid-feedback">{error.message}</div>
      )}
    </div>
  )
}

// Checkbox Input
export const CheckboxInput = <T extends FieldValues>({
  id, label, checkboxLabel, register, required, error, colClass = "col-12"
}: CheckboxInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="form-check">
        <input
          type="checkbox"
          className={`form-check-input ${error ? 'is-invalid' : ''}`}
          id={id as string}
          {...register(id, { required })}
        />
        <label className="form-check-label" htmlFor={id as string}>
          {checkboxLabel}
        </label>
        {error && (
          <div className="invalid-feedback">{error.message}</div>
        )}
      </div>
    </div>
  )
}

// Input Email
export const InputEmail = <T extends FieldValues>({
  id, label, placeholder, register, required, error, autoComplete, colClass = "col-12"
}: EmailInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="email"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id as string}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(id, { 
          required,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido"
          }
        })}
      />
      {error && (
        <div className="invalid-feedback">{error.message}</div>
      )}
    </div>
  )
}

// Input Tel (Phone)
export const InputTel = <T extends FieldValues>({
  id, label, placeholder, register, required, error, autoComplete, invalidMessage, requiredMessage, colClass = "col-12"
}: TelInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="tel"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id as string}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode="tel"
        {...register(id, { 
          validate: (value: string) => {
            if (required && !value) {
              return requiredMessage || "Phone is required";
            }
            if (!value) return true;
            try {
              return isValidPhoneNumber(value) || (invalidMessage || "Invalid phone number");
            } catch {
              return invalidMessage || "Invalid phone number";
            }
          }
        })}
      />
      {error && (
        <div className="invalid-feedback">{error.message}</div>
      )}
    </div>
  )
}

type HeightInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  isMetric: boolean; // true for cm, false for ft
}

// Input Height (with automatic conversion)
export const InputHeight = <T extends FieldValues>({
  id, label, placeholder, register, required, error, isMetric, colClass = "col-12"
}: HeightInputProps<T>) => {
  // Límites según la unidad
  const min = isMetric ? 120 : 4; // 120 cm o 4 ft
  const max = isMetric ? 250 : 8.2; // 250 cm o 8.2 ft

  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="number"
        step={isMetric ? "1" : "0.1"}
        min={min}
        max={max}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id as string}
        placeholder={placeholder}
        inputMode="decimal"
        {...register(id, { 
          required,
          setValueAs: (v) => {
            const numValue = typeof v === 'string' ? parseFloat(v) : v;
            if (isNaN(numValue)) return 0;
            // Si es métrico (español), devolver como está (cm)
            if (isMetric) return Math.round(numValue);
            // Si es imperial (inglés), convertir de ft a cm
            // 1 ft = 30.48 cm
            return Math.round(numValue * 30.48);
          },
          validate: (value: number) => {
            // Validar el valor ya convertido a cm
            if (value < 120) return isMetric ? 'La altura mínima es 120 cm' : 'Minimum height is 4 ft';
            if (value > 250) return isMetric ? 'La altura máxima es 250 cm' : 'Maximum height is 8.2 ft';
            return true;
          }
        })}
      />
      {error && (
        <div className="invalid-feedback">{error.message}</div>
      )}
    </div>
  )
}