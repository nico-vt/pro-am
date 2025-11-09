import { useForm, type SubmitHandler } from "react-hook-form";
import { useSteps } from "../../hooks/useSteps";
import { useTranslation } from "react-i18next";
import StepProgress from "./step-progress";
import LanguageSwitcher from "./language-switch";
import NavigationButtons from "./navigation-buttons";
import { useRenderInput, type InputConfig } from "./form-utils";
import { useCountries } from "../../hooks/useCountries";
import { submitAmateurOnboarding } from "../../core/supabase/client";

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
  const { renderInput } = useRenderInput<AmateurOnboardingInputs>();
  const { countryOptions } = useCountries();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<AmateurOnboardingInputs>({
    shouldUnregister: false,
    mode: "onChange", // Validar en cada cambio para saber si puede avanzar
    reValidateMode: "onChange",
  });

  const steps = ["welcome", "personalData", "contactAndPayment"] as const;
  const { step, next, back, isFirstStep, isLastStep } = useSteps({ steps });

  const onSubmit: SubmitHandler<AmateurOnboardingInputs> = async (data) => {
    try {
      await submitAmateurOnboarding(data);
      alert(t("amateurOnboarding.success", "¡Registro exitoso!"));
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(t("amateurOnboarding.error", "Error al enviar el formulario. Por favor intenta nuevamente."));
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
      type: "select",
      placeholder: "proOnboarding.nationality.placeholder",
      required: true,
      colClass: "col-md-6",
      options: countryOptions,
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
      type: "select",
      placeholder: "proOnboarding.country.placeholder",
      required: true,
      colClass: "col-md-6",
      options: countryOptions,
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
      type: "select",
      placeholder: "amateurOnboarding.paymentAccount.placeholder",
      required: true,
      colClass: "col-12",
      options: [
        { value: "paypal", label: "PayPal" },
        { value: "stripe", label: "Stripe" },
        { value: "iban", label: "IBAN" },
      ],
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
              <div className="mb-3">
                <h5 className="mb-3 text-secondary">
                  {t(
                    "proOnboarding.welcome.selectLanguage",
                    "Selecciona tu idioma preferido"
                  )}
                </h5>
                <LanguageSwitcher />
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

              <NavigationButtons
                onBack={handleBack}
                onNext={handleNext}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
              />
            </form>
          </div>
        </section>

        {/* /Page Content */}
      </div>
    </div>
  );
};

export default AmateurOnboarding;
