import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Search, MapPin, Briefcase, Building2, Users, TrendingUp, ChevronRight, Star, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import NestLogo from "@/assets/NestLogo.svg";

/* ── Vetted · Hireable · Ready pill (reused from HeroSection) ── */
const VettedBadge = () => (
  <svg viewBox="0 0 320 40" width="100%" style={{ maxWidth: "320px" }} height="40" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="318" height="38" rx="19" ry="19"
      fill="#f0ebe0" stroke="#c8b99a" strokeWidth="1.2" />
    <path d="M22 20 L26 16 L30 20 L26 24 Z" fill="#4a6741" opacity="0.85" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
      fontFamily="'Georgia', 'Times New Roman', serif"
      fontSize="11.5" letterSpacing="2.8" fill="#4a6741" fontWeight="600">
      VETTED · HIREABLE · READY
    </text>
    <path d="M290 20 L294 16 L298 20 L294 24 Z" fill="#4a6741" opacity="0.85" />
  </svg>
);

/* ── Stats data ── */
const stats = [
  { icon: Briefcase, label: "Jobs Posted",    value: "12,000+" },
  { icon: Building2, label: "Companies",      value: "800+"    },
  { icon: Users,     label: "Job Seekers",    value: "50,000+" },
  { icon: TrendingUp,label: "Placements",     value: "8,500+"  },
];

/* ── Categories ── */
const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Science",
  "UI/UX Designer",
  "DevOps Engineer",
  "Android Developer",
  "Product Manager",
];

/* ── How it works steps ── */
const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Sign up and build your professional profile with your skills, experience, and portfolio.",
  },
  {
    number: "02",
    title: "Explore Opportunities",
    description: "Browse thousands of curated job listings matched to your skills and career goals.",
  },
  {
    number: "03",
    title: "Apply with One Click",
    description: "Submit your application instantly. Track your application status in real time.",
  },
  {
    number: "04",
    title: "Get Hired",
    description: "Connect with top recruiters and land your dream job faster than ever before.",
  },
];

/* ── Testimonials ── */
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    company: "TechVista Systems",
    text: "Hire Nest helped me land my dream job within 3 weeks. The job matching is incredibly accurate!",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Backend Engineer",
    company: "Softpro India",
    text: "The platform is clean, fast, and the recruiter connections are genuine. Highly recommended.",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Data Analyst",
    company: "Diginfoweb Technologies",
    text: "Applied to 5 companies through Hire Nest. Got 3 interviews in a week. Amazing experience!",
    rating: 5,
  },
];

