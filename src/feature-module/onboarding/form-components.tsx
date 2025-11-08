import { Controller } from "react-hook-form";
import type {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
  Control,
} from "react-hook-form";
import { isValidPhoneNumber } from "libphonenumber-js";
import Select from "react-select";

// Base Props para todos los inputs
type BaseInputProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  required?: boolean;
  error?: FieldError;
  colClass?: string;
};

// Props específicas por tipo de input
type TextInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "search"
    | "email"
    | "url";
  autoComplete?: string;
};

type NumberInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  inputMode?: "numeric" | "decimal";
  min?: number;
  max?: number;
};

type DateInputProps<T extends FieldValues> = BaseInputProps<T> & {
  min?: string;
  max?: string;
};

type FileInputProps<T extends FieldValues> = BaseInputProps<T> & {
  accept?: string;
  helperText?: string;
  multiple?: boolean;
};

type SelectInputProps<T extends FieldValues> = BaseInputProps<T> & {
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
};

type TextareaInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  rows?: number;
};

type CheckboxInputProps<T extends FieldValues> = BaseInputProps<T> & {
  checkboxLabel: string;
};

type EmailInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  autoComplete?: string;
};

type UrlInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  helperText?: string;
};

type TelInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  autoComplete?: string;
  invalidMessage?: string;
  requiredMessage?: string;
  missingCountryCodeMessage?: string;
};

type MultiSelectInputProps<T extends FieldValues> = Omit<BaseInputProps<T>, 'register'> & {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  helperText?: string;
  control: Control<T>;
};

type SingleSelectInputProps<T extends FieldValues> = Omit<BaseInputProps<T>, 'register'> & {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  helperText?: string;
  control: Control<T>;
  isSearchable?: boolean;
};

// Input Text
export const InputText = <T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  required,
  error,
  autoComplete,
  colClass = "col-12",
}: TextInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="text"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id as string}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(id, { required })}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

// Input Number
export const InputNumber = <T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  required,
  error,
  inputMode = "numeric",
  min,
  max,
  colClass = "col-12",
}: NumberInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="number"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id as string}
        placeholder={placeholder}
        inputMode={inputMode}
        min={min}
        max={max}
        {...register(id, { required, valueAsNumber: true })}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

// Input Date
export const InputDate = <T extends FieldValues>({
  id,
  label,
  register,
  required,
  error,
  min,
  max,
  colClass = "col-12",
}: DateInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="date"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id as string}
        min={min}
        max={max}
        {...register(id, { required })}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

// Input File
export const InputFile = <T extends FieldValues>({
  id,
  label,
  register,
  required,
  error,
  accept,
  helperText,
  multiple,
  colClass = "col-12",
}: FileInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="file"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id as string}
        accept={accept}
        multiple={multiple}
        {...register(id, { required })}
      />
      {helperText && (
        <small className="form-text text-muted">{helperText}</small>
      )}
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

// Select Input
export const SelectInput = <T extends FieldValues>({
  id,
  label,
  options,
  placeholder,
  register,
  required,
  error,
  colClass = "col-12",
}: SelectInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <select
        className={`form-select ${error ? "is-invalid" : ""}`}
        id={id as string}
        defaultValue=""
        {...register(id, { required })}
      >
        <option value="" disabled>
          {placeholder || "Seleccionar..."}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

// Textarea Input
export const TextareaInput = <T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  required,
  error,
  rows = 4,
  colClass = "col-12",
}: TextareaInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <textarea
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id as string}
        placeholder={placeholder}
        rows={rows}
        {...register(id, { required })}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

// Checkbox Input
export const CheckboxInput = <T extends FieldValues>({
  id,
  label,
  checkboxLabel,
  register,
  required,
  error,
  colClass = "col-12",
}: CheckboxInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="form-check">
        <input
          type="checkbox"
          className={`form-check-input ${error ? "is-invalid" : ""}`}
          id={id as string}
          {...register(id, { required })}
        />
        <label className="form-check-label" htmlFor={id as string}>
          {checkboxLabel}
        </label>
        {error && <div className="invalid-feedback">{error.message}</div>}
      </div>
    </div>
  );
};

