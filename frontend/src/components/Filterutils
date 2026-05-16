// Fuzzy keyword matcher
export const fuzzyMatch = (text, keywords) => {
  if (!text) return false;
  const t = text.toLowerCase();
  return keywords.some(k => t.includes(k.toLowerCase()));
};

export const filterData = [
  {
    filterType: "Location",
    name: "location",
    array: [
      { label: "Delhi NCR",  value: "delhi",     keywords: ["delhi", "ncr", "noida", "gurgaon", "gurugram", "faridabad"] },
      { label: "Bangalore",  value: "bangalore",  keywords: ["bangalore", "bengaluru"] },
      { label: "Hyderabad",  value: "hyderabad",  keywords: ["hyderabad", "secunderabad"] },
      { label: "Pune",       value: "pune",       keywords: ["pune"] },
      { label: "Mumbai",     value: "mumbai",     keywords: ["mumbai", "bombay", "navi mumbai"] },
      { label: "Chennai",    value: "chennai",    keywords: ["chennai", "madras"] },
      { label: "Kolkata",    value: "kolkata",    keywords: ["kolkata", "calcutta"] },
      { label: "Bhubaneswar", value: "bhubaneswar", keywords: ["bhubaneswar", "bbsr"] },
      { label: "Remote",     value: "remote",     keywords: ["remote", "work from home", "wfh"] },
    ],
  },
  {
    filterType: "Job Role",
    name: "role",
    array: [
      { label: "Frontend Developer",  value: "frontend",   keywords: ["frontend", "front-end", "front end", "frontend developer", "ui developer"] },
      { label: "Backend Developer",   value: "backend",    keywords: ["backend", "back-end", "back end", "backend developer", "server developer"] },
      { label: "FullStack Developer", value: "fullstack",  keywords: ["fullstack", "full stack", "full-stack", "mern", "mean"] },
      { label: "Data Science",        value: "data",       keywords: ["data scien", "data analyst", "data engineer", "machine learning", "deep learning", "nlp", "data science", "data scientist"] },
      { label: "UI/UX Designer",      value: "design",     keywords: ["ui/ux", "ux designer", "ui designer", "figma", "product design", "graphic designer", "visual design"] },
      { label: "DevOps Engineer",     value: "devops",     keywords: ["devops", "cloud", "aws", "azure", "docker", "kubernetes", "ci/cd", "sre"] },
      { label: "Mobile Developer",    value: "mobile",     keywords: ["mobile", "android", "ios", "react native", "flutter", "swift", "kotlin"] },
      { label: "Software Engineer",   value: "software",   keywords: ["software engineer", "software developer", "sde ", "swe "] },
      { label: "QA / Testing",        value: "qa",         keywords: ["qa", "quality", "testing", "automation", "selenium", "tester"] },
    ],
  },
  {
    filterType: "Job Type",
    name: "jobType",
    array: [
      { label: "Full-Time",  value: "fulltime",   keywords: ["full-time", "full time", "permanent", "regular"] },
      { label: "Part-Time",  value: "parttime",   keywords: ["part-time", "part time"] },
      { label: "Internship", value: "internship", keywords: ["intern", "internship", "trainee"] },
      { label: "Freelance",  value: "freelance",  keywords: ["freelance", "freelancer", "contract basis"] },
      { label: "Contract",   value: "contract",   keywords: ["contract", "contractual", "temp"] },
    ],
  },
  {
    filterType: "Experience",
    name: "experience",
    array: [
      { label: "Fresher (0–1 yr)", value: "fresher", keywords: ["fresher", "fresh", "entry", "0", "no experience", "0-1", "graduate"] },
      { label: "Junior (1–3 yrs)", value: "junior",  keywords: ["junior", "1-3", "1 year", "2 year", "associate"] },
      { label: "Mid (3–5 yrs)",    value: "mid",     keywords: ["mid", "3-5", "3 year", "4 year", "5 year", "intermediate"] },
      { label: "Senior (5+ yrs)",  value: "senior",  keywords: ["senior", "lead", "5+", "6", "7", "8", "9", "10", "experienced"] },
    ],
  },
  {
    filterType: "Salary Range",
    name: "salary",
    array: [
      { label: "0 – 5 LPA",   value: "0-5",   min: 0,  max: 5   },
      { label: "5 – 10 LPA",  value: "5-10",  min: 5,  max: 10  },
      { label: "10 – 20 LPA", value: "10-20", min: 10, max: 20  },
      { label: "20 – 40 LPA", value: "20-40", min: 20, max: 40  },
      { label: "40+ LPA",     value: "40+",   min: 40, max: 9999},
    ],
  },
];

export const applyFilters = (jobs, selected) => {
  return jobs.filter(job => {
    const locSel = selected.location;
    if (locSel?.size > 0) {
      const match = [...locSel].some(val => {
        const item = filterData.find(g => g.name === 'location')?.array.find(a => a.value === val);
        return fuzzyMatch(job.location, item?.keywords || [val]);
      });
      if (!match) return false;
    }

    const roleSel = selected.role;
    if (roleSel?.size > 0) {
      const match = [...roleSel].some(val => {
        const item = filterData.find(g => g.name === 'role')?.array.find(a => a.value === val);
        const kw = item?.keywords || [val];
        // Only match against title to avoid noisy description matches
        return fuzzyMatch(job.title, kw);
      });
      if (!match) return false;
    }

    const typeSel = selected.jobType;
    if (typeSel?.size > 0) {
      const match = [...typeSel].some(val => {
        const item = filterData.find(g => g.name === 'jobType')?.array.find(a => a.value === val);
        const kw = item?.keywords || [val];
        // Match jobType field and title only
        return fuzzyMatch(job.jobType, kw) || fuzzyMatch(job.title, kw);
      });
      if (!match) return false;
    }

    const expSel = selected.experience;
    if (expSel?.size > 0) {
      const match = [...expSel].some(val => {
        const item = filterData.find(g => g.name === 'experience')?.array.find(a => a.value === val);
        const kw = item?.keywords || [val];
        // Only match experienceLevel field
        return fuzzyMatch(String(job.experienceLevel || ''), kw);
      });
      if (!match) return false;
    }

    const salSel = selected.salary;
    if (salSel?.size > 0) {
      const match = [...salSel].some(val => {
        const item = filterData.find(g => g.name === 'salary')?.array.find(a => a.value === val);
        if (!item) return false;
        const s = Number(job.salary);
        return s >= item.min && s <= item.max;
      });
      if (!match) return false;
    }

    return true;
  });
};