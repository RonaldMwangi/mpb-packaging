import TalentPool from "./Pages/TalentPool";
import { lazy, Suspense } from "react";
import { TALENT_POOL_PATH } from "./utils/navigation";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero/Hero";
import Products from "./components/sections/Products/Products";
import Manufacturing from "./components/sections/Manufacturing/Manufacturing";
import Industries from "./components/sections/Industries/Industries";
import Process from "./components/sections/Process/Process";
import WhyMPB from "./components/sections/WhyMPB/WhyMPB";
import Quality from "./components/sections/Quality/Quality";
import Careers from "./components/sections/Careers/Careers";
import Location from "./components/sections/Location/Location";
import Contact from "./components/sections/Contact/Contact";
import Footer from "./components/sections/Footer/Footer";

const CustomerSurvey = lazy(() => import("./Pages/CustomerSurvey"));

function App() {
  if (window.location.pathname.replace(/\/$/, "") === "/customer-satisfaction-survey") {
    return <MotionConfig reducedMotion="user"><Suspense fallback={<p className="container" role="status">Loading survey…</p>}><CustomerSurvey /></Suspense></MotionConfig>;
  }
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      {window.location.pathname.replace(/\/$/, "") === TALENT_POOL_PATH ? <TalentPool /> : <>
      <Hero />
      <Products />
      <Industries />
      <Manufacturing />
      <Process />
      <Quality />
      <WhyMPB />
      <Careers />
      <Contact />
      <Location />
      </>}
      <Footer />
    </MotionConfig>
  );
}

export default App;
