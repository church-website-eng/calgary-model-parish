import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getContent } from "@/lib/content";
import { defaultDirectory } from "@/data/defaults";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiPhone, FiMail } from "react-icons/fi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Directory",
};

export default async function DirectoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/portal/login");
  }

  const directory = await getContent("directory", defaultDirectory);
  const members = directory.items || [];

  // Group by ministry
  const grouped = new Map<string, typeof members>();
  for (const m of members) {
    const group = m.ministry || "Other";
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group)!.push(m);
  }

  return (
    <>
      <section className="bg-primary py-16 text-center text-white">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Member Directory
        </h1>
        <p className="mt-2 text-white/70">
          Connect with fellow parishioners
        </p>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {members.length > 0 ? (
            Array.from(grouped.entries()).map(([ministry, group]) => (
              <div key={ministry} className="mb-10">
                <h2 className="mb-4 font-serif text-xl font-bold text-primary">
                  {ministry}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((member) => (
                    <Card key={member.id} className="flex items-start gap-4">
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="h-14 w-14 flex-shrink-0 rounded-full object-cover object-top"
                        />
                      ) : (
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                          {member.name ? member.name.charAt(0) : "?"}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-semibold text-primary truncate">
                          {member.name}
                        </h3>
                        {member.title && (
                          <p className="text-xs font-medium text-accent">
                            {member.title}
                          </p>
                        )}
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className="mt-1 flex items-center gap-1.5 text-xs text-muted hover:text-accent"
                          >
                            <FiPhone size={11} />
                            {member.phone}
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-1.5 text-xs text-muted hover:text-accent truncate"
                          >
                            <FiMail size={11} />
                            {member.email}
                          </a>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted">
                The member directory is being set up. Check back soon.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Button href="/portal" variant="secondary">
              &larr; Back to Dashboard
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
