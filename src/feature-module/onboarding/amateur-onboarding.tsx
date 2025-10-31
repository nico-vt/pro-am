import { useForm, type SubmitHandler } from "react-hook-form";
import { useSteps } from "../../hooks/useSteps";
import { useTranslation } from "react-i18next";
import StepProgress from "./step-progress";
import { InputText, InputNumber, InputDate, InputFile } from "./form-components";

export type AmateurOnboardingInputs = {
  //  Datos personales
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: string; // formato ISO (YYYY-MM-DD)
  height: number; // en cm
  city: string;
  country: string;

  // Material Promocional
  professionalPhoto: FileList | null; // foto profesional o retrato
};

type InputConfig = {
  id: keyof AmateurOnboardingInputs;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "search"
    | "email"
    | "url";
  accept?: string;
  helperText?: string;
  colClass?: string;
};

const AmateurOnboarding = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<AmateurOnboardingInputs>({ 
    shouldUnregister: false,
    mode: "onChange", // Validar en cada cambio para saber si puede avanzar
    reValidateMode: "onChange"
  });

  const steps = ["welcome", "personalData"] as const;
  const { step, next, back, isFirstStep, isLastStep } = useSteps({ steps });

  const onSubmit: SubmitHandler<AmateurOnboardingInputs> = (data) =>
    console.log(data);

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Funciones de navegación con scroll
  const handleNext = async () => {
    // Si estamos en el último step, hacer submit
    if (isLastStep) {
      await handleSubmit(onSubmit)();
      return;
    }

    // Obtener los campos del step actual
    const currentStepFields = getCurrentStepFields();
    
    // Validar solo los campos del step actual
    const isValid = await trigger(currentStepFields);
    
    // Solo avanzar si la validación es exitosa
    if (isValid) {
      next();
      scrollToTop();
    }
  };

  const handleBack = () => {
    back();
    scrollToTop();
  };

  // Función para obtener los campos del step actual
  const getCurrentStepFields = (): (keyof AmateurOnboardingInputs)[] => {
    switch (step) {
      case "welcome":
        return [];
      case "personalData":
        return ["firstName", "lastName", "nationality", "birthDate", "height", "city", "country"];
      default:
        return [];
    }
  };

  const personalDataInputs: InputConfig[] = [
    {
      id: "firstName",
      label: "proOnboarding.firstName.label",
      type: "text",
      placeholder: "proOnboarding.firstName.placeholder",
      required: true,
      colClass: "col-md-6",
    },
    {
      id: "lastName",
      label: "proOnboarding.lastName.label",
      type: "text",
      placeholder: "proOnboarding.lastName.placeholder",
      required: true,
      colClass: "col-md-6",
    },
    {
      id: "nationality",
      label: "proOnboarding.nationality.label",
      type: "text",
      placeholder: "proOnboarding.nationality.placeholder",
      required: true,
      colClass: "col-md-6",
    },
    {
      id: "birthDate",
      label: "proOnboarding.birthDate.label",
      type: "date",
      required: true,
      colClass: "col-md-6",
    },
    {
      id: "height",
      label: "proOnboarding.height.label",
      type: "number",
      placeholder: "175",
      inputMode: "numeric",
      required: true,
      colClass: "col-md-6",
    },
    {
      id: "city",
      label: "proOnboarding.city.label",
      type: "text",
      placeholder: "proOnboarding.city.placeholder",
      required: true,
      colClass: "col-md-6",
    },
    {
      id: "country",
      label: "proOnboarding.country.label",
      type: "text",
      placeholder: "proOnboarding.country.placeholder",
      required: true,
      colClass: "col-md-6",
    },
    {
      id: "professionalPhoto",
      label: "proOnboarding.professionalPhoto.label",
      type: "file",
      accept: "image/*",
      helperText: "proOnboarding.professionalPhoto.helper",
      colClass: "col-12",
    },
  ];

  // Función para renderizar inputs según su tipo usando componentes
  const renderInput = (input: InputConfig) => {
    const error = errors[input.id];
    const labelText = t(input.label, input.label);
    const placeholderText = input.placeholder ? t(input.placeholder, "") : undefined;
    const helperText = input.helperText ? t(input.helperText, "") : undefined;
    
    // Preparar el mensaje de error traducido
    const errorMessage = error ? t(
      `${input.label.replace(".label", ".required")}`,
      `${labelText} es requerido`
    ) : undefined;

    // Crear el objeto de error con el mensaje
    const errorWithMessage = error && errorMessage ? { ...error, message: errorMessage } : undefined;

    switch (input.type) {
      case "text":
        return (
          <InputText
            key={input.id}
            id={input.id}
            label={labelText}
            placeholder={placeholderText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            colClass={input.colClass}
          />
        );

      case "number":
        return (
          <InputNumber
            key={input.id}
            id={input.id}
            label={labelText}
            placeholder={placeholderText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            inputMode={input.inputMode as "numeric" | "decimal"}
            colClass={input.colClass}
          />
        );

      case "date":
        return (
          <InputDate
            key={input.id}
            id={input.id}
            label={labelText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            colClass={input.colClass}
          />
        );

      case "file":
        return (
          <InputFile
            key={input.id}
            id={input.id}
            label={labelText}
            register={register}
            required={input.required}
            error={errorWithMessage}
            accept={input.accept}
            helperText={helperText}
            colClass={input.colClass}
          />
        );

      default:
        return null;
    }
  };

  // Renderizar contenido según el step actual
  const renderStepContent = () => {
    switch (step) {
      case "welcome":
        return (
          <div className="text-center py-5">
            <div className="mb-3">
              <h1 className="display-4 mb-4 text-primary">
                {t("amateurOnboarding.welcome.title", "¡Bienvenido a ProAm!")}
              </h1>
              <p className="lead text-muted mb-4">
                {t(
                  "amateurOnboarding.welcome.subtitle",
                  "Conecta con tenistas profesionales y mejora tu juego"
                )}
              </p>
              <div className="mb-4">
                <p className="text-muted">
                  {t(
                    "amateurOnboarding.welcome.description",
                    "Completa tu perfil para acceder a experiencias exclusivas con jugadores profesionales. Reserva entrenamientos personalizados, sesiones de sparring, clínicas y torneos ProAm. ¡Lleva tu tenis al siguiente nivel!"
                  )}
                </p>
              </div>
            </div>
          </div>
        );

      case "personalData":
        return (
          <div>
            <h3 className="mb-4 text-center">
              {t("amateurOnboarding.personalData.title", "Datos Personales")}
            </h3>
            <div className="row">{personalDataInputs.map(renderInput)}</div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="main-wrapper contact-us-page">
        <section className="">
          <div className="container">
            <form
              className="contact-us position-relative"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Step Progress - Solo mostrar después del step de bienvenida */}
              {step !== "welcome" && (
                <StepProgress steps={steps} currentStep={step} />
              )}

              {/* Renderizar contenido del step actual */}
              {renderStepContent()}

              <div className="mt-4 d-flex justify-content-center gap-3">
                <button
                  onClick={handleBack}
                  disabled={isFirstStep}
                  className="btn btn-secondary m-0"
                  type="button"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="btn btn-primary m-0"
                  type="button"
                >
                  {isLastStep ? "Finish" : "Next"}
                  <i className="feather-arrow-right-circle ms-2" />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* /Page Content */}
      </div>
    </div>
  );
};

export default AmateurOnboarding;