/* ══════════════════════════════════════════════════════════════ */
const LandingPage = () => {
  const [query, setQuery] = useState("");
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { user }  = useSelector((store) => store.auth);

  // If already logged in, redirect based on role — same pattern as Home.jsx & Login.jsx
  React.useEffect(() => {
    if (user) {
      if (user.role === "recruiter") {
        navigate("/admin/companies");
      } else {
        navigate("/");
      }
    }
  }, [user]);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleCategoryClick = (cat) => {
    dispatch(setSearchedQuery(cat));
    navigate("/browse");
  };

  return (
    <div style={{ backgroundColor: "#f5f2e8", minHeight: "100vh", fontFamily: "Georgia, serif" }}>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 640px) {
          .landing-search-bar { flex-wrap: wrap; border-radius: 12px !important; padding: 0.5rem !important; gap: 0.5rem !important; }
          .landing-search-input { width: 100% !important; padding: 0.5rem 0 !important; }
          .landing-search-divider { display: none !important; }
          .landing-search-location { display: none !important; }
          .landing-search-btn { width: 100% !important; border-radius: 8px !important; height: 40px !important; }
          .landing-footer-inner { flex-direction: column !important; align-items: flex-start !important; gap: 1.25rem !important; }
          .landing-cta-buttons { flex-direction: column !important; align-items: stretch !important; }
          .landing-cta-buttons a, .landing-cta-buttons button { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      {/* ══ NAVBAR ══════════════════════════════════════════════ */}
      <Navbar />

      {/* ══ HERO SECTION ════════════════════════════════════════ */}
      <section style={{
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f2e8",
        padding: "3rem 1rem",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", maxWidth: "680px", width: "100%", textAlign: "center" }}>

          {/* Logo */}
          <img src={NestLogo} alt="Hire Nest Logo"
            style={{ width: "clamp(8rem, 30vw, 15rem)", height: "clamp(8rem, 30vw, 15rem)", objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(74,103,65,0.10))" }} />

          {/* Heading */}
          <h1 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2rem, 8vw, 4rem)",
            fontWeight: 800, letterSpacing: "0.18em", lineHeight: 1, margin: 0,
          }}>
            <span style={{ color: "#2c2415" }}>HIRE </span>
            <span style={{ color: "#4a6741" }}>NEST</span>
          </h1>

          {/* Badge */}
          <VettedBadge />

          {/* Tagline */}
          <p style={{
            fontFamily: "Georgia, serif", color: "#7a6a52",
            fontSize: "clamp(0.82rem, 2.5vw, 0.95rem)", letterSpacing: "0.03em", lineHeight: 1.75,
            maxWidth: "440px", marginTop: "-4px", padding: "0 0.5rem",
          }}>
            Discover opportunities matched to your skills — every role curated,
            every candidate career-ready.
          </p>

          {/* Search bar */}
          <div className="landing-search-bar" style={{
            display: "flex", width: "100%",
            boxShadow: "0 2px 12px rgba(74,100,65,0.10)",
            border: "1px solid #d9cdb8",
            borderRadius: "999px",
            backgroundColor: "#fff",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0 0 0 1rem",
          }}>
            <Search size={16} style={{ color: "#9a8a6a", flexShrink: 0 }} />
            <input
              className="landing-search-input"
              type="text"
              placeholder="Job title, keywords, or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
              style={{
                outline: "none", border: "none", width: "100%",
                fontSize: "0.875rem", padding: "0.75rem 0",
                backgroundColor: "transparent", color: "#2c2415",
              }}
            />
            <span className="landing-search-divider" style={{ width: "1px", background: "#d9cdb8", alignSelf: "stretch", margin: "8px 0" }} />
            <div className="landing-search-location" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0 0.75rem", whiteSpace: "nowrap" }}>
              <MapPin size={14} style={{ color: "#9a8a6a" }} />
              <span style={{ fontSize: "0.78rem", color: "#9a8a6a" }}>India</span>
            </div>
            <Button
              className="landing-search-btn"
              onClick={searchJobHandler}
              style={{
                borderRadius: "0 999px 999px 0",
                padding: "0 1.5rem",
                height: "48px",
                fontSize: "0.875rem",
                fontWeight: 600,
                backgroundColor: "#4a6741",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s ease",
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#3a5233"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#4a6741"}
            >
              Find Jobs
            </Button>
          </div>

          {/* Social proof */}
          <p style={{ fontSize: "0.78rem", color: "#a09070", letterSpacing: "0.04em", marginTop: "-4px" }}>
            Trusted by&nbsp;
            <span style={{ color: "#4a6741", fontWeight: 600 }}>12,000+</span>
            &nbsp;professionals &amp;&nbsp;
            <span style={{ color: "#4a6741", fontWeight: 600 }}>800+</span>
            &nbsp;companies
          </p>
        </div>
      </section>

      {/* ══ STATS STRIP ═════════════════════════════════════════ */}
      <section style={{
        backgroundColor: "#fdfaf4",
        borderTop: "1px solid #e0d5c0",
        borderBottom: "1px solid #e0d5c0",
        padding: "2.5rem 1.5rem",
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "1.5rem", textAlign: "center",
        }}>
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                backgroundColor: "#eaf2e4", border: "1px solid #c0d9b0",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={22} style={{ color: "#4a6741" }} />
              </div>
              <span style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", fontWeight: 800, color: "#2c2415", fontFamily: "Georgia, serif" }}>
                {value}
              </span>
              <span style={{ fontSize: "0.82rem", color: "#7a6a52", letterSpacing: "0.04em" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CATEGORY SECTION ════════════════════════════════════ */}
      <section style={{ padding: "3.5rem 1.5rem", backgroundColor: "#f5f2e8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 700,
            color: "#2c2415", marginBottom: "0.5rem",
          }}>
            <span style={{ color: "#4a6741" }}>Browse </span>By Category
          </h2>
          <p style={{ color: "#7a6a52", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Find the role that fits your expertise
          </p>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "0.75rem",
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "999px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  border: "1px solid #d9cdb8",
                  backgroundColor: "#fdfaf4",
                  color: "#4a3f2f",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "flex", alignItems: "center", gap: "6px",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = "#4a6741";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "#4a6741";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = "#fdfaf4";
                  e.currentTarget.style.color = "#4a3f2f";
                  e.currentTarget.style.borderColor = "#d9cdb8";
                }}
              >
                {cat}
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <section style={{
        padding: "3.5rem 1.5rem",
        backgroundColor: "#fdfaf4",
        borderTop: "1px solid #e0d5c0",
        borderBottom: "1px solid #e0d5c0",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 700,
            color: "#2c2415", marginBottom: "0.5rem", textAlign: "center",
          }}>
            How It <span style={{ color: "#4a6741" }}>Works</span>
          </h2>
          <p style={{ color: "#7a6a52", fontSize: "0.9rem", marginBottom: "3rem", textAlign: "center" }}>
            Get hired in four simple steps
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}>
            {steps.map(({ number, title, description }) => (
              <div key={number} style={{
                padding: "1.75rem",
                backgroundColor: "#f5f0e6",
                border: "1px solid #e0d5c0",
                borderRadius: "16px",
                position: "relative",
                transition: "box-shadow 0.2s ease, border-color 0.2s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(74,103,65,0.12)";
                  e.currentTarget.style.borderColor = "#c8b878";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e0d5c0";
                }}
              >
                <span style={{
                  display: "inline-block",
                  fontFamily: "Georgia, serif",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#eaf2e4",
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                  WebkitTextStroke: "1px #4a6741",
                }}>
                  {number}
                </span>
                <h3 style={{
                  fontFamily: "Georgia, serif", fontSize: "1rem",
                  fontWeight: 700, color: "#2c2415", marginBottom: "0.5rem",
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#6b5c45", lineHeight: 1.7, margin: 0 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════ */}
      <section style={{ padding: "3.5rem 1.5rem", backgroundColor: "#f5f2e8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 700,
            color: "#2c2415", marginBottom: "0.5rem", textAlign: "center",
          }}>
            What People <span style={{ color: "#4a6741" }}>Say</span>
          </h2>
          <p style={{ color: "#7a6a52", fontSize: "0.9rem", marginBottom: "3rem", textAlign: "center" }}>
            Real stories from real candidates
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}>
            {testimonials.map(({ name, role, company, text, rating }) => (
              <div key={name} style={{
                padding: "1.75rem",
                backgroundColor: "#fdfaf4",
                border: "1px solid #e0d5c0",
                borderRadius: "16px",
                boxShadow: "0 1px 4px rgba(74,103,65,0.06)",
                transition: "box-shadow 0.2s ease, border-color 0.2s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(74,103,65,0.12)";
                  e.currentTarget.style.borderColor = "#c8b878";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(74,103,65,0.06)";
                  e.currentTarget.style.borderColor = "#e0d5c0";
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: "3px", marginBottom: "0.75rem" }}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} style={{ color: "#c8a84b", fill: "#c8a84b" }} />
                  ))}
                </div>

                <p style={{
                  fontSize: "0.875rem", color: "#4a4035", lineHeight: 1.75,
                  marginBottom: "1.25rem", fontStyle: "italic",
                }}>
                  "{text}"
                </p>

                <div style={{ borderTop: "1px solid #e0d5c0", paddingTop: "1rem" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#2c2415", margin: "0 0 2px" }}>
                    {name}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "#4a6741", margin: 0 }}>
                    {role} · {company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══════════════════════════════════════════ */}
      <section style={{
        backgroundColor: "#4a6741",
        padding: "3.5rem 1.5rem",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 700,
            color: "#f5f0e6", marginBottom: "0.75rem",
          }}>
            Ready to Find Your Next Role?
          </h2>
          <p style={{ color: "#c8d8b8", fontSize: "0.95rem", marginBottom: "2rem", lineHeight: 1.7 }}>
            Join thousands of professionals who found their dream jobs through Hire Nest.
            Your next opportunity is just one search away.
          </p>
          <div className="landing-cta-buttons" style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/signup">
              <button style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#f5f0e6",
                color: "#3a5a1c",
                fontWeight: 700,
                fontSize: "0.9rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s ease",
                display: "flex", alignItems: "center", gap: "6px",
                width: "100%", justifyContent: "center",
              }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#fffdf5"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#f5f0e6"}
              >
                Get Started Free <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/jobs" style={{ width: "auto" }}>
              <button style={{
                padding: "0.75rem 2rem",
                backgroundColor: "transparent",
                color: "#f5f0e6",
                fontWeight: 600,
                fontSize: "0.9rem",
                borderRadius: "8px",
                border: "1px solid rgba(245,240,230,0.5)",
                cursor: "pointer",
                transition: "border-color 0.15s ease",
                width: "100%",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#f5f0e6"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(245,240,230,0.5)"}
              >
                Browse Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <footer style={{
        backgroundColor: "#fdfaf4",
        borderTop: "1px solid #e0d5c0",
        padding: "2.5rem 1.5rem",
      }}>
        <div className="landing-footer-inner" style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center",
          gap: "1.5rem",
        }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src={NestLogo} alt="Hire Nest Logo"
              style={{ height: "36px", width: "auto", objectFit: "contain", marginTop: "-8px" }} />
            <span style={{
              fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700,
              letterSpacing: "0.06em",
            }}>
              <span style={{ color: "#4a6428" }}>HIRE</span>
              <span style={{ color: "#2c2415" }}> NEST</span>
            </span>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            {[
              { label: "Home",   to: "/"       },
              { label: "Jobs",   to: "/jobs"  },
              { label: "Browse", to: "/browse"},
              { label: "About",  to: "/about" },
              { label: "Login",  to: "/login" },
            ].map(({ label, to }) => (
              <Link key={label} to={to} style={{
                fontSize: "0.85rem", color: "#6b5c45",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#4a6741"}
                onMouseLeave={e => e.currentTarget.style.color = "#6b5c45"}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ fontSize: "0.78rem", color: "#9a8a6a", margin: 0 }}>
            © 2026 Hire Nest. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;