import { useForm, type SubmitHandler } from "react-hook-form";

export type ProOnboardingInputs = {
  //  Datos personales
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: string; // formato ISO (YYYY-MM-DD)
  height: number; // en cm
  city: string;
  country: string;

  // Datos profesionales
  sportDiscipline: "Tennis"; // fijo según tu descripción, pero se deja por claridad
  professionalLevel: "ATP" | "ITF" | "Coach" | "Senior Player" | "Club Pro";
  currentClub: string;
  playStyle: {
    hand: "Right-handed" | "Left-handed";
    backhand: "One-handed" | "Two-handed";
  };
  languages: string[]; // ej: ["English", "Spanish"]
  certifications: string[]; // ej: ["ITF", "PTR", "RPT"]
};

const ProOnboarding = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProOnboardingInputs>();

  const onSubmit: SubmitHandler<ProOnboardingInputs> = (data) =>
    console.log(data);
  return (
    <div>
      <div className="main-wrapper contact-us-page">
        <section className="section dull-bg">
          <div className="container">
            <form className="contact-us" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center">Welcome!</h2>
              <h4 className="mb-3">Personal Information</h4>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="first-name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first-name"
                    placeholder="Enter First Name"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <span className="form-error">This field is required</span>
                  )}
                </div>
                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="last-name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last-name"
                    placeholder="Enter Last Name"
                    {...register("lastName", { required: true })}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="nationality" className="form-label">
                    Nationality
                  </label>
                  <select
                    className="form-control"
                    id="nationality"
                    value={"Select a country..."}
                    {...register("nationality", { required: true })}
                  >
                    <option value="" disabled>
                      Select a country...
                    </option>
                    <option>Argentina</option>
                    <option>USA</option>
                    <option>Uruguay</option>
                  </select>
                </div>

                {/* <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="e-mail" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="e-mail"
                    placeholder="Enter Email Address"
                  />
                </div> */}
                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="birthDate" className="form-label">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthDate"
                    {...register("birthDate", { required: true })}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="height" className="form-label">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="height"
                    placeholder="Enter your height"
                    {...register("height", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    City of Residence
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Enter your city"
                    {...register("city", { required: true })}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="country" className="form-label">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="Enter your country"
                    {...register("country", { required: true })}
                  />
                </div>
                {/* <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter Phone Number"
                  />
                </div> */}
              </div>
              <h4 className="mb-3 mt-4">Professional Information</h4>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="sportDiscipline" className="form-label">
                    Sport Discipline
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sportDiscipline"
                    defaultValue="Tennis"
                    readOnly
                    {...register("sportDiscipline")}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="professionalLevel" className="form-label">
                    Professional Level
                  </label>
                  <select
                    className="form-control"
                    id="professionalLevel"
                    {...register("professionalLevel", { required: true })}
                  >
                    <option value="">Select level...</option>
                    <option value="ATP">ATP</option>
                    <option value="ITF">ITF</option>
                    <option value="Coach">Coach</option>
                    <option value="Senior Player">Senior Player</option>
                    <option value="Club Pro">Club Pro</option>
                  </select>
                </div>

                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="currentClub" className="form-label">
                    Current Club or Institution
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="currentClub"
                    placeholder="Enter your current club"
                    {...register("currentClub")}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label className="form-label">Play Style</label>
                  <div className="d-flex gap-2">
                    <select
                      className="form-control"
                      {...register("playStyle.hand", { required: true })}
                    >
                      <option value="">Select hand...</option>
                      <option value="Right-handed">Right-handed</option>
                      <option value="Left-handed">Left-handed</option>
                    </select>

                    <select
                      className="form-control"
                      {...register("playStyle.backhand", { required: true })}
                    >
                      <option value="">Select backhand...</option>
                      <option value="One-handed">One-handed</option>
                      <option value="Two-handed">Two-handed</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="languages" className="form-label">
                    Languages
                  </label>
                  <select
                    multiple
                    className="form-control"
                    id="languages"
                    {...register("languages")}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="French">French</option>
                    <option value="Italian">Italian</option>
                  </select>
                  <small className="text-muted">
                    Use Ctrl/Cmd to select multiple
                  </small>
                </div>

                <div className="col-12 col-sm-12 col-md-6 mb-3">
                  <label htmlFor="certifications" className="form-label">
                    Licenses or Certifications
                  </label>
                  <select
                    multiple
                    className="form-control"
                    id="certifications"
                    {...register("certifications")}
                  >
                    <option value="ITF">ITF</option>
                    <option value="PTR">PTR</option>
                    <option value="RPT">RPT</option>
                    <option value="USPTA">USPTA</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-secondary d-flex align-items-center"
              >
                Submit
                <i className="feather-arrow-right-circle ms-2" />
              </button>
            </form>
          </div>
        </section>

        {/* /Page Content */}
      </div>
    </div>
  );
};

export default ProOnboarding;
