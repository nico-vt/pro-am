import { useForm, type SubmitHandler } from "react-hook-form";
import { useSteps } from "../../hooks/useSteps";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import StepProgress from "./step-progress";
import NavigationButtons from "./navigation-buttons";
import { useRenderInput, type InputConfig } from "./form-utils";
import { useCountries } from "../../hooks/useCountries";
import { submitAmateurOnboarding } from "../../core/supabase/client";
import { toast } from "sonner";

// Tipos divididos por sección
type PersonalData = {
  firstname: string;
  lastname: string;
  nationality: string;
  birth_date: string; // formato ISO (YYYY-MM-DD)
  height: number; // en cm
  city: string;
  country: string;
  professional_photo: FileList | null; // foto profesional o retrato
};

type ContactAndPaymentData = {
  email: string;
  phone: string; // Teléfono / WhatsApp
  payment_account: string; // Cuenta de PayPal / Stripe / IBAN
  image_consent: boolean; // Consentimiento de uso de imagen
};

// Tipo unificado para el formulario completo
export type AmateurOnboardingInputs = PersonalData & ContactAndPaymentData;

const AmateurOnboarding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { renderInput } = useRenderInput<AmateurOnboardingInputs>();
  const { countryOptions } = useCountries();
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<AmateurOnboardingInputs>({
    shouldUnregister: false,
    mode: "onChange", // Validar en cada cambio para saber si puede avanzar
    reValidateMode: "onChange",
  });

  const steps = ["welcome", "personalData", "contactAndPayment", "success"] as const;
  const { step, next, back, isFirstStep, isLastStep } = useSteps({ steps });

  const onSubmit: SubmitHandler<AmateurOnboardingInputs> = async (data) => {
    try {
      await submitAmateurOnboarding(data);
      toast.success(t("amateurOnboarding.success", "¡Registro exitoso!"));
      next(); // Avanzar al step de éxito
    } catch (error) {
      console.error("Error submitting form:", error);
      
      let errorMessage = t("amateurOnboarding.error", "Error al enviar el formulario");
      
      if (error instanceof Error) {
        // Traducir errores comunes de Supabase para mejor UX
        if (error.message.includes("duplicate key") && error.message.includes("email")) {
          errorMessage = t("amateurOnboarding.emailDuplicate", "Este correo electrónico ya está registrado");
        } else if (error.message.includes("duplicate key")) {
          errorMessage = t("amateurOnboarding.duplicate", "Ya existe un registro con estos datos");
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage);
    }
  };

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Funciones de navegación con scroll
  const handleNext = async () => {
    // Si estamos en contactAndPayment (el último step antes de success), hacer submit
    if (step === "contactAndPayment") {
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
        return [
          "firstname",
          "lastname",
          "nationality",
          "birth_date",
          "height",
          "city",
          "country",
          "professional_photo",
        ];
      case "contactAndPayment":
        return [
          "email",
          "phone",
          "payment_account",
          "image_consent",
        ];
      default:
        return [];
    }
  };

  const personalDataInputs: InputConfig<AmateurOnboardingInputs>[] = [
    {
      id: "firstname",
      label: "proOnboarding.firstName.label",
      type: "text",
      placeholder: "proOnboarding.firstName.placeholder",
      required: true,
      autoComplete: "given-name",
      colClass: "col-md-6",
    },
    {
      id: "lastname",
      label: "proOnboarding.lastName.label",
      type: "text",
      placeholder: "proOnboarding.lastName.placeholder",
      required: true,
      autoComplete: "family-name",
      colClass: "col-md-6",
    },
    {
      id: "nationality",
      label: "proOnboarding.nationality.label",
      type: "singleselect",
      placeholder: "proOnboarding.nationality.placeholder",
      required: true,
      colClass: "col-md-6",
      options: countryOptions,
      control: control,
    },
    {
      id: "birth_date",
      label: "proOnboarding.birthDate.label",
      type: "date",
      required: true,
      colClass: "col-md-6",
      max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0],
    },
    {
      id: "height",
      label: "proOnboarding.height.label",
      type: "height",
      placeholder: "175",
      required: true,
      colClass: "col-md-6",
    },
    {
      id: "city",
      label: "proOnboarding.city.label",
      type: "text",
      placeholder: "proOnboarding.city.placeholder",
      required: true,
      autoComplete: "address-level2",
      colClass: "col-md-6",
    },
    {
      id: "country",
      label: "proOnboarding.country.label",
      type: "singleselect",
      placeholder: "proOnboarding.country.placeholder",
      required: true,
      colClass: "col-md-6",
      options: countryOptions,
      control: control,
    },
    {
      id: "professional_photo",
      label: "proOnboarding.professionalPhoto.label",
      type: "file",
      accept: "image/*",
      helperText: "proOnboarding.professionalPhoto.helper",
      required: true,
      colClass: "col-12",
    },
  ];

  const contactAndPaymentInputs: InputConfig<AmateurOnboardingInputs>[] = [
    {
      id: "email",
      label: "amateurOnboarding.email.label",
      type: "email",
      placeholder: "amateurOnboarding.email.placeholder",
      required: true,
      autoComplete: "email",
      colClass: "col-md-6",
    },
    {
      id: "phone",
      label: "amateurOnboarding.phone.label",
      type: "tel",
      placeholder: "amateurOnboarding.phone.placeholder",
      required: true,
      autoComplete: "tel",
      colClass: "col-md-6",
    },
    {
      id: "payment_account",
      label: "amateurOnboarding.paymentAccount.label",
      type: "singleselect",
      placeholder: "amateurOnboarding.paymentAccount.placeholder",
      required: true,
      colClass: "col-12",
      options: [
        { value: "paypal", label: "PayPal" },
        { value: "stripe", label: "Stripe" },
        { value: "iban", label: "IBAN" },
      ],
      control: control,
      isSearchable: false,
    },
    {
      id: "image_consent",
      label: "amateurOnboarding.imageConsent.label",
      type: "checkbox",
      checkboxLabel: "amateurOnboarding.imageConsent.checkboxLabel",
      required: true,
      colClass: "col-12",
    },
  ];

  // Renderizar contenido según el step actual
  const renderStepContent = () => {
    switch (step) {
      case "welcome":
        return (
          <div className="d-flex align-items-center justify-content-center text-center" style={{ minHeight: '70vh' }}>
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
              {/* <div className="mb-3">
                <h5 className="mb-3 text-secondary">
                  {t(
                    "proOnboarding.welcome.selectLanguage",
                    "Selecciona tu idioma preferido"
                  )}
                </h5>
                <LanguageSwitcher />
              </div> */}
            </div>
          </div>
        );

      case "personalData":
        return (
          <div>
            <h3 className="mb-4 text-center">
              {t("amateurOnboarding.personalData.title", "Datos Personales")}
            </h3>
            <div className="row">
              {personalDataInputs.map((input) =>
                renderInput({ input, register, errors })
              )}
            </div>
          </div>
        );

      case "contactAndPayment":
        return (
          <div>
            <h3 className="mb-4 text-center">
              {t("amateurOnboarding.contactAndPayment.title", "Contacto y Pago")}
            </h3>
            <div className="row">
              {contactAndPaymentInputs.map((input) =>
                renderInput({ input, register, errors })
              )}
            </div>
          </div>
        );

      case "success":
        return (
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
            <div className="text-center py-5">
              <div className="mb-4">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-success"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h1 className="display-4 mb-4 text-success">
                {t("amateurOnboarding.successScreen.title", "¡Registro Completado!")}
              </h1>
              <p className="lead text-muted mb-4">
                {t("amateurOnboarding.successScreen.message", "Tu perfil ha sido creado exitosamente. Ahora puedes explorar y reservar experiencias con profesionales.")}
              </p>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/home")}
              >
                {t("amateurOnboarding.successScreen.button", "Ir al Inicio")}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="main-wrapper contact-us-page">
        <section className="" style={{ minHeight: '100vh' }}>
          <div className="container">
            <form
              className="contact-us position-relative"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Step Progress - Solo mostrar después del step de bienvenida y antes de success */}
              {step !== "welcome" && step !== "success" && (
                <StepProgress steps={steps} currentStep={step} />
              )}

              {/* Renderizar contenido del step actual */}
              {renderStepContent()}

              {step !== "success" && (
                <NavigationButtons
                  onBack={handleBack}
                  onNext={handleNext}
                  isFirstStep={isFirstStep}
                  isLastStep={isLastStep}
                />
              )}
            </form>
          </div>
        </section>

        {/* /Page Content */}
      </div>
    </div>
  );
};

export default AmateurOnboarding;
