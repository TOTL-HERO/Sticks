import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";
import { orgRoleMiddleware } from "../middleware/orgRole.ts";
import { supabaseAdmin } from "../lib/supabase.ts";

type Env = { Variables: { userId: string; orgRole?: string; internalUserId?: string } };

const organizations = new Hono<Env>();

// GET /organizations/:id/my-role — get current user's role in an org
organizations.get("/:id/my-role", async (c) => {
  const orgId = c.req.param("id");
  const authId = c.get("userId") as string;

  const user = await prisma.user.findUnique({ where: { authId } });
  if (!user) {
    return c.json({ role: null, organizationId: orgId });
  }

  const membership = await prisma.orgMembership.findUnique({
    where: { organizationId_userId: { organizationId: orgId!, userId: user.id } },
  });

  return c.json({
    role: membership?.role ?? null,
    organizationId: orgId,
  });
});

// POST /organizations/:id/members — invite user with role
organizations.post("/:id/members", orgRoleMiddleware(["COMMISSIONER"]), async (c) => {
  const orgId = c.req.param("id");
  const body = await c.req.json();

  try {
    const membership = await prisma.orgMembership.create({
      data: {
        organizationId: orgId!,
        userId: body.userId,
        role: body.role ?? "PLAYER",
      },
    });
    return c.json(membership, 201);
  } catch (err: any) {
    if (err?.code === "P2002") {
      return c.json({ error: "User is already a member of this organization", statusCode: 409 }, 409);
    }
    throw err;
  }
});

// PUT /organizations/:id/members/:memberId — update role
organizations.put("/:id/members/:memberId", orgRoleMiddleware(["COMMISSIONER"]), async (c) => {
  const memberId = c.req.param("memberId");
  const body = await c.req.json();

  const updated = await prisma.orgMembership.update({
    where: { id: memberId },
    data: { role: body.role },
  });
  return c.json(updated);
});

// GET /organizations/:id/roster — list members
organizations.get("/:id/roster", orgRoleMiddleware(["COMMISSIONER", "ADMIN", "COACH"]), async (c) => {
  const orgId = c.req.param("id");
  const members = await prisma.orgMembership.findMany({
    where: { organizationId: orgId },
    include: {
      user: { select: { id: true, firstName: true, lastName: true, avatarUrl: true, ghinIndex: true } },
    },
    orderBy: { createdAt: "asc" },
  });
  return c.json({ members });
});

// POST /organizations/:id/logo — upload logo to Supabase Storage
organizations.post("/:id/logo", orgRoleMiddleware(["COMMISSIONER"]), async (c) => {
  const orgId = c.req.param("id");

  const formData = await c.req.formData();
  const file = formData.get("logo") as File | null;
  if (!file) return c.json({ error: "No file uploaded", statusCode: 400 }, 400);

  // Validate format
  const validTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (!validTypes.includes(file.type)) {
    return c.json({ error: "Logo must be PNG or JPEG format", statusCode: 400 }, 400);
  }

  // Validate size (< 2MB)
  if (file.size > 2 * 1024 * 1024) {
    return c.json({ error: "Logo must be under 2 MB", statusCode: 400 }, 400);
  }

  const ext = file.type === "image/png" ? "png" : "jpg";
  const filePath = `org-logos/${orgId}.${ext}`;
  const buffer = await file.arrayBuffer();

  const { error: uploadError } = await supabaseAdmin.storage
    .from("org-logos")
    .upload(filePath, buffer, { contentType: file.type, upsert: true });

  if (uploadError) {
    return c.json({ error: `Upload failed: ${uploadError.message}`, statusCode: 500 }, 500);
  }

  const { data: urlData } = supabaseAdmin.storage.from("org-logos").getPublicUrl(filePath);
  const logoUrl = urlData.publicUrl;

  await prisma.organization.update({ where: { id: orgId }, data: { logoUrl } });

  return c.json({ logoUrl });
});

// PUT /organizations/:id/branding — update color scheme
organizations.put("/:id/branding", orgRoleMiddleware(["COMMISSIONER"]), async (c) => {
  const orgId = c.req.param("id");
  const body = await c.req.json();

  const colorScheme = {
    primary: body.primary ?? "#84d7af",
    secondary: body.secondary ?? "#006747",
    accent: body.accent ?? "#e9c349",
  };

  await prisma.organization.update({ where: { id: orgId }, data: { colorScheme } });
  return c.json({ colorScheme });
});

export default organizations;
