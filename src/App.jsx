import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { api, clearSession, getSavedSession, saveSession } from "./api.js";

const rolePaths = {
  DONOR: "/donor",
  NGO: "/ngo",
  VOLUNTEER: "/volunteer",
  ADMIN: "/admin",
};

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const paths = {
    arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    arrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
    food: <><path d="M7 3v7" /><path d="M10 3v7" /><path d="M7 7h3" /><path d="M8.5 10v11" /><path d="M17 3c-1.7 2-2.5 4.6-2.5 7.4h5V3" /><path d="M17 10.4V21" /></>,
    heart: <path d="M20.8 8.8c0 5.3-8.8 10.1-8.8 10.1S3.2 14.1 3.2 8.8A4.5 4.5 0 0 1 12 6.6a4.5 4.5 0 0 1 8.8 2.2Z" />,
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v12h14V9" /><path d="M9 21v-7h6v7" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    logout: <><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M12 3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6" /></>,
    menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    sparkle: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></>,
    van: <><path d="M3 6h11v12H3z" /><path d="M14 10h4l3 3v5h-7z" /><circle cx="7.5" cy="19" r="1.5" /><circle cx="17.5" cy="19" r="1.5" /></>,
  };
  return <svg {...common}>{paths[name] || paths.sparkle}</svg>;
}

function Brand({ light = false }) {
  return <Link className={`brand ${light ? "brand-light" : ""}`} to="/" aria-label="FoodShare home">
    <span className="brand-mark"><Icon name="food" size={19} /></span>
    <span>food<span className="brand-accent">share</span></span>
  </Link>;
}

function PublicHeader({ active }) {
  return <header className="site-header">
    <div className="site-header-inner">
      <Brand />
      <nav className="public-nav" aria-label="Main navigation">
        <a className={active === "story" ? "active" : ""} href="/#our-story">Our story</a>
        <a href="/#how-it-works">How it works</a>
        <Link to="/food-safety">Food safety</Link>
      </nav>
      <div className="header-actions">
        <Link className="header-login" to="/login">Log in</Link>
        <Link className="button button-dark header-cta" to="/register">Join the movement <Icon name="arrow" size={16} /></Link>
      </div>
    </div>
  </header>;
}

function LandingPage() {
  return <>
    <PublicHeader />
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> GOOD FOOD. GOOD NEIGHBOURS.</div>
          <h1>There’s more<br />to share<span className="serif-italic"> than you think.</span></h1>
          <p className="hero-description">Every meal has the power to bring people closer. Give good food another life, right in your community.</p>
          <div className="hero-actions">
            <Link className="button button-dark button-large" to="/register">Be part of it <Icon name="arrowRight" size={18} /></Link>
            <a className="text-link" href="#how-it-works">See how it works <span className="play-icon">↓</span></a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true"><span>R</span><span>A</span><span>M</span><span>S</span></div>
            <div><strong>Good things happen locally.</strong><span>Join neighbours making a difference.</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image" role="img" aria-label="A beautifully prepared fresh meal ready to be shared" />
          <div className="image-overlay" />
          <div className="image-caption"><span className="caption-icon"><Icon name="heart" size={17} /></span><span>Made with care.<br /><strong>Shared with love.</strong></span></div>
          <div className="floating-note"><span className="floating-note-icon"><Icon name="sparkle" size={19} /></span><span><strong>A little extra?</strong><small>Someone nearby needs it.</small></span><Icon name="arrow" size={17} /></div>
          <span className="visual-index">01 <i /> 03</span>
        </div>
        <span className="hero-vertical-note">A community-powered food rescue</span>
      </section>

      <section className="impact-strip" id="our-story">
        <div className="impact-intro"><span>THE GOOD WE CAN DO</span><p>Small acts. A <em>big</em> difference.</p></div>
        <div className="impact-item"><strong>01</strong><span>Share extra<br />food, not waste.</span></div>
        <div className="impact-item"><strong>02</strong><span>Get good food<br />to good people.</span></div>
        <div className="impact-item"><strong>03</strong><span>Build a kinder<br />local community.</span></div>
        <Link className="impact-join" to="/register">Make a difference <Icon name="arrowRight" size={18} /></Link>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-topline"><span className="eyebrow">GOOD THINGS, MADE SIMPLE</span><span className="section-number">01 — 03</span></div>
        <div className="how-heading"><h2>One community.<br /><span className="serif-italic">A thousand ways to help.</span></h2><p>Whether you're sharing, collecting, or delivering, there's a place for you at the table.</p></div>
        <div className="role-cards">
          <RoleCard number="01" title="Share a little extra." description="Restaurants, neighbours, and generous cooks give perfectly good food a second chance." icon="food" role="DONOR" label="I'm a donor" />
          <RoleCard number="02" title="Feed your community." description="Local organisations connect nourishing meals to the people who need them most." icon="heart" role="NGO" label="I'm an organisation" />
          <RoleCard number="03" title="Be the missing link." description="Volunteers bridge the gap between a fresh meal and someone's front door." icon="van" role="VOLUNTEER" label="I'm a volunteer" />
        </div>
      </section>

      <section className="closing-cta">
        <div className="cta-orbit cta-orbit-one" /><div className="cta-orbit cta-orbit-two" />
        <div className="cta-content"><span className="eyebrow eyebrow-light">THERE'S A PLACE FOR YOU HERE</span><h2>Good food is too<br />good to go to waste.</h2><p>One share can change someone's day. Start yours today.</p><Link to="/register" className="button button-lime">Join FoodShare <Icon name="arrowRight" size={18} /></Link></div>
        <div className="cta-side-note"><Icon name="heart" size={21} /><span>Better together,<br /><strong>one meal at a time.</strong></span></div>
      </section>
    </main>
    <PublicFooter />
  </>;
}

