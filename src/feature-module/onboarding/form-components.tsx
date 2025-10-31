import type { UseFormRegister, FieldValues, Path, FieldError } from 'react-hook-form'

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

// Input Text
export const InputText = <T extends FieldValues>({
  id, label, placeholder, register, required, error, colClass = "col-12"
}: TextInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="text"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id as string}
        placeholder={placeholder}
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