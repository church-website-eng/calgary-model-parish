import { getContent } from "@/lib/content";
import { defaultChurchInfo } from "@/data/defaults";
import VisitForm from "./VisitForm";

export default async function VisitPage() {
  const info = await getContent("church_info", defaultChurchInfo);
  const fullAddress = `${info.street}, ${info.city}, ${info.province}`;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(info.street + ", " + info.city + ", " + info.province)}&output=embed`;

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Plan Your Visit
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          We&apos;d love to welcome you to Calgary Model Parish
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
                What to Expect
              </h2>
              <div className="space-y-4 text-sm text-foreground/70 leading-relaxed">
                <div className="rounded-lg bg-muted-light p-4">
                  <h3 className="mb-1 font-semibold text-primary">Dress Code</h3>
                  <p>Members worship in white sutana (robes). First-time visitors are welcome to come in modest, clean attire. White clothing is encouraged but not required for visitors.</p>
                </div>
                <div className="rounded-lg bg-muted-light p-4">
                  <h3 className="mb-1 font-semibold text-primary">Barefoot Worship</h3>
                  <p>We remove our shoes before entering the sanctuary, as it is holy ground. Shoe racks are provided at the entrance.</p>
                </div>
                <div className="rounded-lg bg-muted-light p-4">
                  <h3 className="mb-1 font-semibold text-primary">Service Length</h3>
                  <p>Sunday service runs from 10:00 AM to approximately 1:00 PM. Services include prayers, hymns, Bible reading, sermon, and prophetic session.</p>
                </div>
                <div className="rounded-lg bg-muted-light p-4">
                  <h3 className="mb-1 font-semibold text-primary">Location</h3>
                  <p>{fullAddress}. Free parking available.</p>
                  <p className="mt-1">
                    Phone:{" "}
                    <a href={`tel:${info.phone}`} className="text-accent hover:underline">
                      {info.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="mt-6 overflow-hidden rounded-lg border border-border">
                <iframe
                  title="Church Location"
                  src={mapSrc}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Registration form (client component) */}
            <VisitForm />
          </div>
        </div>
      </section>
    </>
  );
}