function RoleCard({ number, title, description, icon, role, label }) {
  return <article className="role-card">
    <div className="role-card-top"><span>{number} / 03</span><span className="role-icon"><Icon name={icon} size={21} /></span></div>
    <h3>{title}</h3><p>{description}</p>
    <Link to={`/register?role=${role}`} className="role-card-link">{label} <Icon name="arrowRight" size={17} /></Link>
  </article>;
}

function PublicFooter() {
  return <footer className="site-footer"><Brand /><span>Good food, shared. © {new Date().getFullYear()} FoodShare.</span><Link to="/food-safety">Our food safety promise <Icon name="arrow" size={14} /></Link></footer>;
}

function AuthPage({ mode, onAuthenticated }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
    role: ["DONOR", "NGO", "VOLUNTEER"].includes(params.get("role")) ? params.get("role") : "",
    location: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (isRegister && form.password !== form.confirmPassword) {
      setError("Those passwords don't match. Give it another try.");
      return;
    }
    setBusy(true);
    try {
      if (isRegister) {
        await api("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            password: form.password,
            role: form.role,
            location: form.location.trim(),
          }),
        });
        setSuccess("You're on the list! Sign in to get started.");
        window.setTimeout(() => navigate("/login"), 1300);
      } else {
        const result = await api("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: form.email.trim(), password: form.password }),
        });
        saveSession(result.token, result.user);
        onAuthenticated(result.user);
        navigate(rolePaths[result.user.role] || "/");
      }
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  }

  return <div className="auth-layout">
    <aside className="auth-aside">
      <Brand light />
      <div className="auth-aside-copy">
        <span className="eyebrow eyebrow-light">A LITTLE GOES A LONG WAY</span>
        <h2>Make room<br />for <span className="serif-italic">more good.</span></h2>
        <p>Every plate shared is a reminder that nobody has to do it alone.</p>
      </div>
      <div className="auth-aside-bottom"><Icon name="heart" size={17} /><span>A community with enough to share.</span></div>
    </aside>
    <main className="auth-main">
      <Link to="/" className="auth-back">← Back to home</Link>
      <div className="auth-form-wrap">
        <div className="auth-heading"><span className="eyebrow">{isRegister ? "YOUR SEAT IS WAITING" : "GOOD TO HAVE YOU BACK"}</span>
          <h1>{isRegister ? "Join the table." : "Welcome back."}</h1>
          <p>{isRegister ? "Tell us a little about yourself to get started." : "Sign in and pick up where the good left off."}</p>
        </div>
        <form onSubmit={submit} className="auth-form">
          {isRegister && <>
            <FormField label="Your name"><input autoComplete="name" name="fullName" value={form.fullName} onChange={update} placeholder="Alex Morgan" required maxLength={100} /></FormField>
          </>}
          <FormField label="Email address"><input autoComplete="email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required /></FormField>
          {isRegister && <>
            <FormField label="Phone number"><input autoComplete="tel" name="phone" type="tel" value={form.phone} onChange={update} placeholder="+1 555 000 0000" required /></FormField>
          </>}
          <FormField label="Password"><div className="password-wrap"><input autoComplete={isRegister ? "new-password" : "current-password"} minLength={isRegister ? 8 : undefined} name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={update} placeholder={isRegister ? "At least 8 characters" : "Your password"} required /><button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button></div></FormField>
          {isRegister && <>
            <FormField label="Confirm password"><input autoComplete="new-password" name="confirmPassword" type={showPassword ? "text" : "password"} minLength={8} value={form.confirmPassword} onChange={update} placeholder="One more time" required /></FormField>
            <FormField label="I’m here as"><select name="role" value={form.role} onChange={update} required><option value="">Choose your role</option><option value="DONOR">Donor — I have food to share</option><option value="NGO">Organisation — I serve my community</option><option value="VOLUNTEER">Volunteer — I can help deliver</option></select></FormField>
            <FormField label="Your location"><input autoComplete="address-level2" name="location" value={form.location} onChange={update} placeholder="City or neighbourhood" required maxLength={150} /></FormField>
          </>}
          {error && <div className="form-alert" role="alert"><Icon name="close" size={16} />{error}</div>}
          {success && <div className="form-success" role="status"><Icon name="check" size={17} />{success}</div>}
          <button className="button button-dark button-large auth-submit" disabled={busy}>{busy ? "Just a moment…" : isRegister ? "Create my account" : "Sign in"} {!busy && <Icon name="arrowRight" size={18} />}</button>
        </form>
        <p className="auth-switch">{isRegister ? "Already part of the community?" : "New to FoodShare?"} <Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create an account"}</Link></p>
        <Link className="auth-safety" to="/food-safety"><Icon name="shield" size={16} />Your food safety matters to us</Link>
      </div>
    </main>
  </div>;
}

