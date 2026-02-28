import { getGalleryAlbums } from "@/lib/contentful";
import { getContent } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { FiFacebook, FiExternalLink } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of events and worship at CCC Calgary Model Parish.",
};

const facebookPageUrl =
  "https://www.facebook.com/profile.php?id=100081787865942";

interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  album: string;
}

export default async function GalleryPage() {
  const [contentfulAlbums, dbGallery] = await Promise.all([
    getGalleryAlbums(),
    getContent("gallery", { photos: [] } as { photos: GalleryPhoto[] }),
  ]);

  // Group DB photos by album
  const dbAlbums = new Map<string, GalleryPhoto[]>();
  for (const photo of dbGallery.photos) {
    const album = photo.album || "General";
    if (!dbAlbums.has(album)) dbAlbums.set(album, []);
    dbAlbums.get(album)!.push(photo);
  }

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">Gallery</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Moments of faith, fellowship, and joy at Calgary Model Parish
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* DB Gallery Photos */}
          {Array.from(dbAlbums.entries()).map(([albumName, photos]) => (
            <div key={albumName} className="mb-12">
              <h2 className="mb-2 font-serif text-2xl font-bold text-primary">
                {albumName}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || albumName}
                      className="h-full w-full object-cover transition hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Contentful albums (if connected) */}
          {contentfulAlbums.length > 0 &&
            contentfulAlbums.map((album) => (
              <div key={album.id} className="mb-12">
                <h2 className="mb-2 font-serif text-2xl font-bold text-primary">
                  {album.title}
                </h2>
                <p className="mb-6 text-sm text-muted">
                  {formatDate(album.date)}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {album.photos.map((photo, i) => (
                    <div
                      key={i}
                      className="aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={photo}
                        alt={`${album.title} photo ${i + 1}`}
                        className="h-full w-full object-cover transition hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* Facebook Photos Embed */}
          <div className="mb-10 text-center">
            <h2 className="font-serif text-2xl font-bold text-primary">
              Photos from Our Facebook
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gold" />
            <p className="mt-3 text-sm text-muted">
              Browse our latest photos from services, events, and parish life
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-xl border border-border shadow-sm">
              <iframe
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebookPageUrl)}&tabs=timeline&width=600&height=800&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                className="w-full"
                style={{ border: "none", overflow: "hidden", height: "800px" }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="CCC Calgary Model Parish Facebook"
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href={`${facebookPageUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light hover:scale-[1.02] active:scale-[0.98]"
            >
              <FiFacebook size={18} />
              View All Photos on Facebook
              <FiExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
