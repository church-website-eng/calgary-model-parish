import Card from "@/components/ui/Card";
import { FiMapPin, FiPhone, FiMail, FiClock, FiInfo } from "react-icons/fi";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { defaultChurchInfo, defaultServiceTimes, defaultContactPage } from "@/data/defaults";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default async function ContactPage() {
  const [info, services, contactContent] = await Promise.all([
    getContent("church_info", defaultChurchInfo),
    getContent("service_times", defaultServiceTimes),
    getContent("contact_page", defaultContactPage),
  ]);

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          {contactContent.subtitle || defaultContactPage.subtitle}
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <ContactForm
              formHeading={contactContent.formHeading}
              successMessage={contactContent.successMessage}
            />

            {/* Info cards */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-start gap-4">
                  <FiMapPin className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Address</h3>
                    <p className="text-sm text-muted">
                      {info.churchName}<br />
                      {info.cathedralName}<br />
                      {info.street}<br />
                      {info.city}, {info.province}
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <FiPhone className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Phone</h3>
                    <p className="text-sm text-muted">{info.phone}</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <FiMail className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <p className="text-sm text-muted">{info.email}</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <FiClock className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Service Times</h3>
                    <div className="text-sm text-muted">
                      {services.services.map((s) => (
                        <p key={s.day}>{s.day}: {s.times[0]}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {contactContent.officeHours && (
                <Card>
                  <div className="flex items-start gap-4">
                    <FiClock className="mt-1 text-accent" size={20} />
                    <div>
                      <h3 className="font-semibold text-primary">Office Hours</h3>
                      <p className="text-sm text-muted">{contactContent.officeHours}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Map */}
              <div className="h-64 overflow-hidden rounded-xl">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(info.street + ", " + info.city + ", " + info.province)}&output=embed`}
                  className="h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${info.cathedralName} Location`}
                />
              </div>

              {contactContent.additionalInfo && (
                <div className="flex items-start gap-3 rounded-lg bg-muted-light p-4">
                  <FiInfo className="mt-0.5 flex-shrink-0 text-accent" size={16} />
                  <p className="text-sm text-foreground/70">
                    {contactContent.additionalInfo}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