// Input Email
export const InputEmail = <T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  required,
  error,
  autoComplete,
  colClass = "col-12",
}: EmailInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="email"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id as string}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(id, {
          required,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido",
          },
        })}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

// Input URL
export const InputUrl = <T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  required,
  error,
  helperText,
  colClass = "col-12",
}: UrlInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="text"
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id as string}
        placeholder={placeholder}
        {...register(id, {
          required,
          pattern: {
            // Patrón flexible que acepta URLs con o sin protocolo, con o sin www, dominios cortos como youtu.be, versión móvil, etc.
            value:
              /^(https?:\/\/)?(www\.|m\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
            message: "URL inválida. Ingresa un enlace válido",
          },
        })}
      />
      {helperText && (
        <small className="form-text text-muted d-block">{helperText}</small>
      )}
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

// Input Tel (Phone)
export const InputTel = <T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  required,
  error,
  autoComplete,
  invalidMessage,
  requiredMessage,
  missingCountryCodeMessage,
  colClass = "col-12",
}: TelInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type="tel"
        className={`form-control ${error ? "is-invalid" : ""}`}
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
            
            // Verificar si el número comienza con +
            if (!value.trim().startsWith('+')) {
              return missingCountryCodeMessage || "Include country code (e.g., +54)";
            }
            
            try {
              return (
                isValidPhoneNumber(value) ||
                invalidMessage ||
                "Invalid phone number"
              );
            } catch {
              return missingCountryCodeMessage || "Include country code (e.g., +54)";
            }
          },
        })}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

type HeightInputProps<T extends FieldValues> = BaseInputProps<T> & {
  placeholder?: string;
  isMetric: boolean; // true for cm, false for ft
};

// Input Height (with automatic conversion)
export const InputHeight = <T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  required,
  error,
  isMetric,
  colClass = "col-12",
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
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id as string}
        placeholder={placeholder}
        inputMode="decimal"
        {...register(id, {
          required,
          setValueAs: (v) => {
            const numValue = typeof v === "string" ? parseFloat(v) : v;
            if (isNaN(numValue)) return 0;
            // Si es métrico (español), devolver como está (cm)
            if (isMetric) return Math.round(numValue);
            // Si es imperial (inglés), convertir de ft a cm
            // 1 ft = 30.48 cm
            return Math.round(numValue * 30.48);
          },
          validate: (value: number) => {
            // Validar el valor ya convertido a cm
            if (value < 120)
              return isMetric
                ? "La altura mínima es 120 cm"
                : "Minimum height is 4 ft";
            if (value > 250)
              return isMetric
                ? "La altura máxima es 250 cm"
                : "Maximum height is 8.2 ft";
            return true;
          },
        })}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

// Multi-Select Input with react-select
export const MultiSelectInput = <T extends FieldValues>({
  id,
  label,
  options,
  control,
  required,
  error,
  placeholder = "Select...",
  helperText,
  colClass = "col-12",
}: MultiSelectInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <Controller
        name={id}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select
            {...field}
            inputId={id as string}
            isMulti
            options={options}
            placeholder={placeholder}
            className={error ? 'is-invalid' : ''}
            classNamePrefix="react-select"
            value={options.filter(option => 
              Array.isArray(field.value) && field.value.includes(option.value)
            )}
            onChange={(selected) => {
              field.onChange(selected ? selected.map(s => s.value) : [])
            }}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: '#f8f9fa', // Fondo gris claro como los inputs de Bootstrap
                borderColor: error ? '#dc3545' : state.isFocused ? '#86b7fe' : '#dee2e6',
                borderRadius: '0.375rem', // border-radius de Bootstrap
                borderWidth: '1px',
                '&:hover': {
                  borderColor: error ? '#dc3545' : '#86b7fe',
                  backgroundColor: '#f8f9fa'
                },
                boxShadow: state.isFocused 
                  ? error 
                    ? '0 0 0 0.25rem rgba(220, 53, 69, 0.25)' 
                    : '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
                  : 'none',
                minHeight: '38px',
                fontSize: '1rem',
                padding: '0.375rem 0.75rem'
              }),
              valueContainer: (base) => ({
                ...base,
                padding: '0',
                gap: '0.25rem'
              }),
              input: (base) => ({
                ...base,
                margin: '0',
                padding: '0'
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#0d6efd',
                borderRadius: '0.25rem',
                margin: '2px'
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: '#fff',
                padding: '3px 6px',
                fontSize: '0.875rem'
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: '#fff',
                ':hover': {
                  backgroundColor: '#0b5ed7',
                  color: '#fff',
                  cursor: 'pointer'
                }
              }),
              menu: (base) => ({
                ...base,
                borderRadius: '0.375rem',
                marginTop: '4px'
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected 
                  ? '#0d6efd' 
                  : state.isFocused 
                    ? '#e7f1ff' 
                    : 'white',
                color: state.isSelected ? 'white' : '#212529',
                cursor: 'pointer',
                ':active': {
                  backgroundColor: '#0d6efd',
                  color: 'white'
                }
              })
            }}
          />
        )}
      />
      {helperText && (
        <small className="form-text text-muted d-block mt-1">{helperText}</small>
      )}
      {error && (
        <div className="invalid-feedback d-block">{error.message}</div>
      )}
    </div>
  );
};

