import { useContext, useState } from "react";
import axios from "axios";
import Uid from "short-unique-id";
import { StoreCtx } from "../context/store";

const { randomUUID } = new Uid({ length: 6 });

interface About {
  firstName: string;
  lastName: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  intro: string;
  avatar: string;
  gitHubLink: string;
  linkedInLink: string;
  XLink: string;
}

interface Experience {
  jobTitle: string;
  companyName: string;
  description: string;
  fromDate: string;
  toDate: string;
}

interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  grade: string;
  fromDate: string;
  toDate: string;
}

interface CreateResumeFormProps {
  closeModal: () => void;
  isEdit?: boolean;
}

const defaultEmptyValue = {
  about: {
    firstName: "",
    lastName: "",
    streetName: "",
    city: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    intro: "",
    avatar: "",
    gitHubLink: "",
    linkedInLink: "",
    XLink: "",
  },
  experience: [
    {
      jobTitle: "",
      companyName: "",
      description: "",
      fromDate: "",
      toDate: "",
    },
  ],
  education: [
    {
      school: "",
      degree: "",
      fieldOfStudy: "",
      grade: "",
      fromDate: "",
      toDate: "",
    },
  ],
  skills: [],
};

export const CreateResumeForm = ({
  closeModal,
  isEdit = false,
}: CreateResumeFormProps) => {
  const { setResumeData, setUserId, userId } = useContext(StoreCtx);
  const { resumeData } = useContext(StoreCtx);

  const [formData, setFormData] = useState<{
    about: About;
    experience: Experience[];
    education: Education[];
    skills: string[];
  }>(isEdit ? resumeData : defaultEmptyValue);

  const [skill, setSkill] = useState("");

  const handleAboutChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedAbout: About = formData.about;
    updatedAbout[name as keyof About] = value;
    setFormData({ ...formData, about: updatedAbout });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const dataUrl = e.target?.result;
        if (dataUrl) {
          const about = { ...formData.about, avatar: dataUrl as string };
          setFormData({ ...formData, about });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedExperience: Experience[] = [...formData.experience];
    updatedExperience[index][name as keyof Experience] = value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  const handleEducationChange = (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedEducation: Education[] = [...formData.education];
    updatedEducation[index][name as keyof Education] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          jobTitle: "",
          companyName: "",
          description: "",
          fromDate: "",
          toDate: "",
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          school: "",
          degree: "",
          fieldOfStudy: "",
          grade: "",
          fromDate: "",
          toDate: "",
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };

  const addSkill = () => {
    if (skill.trim() !== "") {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let id = "";

    if (userId) {
      id = userId;
    } else {
      id = `${formData.about.firstName}-${
        formData.about.lastName
      }-${randomUUID()}`;
    }

    setResumeData(formData);
    setUserId(id);

    await axios.put(
      `https://resume-builder-f9c12-default-rtdb.firebaseio.com/users/${id}.json`,
      formData
    );

    closeModal();

    const url = new URL(window.location.href);
    url.searchParams.set("username", id);
    window.history.pushState({}, "", url);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>About</h2>
      <div className="mb-3">
        <label className="form-label">
          First Name <span className="input-label-require-mark">*</span>
        </label>
        <input
          required
          type="text"
          name="firstName"
          className="form-control"
          value={formData.about.firstName}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Last Name <span className="input-label-require-mark">*</span>
        </label>
        <input
          required
          type="text"
          name="lastName"
          className="form-control"
          value={formData.about.lastName}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Street Name <span className="input-label-require-mark">*</span>
        </label>
        <input
          required
          type="text"
          name="streetName"
          className="form-control"
          value={formData.about.streetName}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          City <span className="input-label-require-mark">*</span>
        </label>
        <input
          required
          type="text"
          name="city"
          className="form-control"
          value={formData.about.city}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Country <span className="input-label-require-mark">*</span>
        </label>
        <input
          required
          type="text"
          name="country"
          className="form-control"
          value={formData.about.country}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Postal Code <span className="input-label-require-mark">*</span>
        </label>
        <input
          required
          type="text"
          name="postalCode"
          className="form-control"
          value={formData.about.postalCode}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Phone Number <span className="input-label-require-mark">*</span>
        </label>
        <input
          required
          type="text"
          name="phoneNumber"
          className="form-control"
          value={formData.about.phoneNumber}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Email <span className="input-label-require-mark">*</span>
        </label>
        <input
          required
          type="email"
          name="email"
          className="form-control"
          value={formData.about.email}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Intro <span className="input-label-require-mark">*</span>
        </label>
        <textarea
          rows={5}
          required
          name="intro"
          className="form-control"
          value={formData.about.intro}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Avatar <span className="input-label-require-mark">*</span>
        </label>
        <input
          type="file"
          required={!formData.about.avatar}
          name="avatar"
          className="form-control"
          onChange={handleAvatarChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">GitHub Link</label>
        <input
          type="url"
          name="gitHubLink"
          className="form-control"
          value={formData.about.gitHubLink}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">LinkedIn Link</label>
        <input
          type="url"
          name="linkedInLink"
          className="form-control"
          value={formData.about.linkedInLink}
          onChange={handleAboutChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">X Link</label>
        <input
          type="url"
          name="XLink"
          className="form-control"
          value={formData.about.XLink}
          onChange={handleAboutChange}
        />
      </div>
      <h2>Experience</h2>
      {formData.experience.map((exp, index) => (
        <div key={index} className="mb-3">
          <label className="form-label">
            Job Title <span className="input-label-require-mark">*</span>
          </label>
          <input
            required
            type="text"
            name="jobTitle"
            className="form-control"
            value={exp.jobTitle}
            onChange={(e) => handleExperienceChange(index, e)}
          />
          <label className="form-label">
            Company Name <span className="input-label-require-mark">*</span>
          </label>
          <input
            required
            type="text"
            name="companyName"
            className="form-control"
            value={exp.companyName}
            onChange={(e) => handleExperienceChange(index, e)}
          />
          <label className="form-label">
            Description <span className="input-label-require-mark">*</span>
          </label>
          <textarea
            required
            rows={5}
            name="description"
            className="form-control"
            value={exp.description}
            onChange={(e) => handleExperienceChange(index, e)}
          />
          <label className="form-label">From Date</label>
          <input
            type="text"
            name="fromDate"
            className="form-control"
            value={exp.fromDate}
            onChange={(e) => handleExperienceChange(index, e)}
          />
          <label className="form-label">To Date</label>
          <input
            type="text"
            name="toDate"
            className="form-control"
            value={exp.toDate}
            onChange={(e) => handleExperienceChange(index, e)}
          />
          <button
            type="button"
            className="btn btn-outline-danger btn-sm mt-2"
            onClick={() => removeExperience(index)}
          >
            <i className="bi bi-trash" />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={addExperience}
      >
        <i className="bi bi-plus" />
      </button>
      <h2>Education</h2>
      {formData.education.map((edu, index) => (
        <div key={index} className="mb-3">
          <label className="form-label">
            School <span className="input-label-require-mark">*</span>
          </label>
          <input
            required
            type="text"
            name="school"
            className="form-control"
            value={edu.school}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <label className="form-label">
            Degree <span className="input-label-require-mark">*</span>
          </label>
          <input
            required
            type="text"
            name="degree"
            className="form-control"
            value={edu.degree}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <label className="form-label">
            Field of Study <span className="input-label-require-mark">*</span>
          </label>
          <input
            type="text"
            name="fieldOfStudy"
            className="form-control"
            value={edu.fieldOfStudy}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <label className="form-label">Grade</label>
          <input
            type="text"
            name="grade"
            className="form-control"
            value={edu.grade}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <label className="form-label">From Date</label>
          <input
            type="text"
            name="fromDate"
            className="form-control"
            value={edu.fromDate}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <label className="form-label">To Date</label>
          <input
            type="text"
            name="toDate"
            className="form-control"
            value={edu.toDate}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <button
            type="button"
            className="btn btn-outline-danger btn-sm mt-2"
            onClick={() => removeEducation(index)}
          >
            <i className="bi bi-trash" />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={addEducation}
      >
        <i className="bi bi-plus" />
      </button>
      <h2>Skills</h2>
      <div className="mb-3">
        <label className="form-label">Skill</label>
        <input
          type="text"
          name="skill"
          className="form-control"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <ul className="list-group mb-3">
          {formData.skills.map((skill, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {skill}
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeSkill(index)}
              >
                <i className="bi bi-trash" />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-secondary mt-2"
          onClick={addSkill}
        >
          <i className="bi bi-plus" />
        </button>
      </div>
      <button style={{ color: "white" }} type="submit" className="btn color-bg">
        Submit
      </button>
    </form>
  );
};