function FormField({ label, children }) {
  return <label className="form-field"><span>{label}</span>{children}</label>;
}

function AuthRoute({ user, onAuthenticated, mode }) {
  if (user) return <Navigate to={rolePaths[user.role] || "/"} replace />;
  return <AuthPage mode={mode} onAuthenticated={onAuthenticated} />;
}

function ProtectedRoute({ user, role, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={rolePaths[user.role] || "/"} replace />;
  return children;
}

function DashboardLayout({ user, active, children, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(active);
  const roleLabels = { DONOR: "Food donor", NGO: "Community partner", VOLUNTEER: "Volunteer", ADMIN: "Administrator" };
  const navItems = user.role === "DONOR"
    ? [["Overview", "home", "#dashboard-content"], ["My donations", "food", "#my-donations"]]
    : user.role === "NGO"
      ? [["Overview", "home", "#dashboard-content"], ["Find food", "food", "#available-food"], ["My requests", "clock", "#my-requests"]]
      : user.role === "VOLUNTEER"
        ? [["My deliveries", "van", "#dashboard-content"]]
        : [["Overview", "home", "#dashboard-content"], ["Community", "users", "#community-members"]];

  return <div className="dashboard-shell">
    <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-brand-row"><Brand /><button className="sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><Icon name="close" /></button></div>
      <div className="sidebar-workspace"><span className="workspace-icon"><Icon name="heart" size={17} /></span><span><strong>My community</strong><small>{user.location || "FoodShare network"}</small></span><span className="workspace-dot" /></div>
      <span className="sidebar-label">WORKSPACE</span>
      <nav className="sidebar-nav" aria-label="Dashboard">
        {navItems.map(([label, icon, href]) => <a key={label} className={selected === label ? "selected" : ""} href={href} onClick={() => { setSelected(label); setMenuOpen(false); }}><Icon name={icon} size={18} />{label}{selected === label && <span className="nav-active-dot" />}</a>)}
      </nav>
      <div className="sidebar-lower">
        <div className="sidebar-tip"><span className="tip-sparkle"><Icon name="sparkle" size={17} /></span><strong>One small act.</strong><p>One less meal wasted. One more neighbour cared for.</p><Link to="/#how-it-works">The FoodShare way <Icon name="arrowRight" size={15} /></Link></div>
        <button className="sidebar-logout" onClick={onLogout}><Icon name="logout" size={18} />Sign out</button>
        <div className="sidebar-profile"><span className="profile-avatar">{user.fullName?.charAt(0)?.toUpperCase() || "F"}</span><span className="profile-details"><strong>{user.fullName}</strong><small>{roleLabels[user.role]}</small></span><span className="profile-presence" /></div>
      </div>
    </aside>
    {menuOpen && <button className="sidebar-scrim" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}
    <main className="dashboard-main">
      <header className="dashboard-topbar"><button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Icon name="menu" /></button><div className="breadcrumb"><span>My community</span><b>/</b><strong>{active}</strong></div><div className="topbar-right"><span className="online-indicator" /> Your local food network <span className="topbar-avatar">{user.fullName?.charAt(0)?.toUpperCase() || "F"}</span></div></header>
      <div className="dashboard-content" id="dashboard-content">{children}</div>
      <footer className="dashboard-footer"><span>Made with care, for the community.</span><Link to="/food-safety">Food safety first <Icon name="arrow" size={13} /></Link></footer>
    </main>
  </div>;
}

function Dashboard({ user, onLogout }) {
  const [data, setData] = useState({ donations: [], requests: [], deliveries: [], summary: null });
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const role = user.role;

  async function load() {
    setBusy(true);
    setError("");
    try {
      if (role === "DONOR") {
        const donations = await api("/api/donations/my");
        setData((current) => ({ ...current, donations }));
      } else if (role === "NGO") {
        const [donations, requests] = await Promise.all([api("/api/donations"), api("/api/requests/my")]);
        setData((current) => ({ ...current, donations, requests }));
      } else if (role === "VOLUNTEER") {
        const deliveries = await api("/api/deliveries/my");
        setData((current) => ({ ...current, deliveries }));
      } else if (role === "ADMIN") {
        const summary = await api("/api/admin/summary");
        setData((current) => ({ ...current, summary }));
      }
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { load(); }, [role]);

  async function performAction(task, successMessage) {
    setError("");
    setNotice("");
    setSubmitting(true);
    try {
      await task();
      setNotice(successMessage);
      await load();
    } catch (reason) {
      setError(reason.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function createDonation(event) {
    event.preventDefault();
    const donationForm = event.currentTarget;
    const form = new FormData(donationForm);
    setError("");
    setNotice("");
    setSubmitting(true);
    try {
      await api("/api/donations", {
        method: "POST",
        body: JSON.stringify({
          foodName: form.get("foodName").trim(),
          description: form.get("description").trim(),
          quantity: Number(form.get("quantity")),
          location: form.get("location").trim(),
          pickupDate: form.get("pickupDate") || null,
          pickupTime: form.get("pickupTime") || null,
        }),
      });
      donationForm.reset();
      setNotice("Your donation is now listed. Thank you for sharing.");
      await load();
    } catch (reason) {
      setError(reason.message);
    } finally {
      setSubmitting(false);
    }
  }

  const pageTitle = { DONOR: "Every meal has a second act.", NGO: "Good food, meet good people.", VOLUNTEER: "You make the good go further.", ADMIN: "A community doing good." }[role];
  const pageDescription = { DONOR: "Your generosity helps turn extra food into something meaningful.", NGO: "Find fresh local food and connect it to your community.", VOLUNTEER: "Every delivery connects a neighbour to a little more care.", ADMIN: "Here's the impact your FoodShare community is making." }[role];
  const activeLabel = { DONOR: "Overview", NGO: "Overview", VOLUNTEER: "My deliveries", ADMIN: "Overview" }[role];

  return <DashboardLayout user={user} active={activeLabel} onLogout={onLogout}>
    <section className="dashboard-welcome">
      <div><span className="eyebrow">A FRESH DAY TO DO GOOD</span><h1>{pageTitle}</h1><p>{pageDescription}</p></div>
      <div className="welcome-date"><span className="welcome-date-icon"><Icon name="clock" size={17} /></span><span>{new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date())}</span></div>
    </section>
    {error && <div className="dashboard-alert" role="alert"><Icon name="close" size={17} />{error}<button onClick={load}>Try again</button></div>}
    {notice && <div className="dashboard-notice" role="status"><Icon name="check" size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><Icon name="close" size={16} /></button></div>}
    {role === "DONOR" && <DonorDashboard donations={data.donations} busy={busy} submitting={submitting} onSubmit={createDonation} />}
    {role === "NGO" && <NgoDashboard donations={data.donations} requests={data.requests} busy={busy} submitting={submitting} action={performAction} />}
    {role === "VOLUNTEER" && <VolunteerDashboard deliveries={data.deliveries} busy={busy} submitting={submitting} action={performAction} />}
    {role === "ADMIN" && <AdminDashboard summary={data.summary} busy={busy} />}
  </DashboardLayout>;
}

function StatCard({ icon, label, value, note, tint = "" }) {
  return <article className={`stat-card ${tint}`}><div className="stat-card-top"><span className="stat-icon"><Icon name={icon} size={18} /></span><span className="stat-note">{note}</span></div><strong className="stat-value">{value}</strong><span className="stat-label">{label}</span></article>;
}

function SectionHeading({ eyebrow, title, action }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{action}</div>;
}

function Status({ value }) {
  const status = (value || "UNKNOWN").toLowerCase().replaceAll("_", " ");
  return <span className={`status-pill status-${status.replaceAll(" ", "-")}`}><span />{status}</span>;
}

function LoadingCards() {
  return <div className="loading-cards" aria-label="Loading"><span /><span /><span /></div>;
}

function EmptyState({ icon = "food", title, description }) {
  return <div className="empty-state"><span className="empty-state-icon"><Icon name={icon} size={22} /></span><strong>{title}</strong><p>{description}</p></div>;
}

function DonorDashboard({ donations, busy, submitting, onSubmit }) {
  const active = donations.filter((item) => ["AVAILABLE", "REQUESTED", "ASSIGNED", "PICKED_UP"].includes(item.status)).length;
  const completed = donations.filter((item) => item.status === "DELIVERED").length;
  return <>
    <div className="stat-grid">
      <StatCard icon="food" label="Meals listed" value={donations.reduce((sum, item) => sum + (item.quantity || 0), 0)} note={`${donations.length} donations`} />
      <StatCard icon="clock" label="In good hands" value={active} note="On their way" tint="stat-warm" />
      <StatCard icon="heart" label="Successfully shared" value={completed} note="Delivered with care" tint="stat-lilac" />
    </div>
    <div className="dashboard-columns">
      <section className="panel donation-panel" id="share-food">
        <SectionHeading eyebrow="A LITTLE EXTRA GOES A LONG WAY" title="Share a meal" />
        <form onSubmit={onSubmit} className="donation-form">
          <FormField label="What are we sharing?"><input name="foodName" placeholder="e.g. Fresh vegetable soup" required maxLength={100} /></FormField>
          <div className="form-row">
            <FormField label="Number of meals"><input name="quantity" type="number" min="1" placeholder="e.g. 12" required /></FormField>
            <FormField label="Pickup date"><input name="pickupDate" type="date" min={new Date().toISOString().slice(0, 10)} /></FormField>
          </div>
          <FormField label="Pickup location"><input name="location" placeholder="Street, area or landmark" required maxLength={150} /></FormField>
          <div className="form-row">
            <FormField label="Pickup time"><input name="pickupTime" type="time" /></FormField>
            <FormField label="A note for the community"><input name="description" placeholder="Freshly prepared, contains nuts…" maxLength={500} /></FormField>
          </div>
          <button className="button button-dark donation-submit" disabled={submitting}><Icon name="plus" size={17} />{submitting ? "Sharing…" : "List this donation"}</button>
          <p className="form-footnote"><Icon name="shield" size={14} />Only share food that has been handled and stored safely.</p>
        </form>
      </section>
      <section className="panel contributions-panel" id="my-donations">
        <SectionHeading eyebrow="YOUR GENEROSITY IN ACTION" title="Your donations" />
        {busy ? <LoadingCards /> : donations.length ? <div className="donation-list">{donations.map((item) => <article className="donation-row" key={item.id}><span className="food-thumbnail"><Icon name="food" size={20} /></span><div className="donation-details"><strong>{item.foodName}</strong><span><Icon name="location" size={13} />{item.location} · {item.quantity} meals</span></div><Status value={item.status} /></article>)}</div> : <EmptyState title="Your first share starts here." description="List extra food and a local organisation can request it." /> }
      </section>
    </div>
  </>;
}

function NgoDashboard({ donations, requests, busy, submitting, action }) {
  const availableMeals = donations.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const requestedMeals = requests
    .filter((item) => ["PENDING", "APPROVED"].includes(item.status))
    .reduce((sum, item) => sum + (item.quantity || 0), 0);
  const deliveredMeals = requests
    .filter((item) => item.status === "DELIVERED")
    .reduce((sum, item) => sum + (item.quantity || 0), 0);

  return <>
    <div className="stat-grid">
      <StatCard icon="food" label="Meals available nearby" value={availableMeals} note={`${donations.length} local listings`} />
      <StatCard icon="clock" label="Meals requested" value={requestedMeals} note="Pending and approved requests" tint="stat-warm" />
      <StatCard icon="heart" label="Meals delivered" value={deliveredMeals} note="A real community impact" tint="stat-lilac" />
    </div>
    <section className="panel dashboard-section" id="available-food">
      <SectionHeading eyebrow="FRESH FROM YOUR NEIGHBOURHOOD" title="Food to share" action={<span className="result-count">{donations.length} available</span>} />
      {busy ? <LoadingCards /> : donations.length ? <div className="food-grid">{donations.map((item) => <article className="food-card" key={item.id}><div className="food-card-art"><span className="food-thumbnail"><Icon name="food" size={21} /></span><Status value={item.status} /></div><div className="food-card-content"><h3>{item.foodName}</h3><p>{item.description || "Shared with care by a local donor."}</p><span className="food-card-location"><Icon name="location" size={15} />{item.location}</span><div className="food-card-bottom"><strong>{item.quantity} <span>meals</span></strong><button className="button button-dark button-small" disabled={submitting} onClick={() => action(() => api("/api/requests", { method: "POST", body: JSON.stringify({ donationId: item.id, quantity: item.quantity }) }), "Your request has been sent to the donor.")}>Request food <Icon name="arrowRight" size={15} /></button></div></div></article>)}</div> : <EmptyState title="No food listed just yet." description="New neighbourhood donations will show up here." /> }
    </section>
    <section className="panel dashboard-section" id="my-requests">
      <SectionHeading eyebrow="KEEPING GOOD THINGS MOVING" title="Your requests" action={<span className="result-count">{requests.length} total</span>} />
      {busy ? <LoadingCards /> : requests.length ? <div className="request-list">{requests.map((item) => <article className="request-row" key={item.id}><span className="food-thumbnail"><Icon name="food" size={19} /></span><div className="donation-details"><strong>{item.donation?.foodName || "Food donation"}</strong><span>{item.quantity} meals · from {item.donation?.donor?.fullName || "a local donor"}</span></div><Status value={item.status} /><div className="request-actions">{item.status === "PENDING" && <><button className="button button-small" disabled={submitting} onClick={() => action(() => api(`/api/requests/${item.id}/approve`, { method: "PUT" }), "Request approved. A volunteer is on the way.")}>Approve</button><button className="button button-light button-small" disabled={submitting} onClick={() => action(() => api(`/api/requests/${item.id}/reject`, { method: "PUT" }), "The request has been declined.")}>Decline</button></>}</div></article>)}</div> : <EmptyState icon="clock" title="Your requests will appear here." description="Request a food listing above to keep good things moving." /> }
    </section>
  </>;
}

function VolunteerDashboard({ deliveries, busy, submitting, action }) {
  const waiting = deliveries.filter((item) => ["ASSIGNED", "ACCEPTED", "PICKED_UP"].includes(item.status)).length;
  const completed = deliveries.filter((item) => item.status === "DELIVERED").length;
  return <>
    <div className="stat-grid">
      <StatCard icon="van" label="Deliveries to make" value={waiting} note="You make this happen" />
      <StatCard icon="heart" label="Successful hand-offs" value={completed} note="A neighbour's day, made" tint="stat-lilac" />
      <StatCard icon="sparkle" label="Your community" value={userShort(deliveries)} note="Good things move together" tint="stat-warm" />
    </div>
    <section className="panel dashboard-section" id="my-deliveries">
      <SectionHeading eyebrow="YOU'RE MAKING A DIFFERENCE" title="Your delivery route" action={<span className="result-count">{deliveries.length} total</span>} />
      {busy ? <LoadingCards /> : deliveries.length ? <div className="delivery-list">{deliveries.map((item) => {
        const request = item.request || {};
        const donation = request.donation || {};
        const ngo = request.ngo || {};
        const next = { ASSIGNED: ["accept", "Accept this delivery"], ACCEPTED: ["pickup", "Mark as picked up"], PICKED_UP: ["deliver", "Mark as delivered"] }[item.status];
        const message = { accept: "Delivery accepted. Thank you for volunteering.", pickup: "Pickup confirmed. Thanks for keeping it moving.", deliver: "Beautifully done. Delivery marked complete." };
        return <article className="delivery-card" key={item.id}>
          <div className="delivery-top"><span className="food-thumbnail"><Icon name="van" size={20} /></span><div className="donation-details"><strong>{donation.foodName || "Community delivery"}</strong><span>{request.quantity || donation.quantity || 0} meals · Delivery #{item.id}</span></div><Status value={item.status} /></div>
          <div className="delivery-route"><div className="route-stop"><span className="route-dot route-pickup" /><div><small>PICK UP FROM</small><strong>{donation.location || "Pickup location"}</strong><span>{donation.donor?.fullName || "Food donor"}</span></div></div><span className="route-line" /><div className="route-stop"><span className="route-dot route-dropoff" /><div><small>DELIVER TO</small><strong>{ngo.location || "Community location"}</strong><span>{ngo.fullName || "Community organisation"}</span></div></div></div>
          {next && <button className="button button-dark delivery-action" disabled={submitting} onClick={() => action(() => api(`/api/deliveries/${item.id}/${next[0]}`, { method: "PUT" }), message[next[0]])}>{next[1]} <Icon name="arrowRight" size={16} /></button>}
        </article>;
      })}</div> : <EmptyState icon="van" title="Your route is clear for now." description="When an organisation approves a food request, your delivery will appear here." /> }
    </section>
  </>;
}

function userShort(deliveries) {
  const count = new Set(deliveries.map((item) => item.request?.ngo?.id).filter(Boolean)).size;
  return count ? `${count} ${count === 1 ? "partner" : "partners"}` : "Growing";
}

function AdminDashboard({ summary, busy }) {
  return <>
    <div className="stat-grid admin-stats">
      <StatCard icon="users" label="Community members" value={summary?.totalUsers ?? "—"} note="People making a difference" />
      <StatCard icon="food" label="Donations listed" value={summary?.totalDonations ?? "—"} note="Every meal matters" tint="stat-warm" />
      <StatCard icon="clock" label="Food requests" value={summary?.totalRequests ?? "—"} note="Good things in motion" tint="stat-lilac" />
      <StatCard icon="van" label="Deliveries started" value={summary?.totalDeliveries ?? "—"} note="Neighbours helping neighbours" />
    </div>
    <section className="panel dashboard-section" id="community-members">
      <SectionHeading eyebrow="THE PEOPLE BEHIND THE GOOD" title="Community members" action={<span className="result-count">{summary?.users?.length ?? 0} people</span>} />
      {busy ? <LoadingCards /> : <DataTable columns={["name", "email", "role", "location"]} rows={summary?.users || []} empty="Your community members will appear here." />}
    </section>
    {summary && [["Donations", summary.donations, ["foodName", "quantity", "location", "status"]], ["Requests", summary.requests, ["donation", "quantity", "status"]], ["Deliveries", summary.deliveries, ["request", "status"]]].map(([title, rows, columns]) =>
      <section className="panel dashboard-section" key={title}><SectionHeading eyebrow="COMMUNITY ACTIVITY" title={title} action={<span className="result-count">{rows?.length || 0} records</span>} />{busy ? <LoadingCards /> : <DataTable columns={columns} rows={rows || []} empty={`No ${title.toLowerCase()} to show yet.`} />}</section>
    )}
  </>;
}

function DataTable({ columns, rows, empty }) {
  function cellValue(row, key) {
    const value = row[key];
    if (key === "donation") return value?.foodName || "Food donation";
    if (key === "request") return value?.donation?.foodName || "Food request";
    if (key === "role") return value ? value.charAt(0) + value.slice(1).toLowerCase() : "—";
    if (value && typeof value === "object") return value.foodName || value.fullName || "—";
    return value ?? "—";
  }
  if (rows.length === 0) return <EmptyState title={empty} description="As the community grows, its activity will appear here." />;
  return <div className="table-wrap"><table className="data-table"><thead><tr>{columns.map((key) => <th key={key}>{key.replace(/([A-Z])/g, " $1")}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row.id || row.email || index}>{columns.map((key) => <td key={key}>{key === "status" ? <Status value={row[key]} /> : cellValue(row, key)}</td>)}</tr>)}</tbody></table></div>;
}

function FoodSafetyPage() {
  const guidelines = [
    ["Share food at its best.", "Only offer food that is fresh, within its use-by date, and has been stored safely. If you're not sure, don't share it."],
    ["Keep it clean and covered.", "Wash your hands, use clean utensils, and pack food in clean, food-safe, sealed containers."],
    ["Mind the temperature.", "Keep chilled food refrigerated and hot food hot until pickup. Don't leave perishable food at room temperature."],
    ["Tell us what's inside.", "Label ingredients and known allergens when possible. Keep raw ingredients separate from ready-to-eat food."],
    ["Leave out anything questionable.", "Don't donate spoiled food, opened or damaged packages, food with unknown storage history, or food past its use-by date."],
  ];
  return <><PublicHeader /><main className="safety-page"><div className="safety-intro"><span className="eyebrow"><Icon name="shield" size={15} /> OUR PROMISE TO EACH OTHER</span><h1>Good food starts<br />with <span className="serif-italic">good care.</span></h1><p>Sharing food is an act of trust. These simple guidelines help make every hand-off a safe one.</p></div><div className="safety-list">{guidelines.map(([title, description], index) => <article className="safety-row" key={title}><span className="safety-number">0{index + 1}</span><div><h2>{title}</h2><p>{description}</p></div><Icon name={index === 0 ? "food" : index === 1 ? "check" : index === 2 ? "clock" : index === 3 ? "heart" : "shield"} size={21} /></article>)}</div><div className="safety-bottom"><Icon name="heart" size={18} /><p>Food safety is a shared responsibility. When in doubt, it's always okay to say no.</p><Link className="button button-dark" to="/register">Join FoodShare <Icon name="arrowRight" size={16} /></Link></div></main><PublicFooter /></>;
}

function App() {
  const [session, setSession] = useState(() => getSavedSession());
  function onAuthenticated(user) {
    setSession({ user, token: localStorage.getItem("foodshareToken") });
  }
  function onLogout() {
    clearSession();
    setSession(null);
  }
  const user = session?.user;
  return <Routes>
    <Route path="/" element={user ? <Navigate to={rolePaths[user.role] || "/"} replace /> : <LandingPage />} />
    <Route path="/login" element={<AuthRoute user={user} onAuthenticated={onAuthenticated} mode="login" />} />
    <Route path="/register" element={<AuthRoute user={user} onAuthenticated={onAuthenticated} mode="register" />} />
    <Route path="/food-safety" element={<FoodSafetyPage />} />
    <Route path="/donor" element={<ProtectedRoute user={user} role="DONOR"><Dashboard user={user} onLogout={onLogout} /></ProtectedRoute>} />
    <Route path="/ngo" element={<ProtectedRoute user={user} role="NGO"><Dashboard user={user} onLogout={onLogout} /></ProtectedRoute>} />
    <Route path="/volunteer" element={<ProtectedRoute user={user} role="VOLUNTEER"><Dashboard user={user} onLogout={onLogout} /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute user={user} role="ADMIN"><Dashboard user={user} onLogout={onLogout} /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}

export default App;
