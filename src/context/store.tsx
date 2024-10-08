import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import avatar from "../assets/avatar.jpg";
import axios from "axios";
import { setUrlUsernameParam } from "../utils";

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
  skills: [] as string[],
};

const defaultResumeData = {
  about: {
    firstName: "Mustafa",
    lastName: "Battiwala",
    streetName: "Campbell Street",
    city: "Karachi",
    country: "Pakistan",
    postalCode: "74200",
    phoneNumber: "+92 (335) 711-0128",
    email: "mustafa.batti128@gmail.com",
    intro:
      "I am experienced in leveraging agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.",
    avatar: avatar,
    gitHubLink: "https://github.com/mustafa128110",
    linkedInLink: "https://www.linkedin.com/in/mustafa-battiwala-9bba87223",
    XLink: "https://x.com/Mustafa_Batti",
  },
  experience: [
    {
      jobTitle: "Senior Web Developer",
      companyName: "Intelitec Solutions",
      description:
        "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.",
      fromDate: "March 2013",
      toDate: "Present",
    },
    {
      jobTitle: "Web Developer",
      companyName: "Intelitec Solutions",
      description:
        "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.",
      fromDate: "December 2011 ",
      toDate: "March 2013",
    },
    {
      jobTitle: "Junior Web Designer",
      companyName: "Shout! Media Productions",
      description:
        "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.",
      fromDate: "July 2010",
      toDate: "December 2011",
    },
    {
      jobTitle: "Web Design Intern",
      companyName: "Shout! Media Productions",
      description:
        "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.",
      fromDate: "September 2008",
      toDate: "June 2010",
    },
  ],
  education: [
    {
      school: "University of Colorado Boulder",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science - Web Development Track",
      grade: "GPA: 3.23",
      fromDate: "August 2006",
      toDate: "May 2010",
    },
    {
      school: "James Buchanan High School",
      degree: "Technology Magnet Program",
      fieldOfStudy: "",
      grade: "GPA: 3.56",
      fromDate: "August 2002",
      toDate: "May 2006",
    },
  ],
  skills: [
    "Mobile-First, Responsive Design",
    "Cross Browser Testing & Debugging",
    "Cross Functional Teams",
    "Agile Development & Scrum",
  ],
};

const ctx: {
  resumeData: typeof defaultResumeData;
  setResumeData: Dispatch<SetStateAction<typeof defaultResumeData>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
} = {
  resumeData: defaultEmptyValue,
  setResumeData: () => {},
  userId: "",
  setUserId: () => {},
};

export const StoreCtx = createContext(ctx);

export const Store = ({ children }: any) => {
  const [resumeData, setResumeData] = useState(defaultEmptyValue);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get("username");

    if (username) {
      setUserId(username);
    } else {
      setResumeData(defaultResumeData);
      setUrlUsernameParam("");
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (userId) {
        const { data } = await axios.get(
          `https://resume-builder-f9c12-default-rtdb.firebaseio.com/users/${userId}.json`
        );
        if (data) {
          setResumeData(data);
        } else {
          alert("User not found!");
          setResumeData(defaultEmptyValue);
          setUrlUsernameParam("");
        }
      }
    })();
  }, [userId]);

  return (
    <StoreCtx.Provider value={{ userId, setUserId, resumeData, setResumeData }}>
      {children}
    </StoreCtx.Provider>
  );
};
