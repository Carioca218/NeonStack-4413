import { useState } from "react";
import type { ServiceId } from "../data/content";
import { Nav } from "../components/nav";
import { Hero, Marquee } from "../components/hero";
import { Work } from "../components/work";
import { Services } from "../components/services";
import { Process } from "../components/process";
import { Estimator } from "../components/estimator";
import { About } from "../components/about";
import { Testimonials, BlogPreview, Faq } from "../components/proof";
import { Contact, Footer, WhatsAppFab, type Prefill } from "../components/contact";

function Index() {
  const [serviceId, setServiceId] = useState<ServiceId>("landing");
  const [prefill, setPrefill] = useState<Prefill>(null);

  return (
    <div className="grain relative">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Services
          onPick={(id) => {
            setServiceId(id);
            document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <Process />
        <Estimator
          serviceId={serviceId}
          setServiceId={setServiceId}
          onSendBrief={(s) => {
            setPrefill({ text: s.text, type: s.type, nonce: Date.now() });
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <About />
        <Testimonials />
        <BlogPreview />
        <Faq />
        <Contact prefill={prefill} />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

export default Index;
