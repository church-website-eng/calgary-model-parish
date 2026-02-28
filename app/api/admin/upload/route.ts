import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { put, list, del } from "@vercel/blob";

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json({ error: "No filename provided" }, { status: 400 });
    }

    if (!req.body) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = filename.split(".").pop()?.toLowerCase() || "";
    const timestamp = Date.now();
    const safeName = filename
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 50);
    const path = `uploads/${timestamp}-${safeName}.${ext}`;

    const blob = await put(path, req.body, { access: "public" });

    const videoExts = ["mp4", "webm", "mov"];
    const isVideo = videoExts.includes(ext);

    return NextResponse.json({
      url: blob.url,
      filename: blob.pathname,
      type: isVideo ? "video" : "image",
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: "uploads/" });

    const media = blobs.map((blob) => {
      const ext = blob.pathname.split(".").pop()?.toLowerCase() || "";
      const isVideo = ["mp4", "webm", "mov"].includes(ext);
      return {
        filename: blob.pathname.split("/").pop() || blob.pathname,
        url: blob.url,
        type: isVideo ? "video" : "image",
        size: blob.size,
        uploadedAt: blob.uploadedAt.toISOString(),
      };
    });

    media.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));

    return NextResponse.json({ files: media });
  } catch {
    return NextResponse.json({ files: [] });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    await del(url);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