// Single Select Input with react-select (for searchable dropdowns like countries)
export const SingleSelectInput = <T extends FieldValues>({
  id,
  label,
  options,
  control,
  required,
  error,
  placeholder = "Select...",
  helperText,
  isSearchable = true,
  colClass = "col-12",
}: SingleSelectInputProps<T>) => {
  return (
    <div className={`${colClass} mb-3`}>
      <label htmlFor={id as string} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <Controller
        name={id}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select
            {...field}
            inputId={id as string}
            options={options}
            placeholder={placeholder}
            isSearchable={isSearchable}
            isClearable
            className={error ? 'is-invalid' : ''}
            classNamePrefix="react-select"
            value={options.find(option => option.value === field.value) || null}
            onChange={(selected) => {
              field.onChange(selected ? selected.value : '')
            }}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: '#f8f9fa',
                borderColor: error ? '#dc3545' : state.isFocused ? '#86b7fe' : '#dee2e6',
                borderRadius: '0.375rem',
                borderWidth: '1px',
                '&:hover': {
                  borderColor: error ? '#dc3545' : '#86b7fe',
                  backgroundColor: '#f8f9fa'
                },
                boxShadow: state.isFocused 
                  ? error 
                    ? '0 0 0 0.25rem rgba(220, 53, 69, 0.25)' 
                    : '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
                  : 'none',
                minHeight: '38px',
                maxHeight: '60px',
                fontSize: '1rem',
                padding: '0 0.75rem'
              }),
              valueContainer: (base) => ({
                ...base,
                padding: '0'
              }),
              input: (base) => ({
                ...base,
                margin: '0',
                padding: '0'
              }),
              singleValue: (base) => ({
                ...base,
                color: '#212529'
              }),
              placeholder: (base) => ({
                ...base,
                color: '#6c757d'
              }),
              menu: (base) => ({
                ...base,
                borderRadius: '0.375rem',
                marginTop: '4px',
                zIndex: 9999
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: '300px'
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected 
                  ? '#0d6efd' 
                  : state.isFocused 
                    ? '#e7f1ff' 
                    : 'white',
                color: state.isSelected ? 'white' : '#212529',
                cursor: 'pointer',
                ':active': {
                  backgroundColor: '#0d6efd',
                  color: 'white'
                }
              }),
              clearIndicator: (base) => ({
                ...base,
                cursor: 'pointer',
                ':hover': {
                  color: '#dc3545'
                }
              }),
              dropdownIndicator: (base) => ({
                ...base,
                cursor: 'pointer',
                ':hover': {
                  color: '#0d6efd'
                }
              })
            }}
          />
        )}
      />
      {helperText && (
        <small className="form-text text-muted d-block mt-1">{helperText}</small>
      )}
      {error && (
        <div className="invalid-feedback d-block">{error.message}</div>
      )}
    </div>
  );
};
