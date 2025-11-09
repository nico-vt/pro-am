import { useForm, type SubmitHandler, type FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import StepProgress from "./step-progress";
import { useSteps } from "../../hooks/useSteps";
import NavigationButtons from "./navigation-buttons";
import { useRenderInput, type InputConfig } from "./form-utils";
import { useCountries } from "../../hooks/useCountries";
import { submitProfessionalOnboarding } from "../../core/supabase/client";
import { toast } from "sonner";

export type ProOnboardingInputs = {
  //  Datos personales
  first_name: string;
  last_name: string;
  nationality: string;
  birth_date: string; // formato ISO (YYYY-MM-DD)
  height: number; // en cm
  city: string;
  country: string;

  // Datos profesionales
  professional_level: "ATP" | "ITF" | "Coach" | "Senior Player" | "Club Pro";
  current_club: string;
  play_style: {
    hand: "Right-handed" | "Left-handed";
    backhand: "One-handed" | "Two-handed";
  };
  languages: string[]; // ej: ["English", "Spanish"]
  certifications: string[]; // ej: ["ITF", "PTR", "RPT"]

  // Oferta ProAm
  experience_type: string; // entrenamiento 1:1, sesión de sparring, etc.
  typical_duration: string; // duración típica de la experiencia
  location: string; // ubicación donde ofrece la experiencia
  base_fee: number; // tarifa base en USD/EUR
  currency: "USD" | "EUR";
  includes: {
    equipment: boolean;
    court: boolean;
    transport: boolean;
    videoAnalysis: boolean;
  };

  // Material Promocional
  intro_video: string; // link a YouTube o Vimeo (opcional)
  social_links: {
    website: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };

  // Datos de contacto y pago
  email: string;
  phone: string; // Teléfono / WhatsApp
  payment_account: string; // PayPal / Stripe / IBAN
  agent: string; // Representante/Agencia (opcional)
  image_consent: boolean; // Consentimiento de uso de imagen
};

const ProOnboarding = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { renderInput } = useRenderInput<ProOnboardingInputs>();
  const { countryOptions } = useCountries();
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<ProOnboardingInputs>({ 
    shouldUnregister: false,
    mode: "onChange",
    reValidateMode: "onChange"
  });
  const steps = ["welcome", "personalData", "professionalData", "proAmOffer", "promotionalMaterial", "contactAndPayment", "success"] as const;
  const { step, next, back, isFirstStep, isLastStep } = useSteps({ steps });

  // Helper para extraer el error simple de campos anidados
  const getFieldError = (fieldId: string): FieldError | undefined => {
    const keys = fieldId.split('.');
    let error: Record<string, unknown> | undefined = errors as Record<string, unknown>;
    for (const key of keys) {
      error = error?.[key] as Record<string, unknown> | undefined;
      if (!error) break;
    }
    return error as FieldError | undefined;
  };

  const onSubmit: SubmitHandler<ProOnboardingInputs> = async (data) => {
    try {
      await submitProfessionalOnboarding(data);
      toast.success(t("proOnboarding.success", "¡Registro exitoso!"));
      next(); // Avanzar al step de éxito
    } catch (error) {
      console.error("Error submitting form:", error);
      
      let errorMessage = t("proOnboarding.error", "Error al enviar el formulario");
      
      if (error instanceof Error) {
        // Traducir errores comunes de Supabase a mensajes amigables
        if (error.message.includes("duplicate key") && error.message.includes("email")) {
          errorMessage = t("proOnboarding.emailDuplicate", "Este correo electrónico ya está registrado");
        } else if (error.message.includes("duplicate key")) {
          errorMessage = t("proOnboarding.duplicate", "Ya existe un registro con estos datos");
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage);
    }
  };

  // Configuración de inputs para datos personales
  const personalDataInputs: InputConfig<ProOnboardingInputs>[] = [
    {
      id: "first_name",
      label: t("proOnboarding.firstName.label"),
      type: "text",
      placeholder: t("proOnboarding.firstName.placeholder"),
      required: true,
      autoComplete: "given-name"
    },
    {
      id: "last_name",
      label: t("proOnboarding.lastName.label"),
      type: "text",
      placeholder: t("proOnboarding.lastName.placeholder"),
      required: true,
      autoComplete: "family-name"
    },
    {
      id: "nationality",
      label: t("proOnboarding.nationality.label"),
      type: "singleselect",
      placeholder: t("proOnboarding.nationality.placeholder"),
      required: true,
      options: countryOptions,
      control: control
    },
    {
      id: "birth_date",
      label: t("proOnboarding.birthDate.label"),
      type: "date",
      placeholder: t("proOnboarding.birthDate.placeholder"),
      required: true,
      autoComplete: "bday",
      max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]
    },
    {
      id: "height",
      label: t("proOnboarding.height.label"),
      type: "height",
      placeholder: t("proOnboarding.height.placeholder"),
      required: true,
      isMetric: i18n.language === "es"
    },
    {
      id: "city",
      label: t("proOnboarding.city.label"),
      type: "text",
      placeholder: t("proOnboarding.city.placeholder"),
      required: true,
      autoComplete: "address-level2"
    },
    {
      id: "country",
      label: t("proOnboarding.country.label"),
      type: "singleselect",
      placeholder: t("proOnboarding.country.placeholder"),
      required: true,
      options: countryOptions,
      control: control
    }
  ];

  // Configuración de inputs para datos profesionales (solo campos simples)
  const professionalDataInputs: InputConfig<ProOnboardingInputs>[] = [
    {
      id: "professional_level",
      label: t("proOnboarding.professionalLevel.label"),
      type: "singleselect",
      placeholder: t("proOnboarding.professionalLevel.placeholder"),
      required: true,
      options: Object.entries(
        t("proOnboarding.professionalLevel.options", { returnObjects: true }) as Record<string, string>
      ).map(([value, label]) => ({ value, label })),
      control: control,
      isSearchable: false
    },
    {
      id: "current_club",
      label: t("proOnboarding.currentClub.label", "Current Club or Institution"),
      type: "text",
      placeholder: t("proOnboarding.currentClub.placeholder", "Enter your current club"),
      required: false
    },
    {
      id: "languages",
      label: t("proOnboarding.languages.label", "Languages"),
      type: "multiselect",
      placeholder: t("proOnboarding.languages.placeholder", "Select languages..."),
      required: false,
      options: [
        { value: "English", label: "English" },
        { value: "Spanish", label: "Spanish" },
        { value: "Portuguese", label: "Portuguese" },
        { value: "French", label: "French" },
        { value: "Italian", label: "Italian" },
        { value: "German", label: "German" },
        { value: "Chinese", label: "Chinese" },
        { value: "Japanese", label: "Japanese" },
        { value: "Arabic", label: "Arabic" }
      ],
      control: control,
      colClass: "col-md-6"
    },
    {
      id: "certifications",
      label: t("proOnboarding.certifications.label", "Licenses or Certifications"),
      type: "multiselect",
      placeholder: t("proOnboarding.certifications.placeholder", "Select certifications..."),
      required: false,
      options: [
        { value: "ITF", label: "ITF" },
        { value: "PTR", label: "PTR" },
        { value: "RPT", label: "RPT" },
        { value: "USPTA", label: "USPTA" },
        { value: "USPTR", label: "USPTR" },
        { value: "LTA", label: "LTA" }
      ],
      control: control,
      colClass: "col-md-6"
    }
  ];

  // Configuración de inputs para oferta ProAm (campos simples)
  const proAmOfferInputs: InputConfig<ProOnboardingInputs>[] = [
    {
      id: "experience_type",
      label: t("proOnboarding.experienceType.label", "Tipo de experiencia ofrecida"),
      type: "singleselect",
      placeholder: t("proOnboarding.experienceType.placeholder", "Selecciona el tipo de experiencia"),
      required: true,
      options: [
        { value: "training1on1", label: t("proOnboarding.experienceType.training1on1", "Entrenamiento 1:1") },
        { value: "sparringSession", label: t("proOnboarding.experienceType.sparringSession", "Sesión de sparring") },
        { value: "clinic", label: t("proOnboarding.experienceType.clinic", "Clínica") },
        { value: "meetAndPlay", label: t("proOnboarding.experienceType.meetAndPlay", "Meet & Play") },
        { value: "proAmTournament", label: t("proOnboarding.experienceType.proAmTournament", "Torneo ProAm") }
      ],
      control: control,
      isSearchable: false
    },
    {
      id: "typical_duration",
      label: t("proOnboarding.typicalDuration.label", "Duración típica de la experiencia"),
      type: "singleselect",
      placeholder: t("proOnboarding.typicalDuration.placeholder", "Selecciona la duración"),
      required: true,
      options: Object.entries(
        t("proOnboarding.typicalDuration.options", { returnObjects: true }) as Record<string, string>
      ).map(([value, label]) => ({ value, label })),
      control: control,
      isSearchable: false
    },
    {
      id: "location",
      label: t("proOnboarding.location.label", "Ubicación donde ofrece la experiencia"),
      type: "text",
      placeholder: t("proOnboarding.location.placeholder", "Club, ciudad o área geográfica"),
      required: true
    }
  ];

  // Configuración de inputs para material promocional (campos simples)
  const promotionalMaterialInputs: InputConfig<ProOnboardingInputs>[] = [
    {
      id: "intro_video",
      label: t("proOnboarding.introVideo.label", "Video corto de presentación"),
      type: "url",
      placeholder: t("proOnboarding.introVideo.placeholder", "youtube.com/watch?v=... o youtu.be/..."),
      required: false,
      helperText: t("proOnboarding.introVideo.helper", "Link a YouTube o Vimeo (opcional)")
    }
  ];

  // Configuración de inputs para contacto y pago
  const contactAndPaymentInputs: InputConfig<ProOnboardingInputs>[] = [
    {
      id: "email",
      label: t("proOnboarding.contactAndPayment.email.label", "Correo electrónico"),
      type: "email",
      placeholder: t("proOnboarding.contactAndPayment.email.placeholder", "tu@email.com"),
      required: true,
      autoComplete: "email"
    },
    {
      id: "phone",
      label: t("proOnboarding.contactAndPayment.phone.label", "Teléfono / WhatsApp"),
      type: "tel",
      placeholder: t("proOnboarding.contactAndPayment.phone.placeholder", "+1 234 567 8900"),
      required: true,
      autoComplete: "tel"
    },
    {
      id: "payment_account",
      label: t("proOnboarding.contactAndPayment.paymentAccount.label", "Cuenta de pago"),
      type: "singleselect",
      placeholder: t("proOnboarding.contactAndPayment.paymentAccount.placeholder", "Selecciona método de pago"),
      required: true,
      options: [
        { value: "paypal", label: "PayPal" },
        { value: "stripe", label: "Stripe" },
        { value: "iban", label: "IBAN" }
      ],
      control: control,
      isSearchable: false
    },
    {
      id: "agent",
      label: t("proOnboarding.contactAndPayment.agent.label", "Representante/Agencia"),
      type: "text",
      placeholder: t("proOnboarding.contactAndPayment.agent.placeholder", "Nombre del representante"),
      required: false,
      helperText: t("proOnboarding.optional", "(opcional)")
    },
    {
      id: "image_consent",
      label: "",
      type: "checkbox",
      checkboxLabel: t("proOnboarding.contactAndPayment.imageConsent.label", "Acepto el uso de mi imagen con fines promocionales"),
      required: true
    }
  ];

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Función para obtener los campos del step actual
  const getCurrentStepFields = (): (keyof ProOnboardingInputs | `play_style.hand` | `play_style.backhand`)[] => {
    switch (step) {
      case "welcome":
        return [];
      case "personalData":
        return ["first_name", "last_name", "nationality", "birth_date", "height", "city", "country"];
      case "professionalData":
        return ["professional_level", "current_club", "play_style.hand", "play_style.backhand", "languages", "certifications"];
      case "proAmOffer":
        return ["experience_type", "typical_duration", "location"]; // base_fee y currency se validan en handleNext en el bloque custom
      case "promotionalMaterial":
        return []; // intro_video es opcional
      case "contactAndPayment":
        return ["email", "phone", "payment_account", "image_consent"]; // agent es opcional
      default:
        return [];
    }
  };

  // Funciones de navegación con scroll y validación
  const handleNext = async () => {
    // Si estamos en contactAndPayment (el último step antes de success), hacer submit
    if (step === "contactAndPayment") {
      await handleSubmit(onSubmit)();
      return;
    }

    // Obtener los campos del step actual
    const currentStepFields = getCurrentStepFields();
    
    // Validar solo los campos del step actual
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isValid = await trigger(currentStepFields as any);
    
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

  return (
    <div>
      <div className="main-wrapper contact-us-page">
        <section className="" style={{ minHeight: '100vh' }}>
          <div className="container">
            <form
              className="contact-us position-relative"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Step Progress - Solo mostrar después del step de bienvenida */}
              {step !== "welcome" && (
                <StepProgress 
                  steps={steps} 
                  currentStep={step}
                />
              )}

              {/* ---------------- Step 1: Bienvenida ---------------- */}
              {step === "welcome" && (
                <WelcomeSection />
              )}

              {/* ---------------- Datos Personales ---------------- */}
              {step === "personalData" && (
                <PersonalDataSection 
                  inputs={personalDataInputs}
                  register={register} 
                  errors={errors}
                  renderInput={renderInput}
                  getFieldError={getFieldError}
                />
              )}

              {/* ---------------- Datos Profesionales ---------------- */}
              {step === "professionalData" && (
                <ProfessionalDataSection 
                  inputs={professionalDataInputs}
                  register={register} 
                  errors={errors}
                  renderInput={renderInput}
                  getFieldError={getFieldError}
                />
              )}

              {/* ---------------- Oferta ProAm ---------------- */}
              {step === "proAmOffer" && (
                <ProAmOfferSection 
                  inputs={proAmOfferInputs}
                  register={register} 
                  errors={errors}
                  renderInput={renderInput}
                  getFieldError={getFieldError}
                />
              )}

              {/* ---------------- Material Promocional ---------------- */}
              {step === "promotionalMaterial" && (
                <PromotionalMaterialSection 
                  inputs={promotionalMaterialInputs}
                  register={register} 
                  errors={errors}
                  renderInput={renderInput}
                  getFieldError={getFieldError}
                />
              )}

              {/* ---------------- Contacto y Pago ---------------- */}
              {step === "contactAndPayment" && (
                <ContactAndPaymentSection 
                  inputs={contactAndPaymentInputs}
                  register={register} 
                  errors={errors}
                  renderInput={renderInput}
                  getFieldError={getFieldError}
                />
              )}

              {/* ---------------- Pantalla de Éxito ---------------- */}
              {step === "success" && (
                <SuccessSection navigate={navigate} />
              )}

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

export default ProOnboarding;

type DataSectionProps = {
  register: ReturnType<typeof useForm<ProOnboardingInputs>>["register"];
  errors: ReturnType<
    typeof useForm<ProOnboardingInputs>
  >["formState"]["errors"];
};

type PersonalDataSectionProps = DataSectionProps & {
  inputs: InputConfig<ProOnboardingInputs>[];
  renderInput: ReturnType<typeof useRenderInput<ProOnboardingInputs>>['renderInput'];
  getFieldError: (fieldId: string) => FieldError | undefined;
};

const PersonalDataSection = ({ inputs, register, renderInput, getFieldError }: PersonalDataSectionProps) => {
  const { t } = useTranslation();
  
  // Construir errores simples para los campos de esta sección
  const sectionErrors: Record<string, FieldError> = {};
  inputs.forEach(input => {
    const error = getFieldError(input.id);
    if (error) sectionErrors[input.id] = error;
  });
  
  return (
    <>
      <h4 className="mb-3">{t("proOnboarding.personalInformation")}</h4>
      <div className="row">
        {inputs.map((input) => (
          <div key={input.id} className={input.colClass || "col-md-6 mb-3"}>
            {renderInput({ input, register, errors: sectionErrors })}
          </div>
        ))}
      </div>
    </>
  );
};

type ProfessionalDataSectionProps = DataSectionProps & {
  inputs: InputConfig<ProOnboardingInputs>[];
  renderInput: ReturnType<typeof useRenderInput<ProOnboardingInputs>>['renderInput'];
  getFieldError: (fieldId: string) => FieldError | undefined;
};

const ProfessionalDataSection = ({ inputs, register, renderInput, getFieldError }: ProfessionalDataSectionProps) => {
  const { t } = useTranslation();
  
  // Construir errores simples para los campos de esta sección
  const sectionErrors: Record<string, FieldError> = {};
  inputs.forEach(input => {
    const error = getFieldError(input.id);
    if (error) sectionErrors[input.id] = error;
  });
  
  return (
    <>
      <h4 className="mb-3 mt-4">
        {t("proOnboarding.professionalInformation", "Professional Information")}
      </h4>
      <div className="row">


        {/* Renderizar todos los campos (incluyendo multiselects) usando renderInput */}
        {inputs.slice(1).map((input) => (
          <div key={input.id} className={input.colClass || "col-md-6 mb-3"}>
            {renderInput({ input, register, errors: sectionErrors })}
          </div>
        ))}

        {/* playStyle: dos selects juntos (requiere renderizado personalizado) */}
        <div className="col-md-6 mb-3">
          <label className="form-label">
            {t("proOnboarding.playStyle.label", "Play Style")}
          </label>
          <div className="d-flex gap-2">
            <select
              className="form-control"
              {...register("play_style.hand", { required: true })}
            >
              <option value="">
                {t("proOnboarding.playStyle.hand.placeholder", "Select hand...")}
              </option>
              {Object.entries(
                t("proOnboarding.playStyle.hand.options", { returnObjects: true }) as Record<string, string>
              ).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            <select
              className="form-control"
              {...register("play_style.backhand", { required: true })}
            >
              <option value="">
                {t("proOnboarding.playStyle.backhand.placeholder", "Select backhand...")}
              </option>
              {Object.entries(
                t("proOnboarding.playStyle.backhand.options", { returnObjects: true }) as Record<string, string>
              ).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

type ProAmOfferSectionProps = DataSectionProps & {
  inputs: InputConfig<ProOnboardingInputs>[];
  renderInput: ReturnType<typeof useRenderInput<ProOnboardingInputs>>['renderInput'];
  getFieldError: (fieldId: string) => FieldError | undefined;
};

const ProAmOfferSection = ({ inputs, register, errors, renderInput, getFieldError }: ProAmOfferSectionProps) => {
  const { t } = useTranslation();
  
  // Construir errores simples para los campos de esta sección
  const sectionErrors: Record<string, FieldError> = {};
  inputs.forEach(input => {
    const error = getFieldError(input.id);
    if (error) sectionErrors[input.id] = error;
  });
  
  return (
    <>
      <h4 className="mb-3 mt-4">
        {t("proOnboarding.proAmOffer", "Oferta ProAm")}
      </h4>
      <div className="row">
        {/* Renderizar campos simples usando renderInput */}
        {inputs.map((input) => (
          <div key={input.id} className={input.colClass || "col-md-6 mb-3"}>
            {renderInput({ input, register, errors: sectionErrors })}
          </div>
        ))}

        {/* baseFee + currency: dos campos juntos (requiere renderizado personalizado) */}
        <div className="col-md-6 mb-3">
          <label className="form-label">
            {t("proOnboarding.baseFee.label", "Tarifa base")}
          </label>
          <div className="d-flex gap-2">
            <input
              type="number"
              className="form-control"
              placeholder={t("proOnboarding.baseFee.placeholder", "Ingresa la tarifa")}
              {...register("base_fee", {
                required: true,
                valueAsNumber: true,
                min: 0,
              })}
            />
            <select
              className="form-control"
              style={{ maxWidth: "100px" }}
              {...register("currency", { required: true })}
            >
              <option value="">
                {t("proOnboarding.currency.placeholder", "Moneda")}
              </option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          {(errors.base_fee || errors.currency) && (
            <span className="form-error">{t("proOnboarding.formError")}</span>
          )}
        </div>

        {/* includes: checkboxes (renderizado personalizado) */}
        <div className="col-12 mb-3">
          <label className="form-label">
            {t("proOnboarding.includes.label", "¿Qué incluye?")}
          </label>
          <div className="row">
            <div className="col-md-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeEquipment"
                  {...register("includes.equipment")}
                />
                <label className="form-check-label" htmlFor="includeEquipment">
                  {t("proOnboarding.includes.equipment", "Equipamiento")}
                </label>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeCourt"
                  {...register("includes.court")}
                />
                <label className="form-check-label" htmlFor="includeCourt">
                  {t("proOnboarding.includes.court", "Cancha")}
                </label>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeTransport"
                  {...register("includes.transport")}
                />
                <label className="form-check-label" htmlFor="includeTransport">
                  {t("proOnboarding.includes.transport", "Transporte")}
                </label>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeVideoAnalysis"
                  {...register("includes.videoAnalysis")}
                />
                <label className="form-check-label" htmlFor="includeVideoAnalysis">
                  {t("proOnboarding.includes.videoAnalysis", "Videoanálisis")}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type PromotionalMaterialSectionProps = DataSectionProps & {
  inputs: InputConfig<ProOnboardingInputs>[];
  renderInput: ReturnType<typeof useRenderInput<ProOnboardingInputs>>['renderInput'];
  getFieldError: (fieldId: string) => FieldError | undefined;
};

const PromotionalMaterialSection = ({ inputs, register, renderInput, getFieldError }: PromotionalMaterialSectionProps) => {
  const { t } = useTranslation();
  
  // Construir errores simples para los campos de esta sección
  const sectionErrors: Record<string, FieldError> = {};
  inputs.forEach(input => {
    const error = getFieldError(input.id);
    if (error) sectionErrors[input.id] = error;
  });
  
  return (
    <>
      <h4 className="mb-3 mt-4">
        {t("proOnboarding.promotionalMaterial", "Material Promocional")}
      </h4>
      <div className="row">
        {/* Renderizar professionalPhoto e introVideo usando renderInput */}
        {inputs.map((input) => (
          <div key={input.id} className={input.colClass || "col-md-6 mb-3"}>
            {renderInput({ input, register, errors: sectionErrors })}
          </div>
        ))}

        {/* socialLinks: campos anidados (renderizado personalizado) */}
        <div className="col-12 mb-3">
          <label className="form-label">
            ✅ {t("proOnboarding.socialLinks.label", "Enlaces a redes o sitio web oficial")}
          </label>
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className="input-group">
                <span className="input-group-text">🌐</span>
                <input
                  type="url"
                  className="form-control"
                  placeholder={t("proOnboarding.socialLinks.website.placeholder", "Sitio web oficial")}
                  {...register("social_links.website")}
                />
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="input-group">
                <span className="input-group-text">📷</span>
                <input
                  type="url"
                  className="form-control"
                  placeholder={t("proOnboarding.socialLinks.instagram.placeholder", "Instagram")}
                  {...register("social_links.instagram")}
                />
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="input-group">
                <span className="input-group-text">🐦</span>
                <input
                  type="url"
                  className="form-control"
                  placeholder={t("proOnboarding.socialLinks.twitter.placeholder", "Twitter/X")}
                  {...register("social_links.twitter")}
                />
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="input-group">
                <span className="input-group-text">💼</span>
                <input
                  type="url"
                  className="form-control"
                  placeholder={t("proOnboarding.socialLinks.linkedin.placeholder", "LinkedIn")}
                  {...register("social_links.linkedin")}
                />
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <div className="input-group">
                <span className="input-group-text">📺</span>
                <input
                  type="url"
                  className="form-control"
                  placeholder={t("proOnboarding.socialLinks.youtube.placeholder", "YouTube")}
                  {...register("social_links.youtube")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type ContactAndPaymentSectionProps = DataSectionProps & {
  inputs: InputConfig<ProOnboardingInputs>[];
  renderInput: ReturnType<typeof useRenderInput<ProOnboardingInputs>>['renderInput'];
  getFieldError: (fieldId: string) => FieldError | undefined;
};

const ContactAndPaymentSection = ({ inputs, register, renderInput, getFieldError }: ContactAndPaymentSectionProps) => {
  const { t } = useTranslation();
  
  // Construir errores simples para los campos de esta sección
  const sectionErrors: Record<string, FieldError> = {};
  inputs.forEach(input => {
    const error = getFieldError(input.id);
    if (error) sectionErrors[input.id] = error;
  });
  
  return (
    <>
      <h4 className="mb-3 mt-4">
        {t("proOnboarding.contactAndPayment.title", "Contacto y Datos de Pago")}
      </h4>
      <div className="row">
        {/* Renderizar todos los campos usando renderInput */}
        {inputs.map((input) => (
          <div key={input.id} className={input.colClass || (input.type === "checkbox" ? "col-12 mb-3" : "col-md-6 mb-3")}>
            {renderInput({ input, register, errors: sectionErrors })}
          </div>
        ))}
      </div>
    </>
  );
};

const SuccessSection = ({ navigate }: { navigate: ReturnType<typeof useNavigate> }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <div className="text-center py-5">
          {/* Icono de éxito */}
          <div className="mb-4">
            <svg
              className="mx-auto"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: '#28a745' }}
            >
              <polyline points="20 6 9 17 4 12"></polyline>
              <circle cx="12" cy="12" r="10" fill="none"></circle>
            </svg>
          </div>

          {/* Mensaje de éxito */}
          <h1 className="mb-3">
            {t("proOnboarding.successScreen.title", "¡Registro Completado!")}
          </h1>
          <p className="lead text-muted mb-4">
            {t(
              "proOnboarding.successScreen.message",
              "Tu perfil profesional ha sido creado exitosamente. Ahora puedes comenzar a ofrecer tus servicios."
            )}
          </p>

          {/* Botón para ir al inicio */}
          <button
            type="button"
            className="btn btn-primary btn-lg px-5"
            onClick={() => navigate("/home")}
          >
            {t("proOnboarding.successScreen.button", "Ir al Inicio")}
          </button>
        </div>
    </div>
  );
};

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex align-items-center justify-content-center text-center" style={{ minHeight: '70vh' }}>
      <div className="mb-3">
        <h1 className="display-4 mb-4 text-primary">
          {t("proOnboarding.welcome.title", "¡Bienvenido a ProAm!")}
        </h1>
        <p className="lead text-muted mb-4">
          {t(
            "proOnboarding.welcome.subtitle",
            "Completa tu perfil profesional para comenzar a ofrecer experiencias únicas."
          )}
        </p>
        <div className="mb-4">
          <p className="text-muted">
            {t(
              "proOnboarding.welcome.description",
              "Este proceso te llevará solo unos minutos y te permitirá conectar con jugadores que buscan mejorar su juego."
            )}
          </p>
        </div>
      </div>

      {/* <div className="mb-3">
        <h5 className="mb-3 text-secondary">
          {t("proOnboarding.welcome.selectLanguage", "Selecciona tu idioma preferido")}
        </h5>
        <LanguageSwitcher />
      </div> */}

    </div>
  );
};
