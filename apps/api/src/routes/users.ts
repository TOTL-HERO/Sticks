import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";
import { supabaseAdmin } from "../lib/supabase.ts";

type Env = { Variables: { userId: string } };
type OrgRoleRow = { role: string; organizationId: string; organization: { id: string; name: string; logoUrl: string | null } };

const users = new Hono<Env>();

// GET /users/me/org-roles — list all org memberships for the current user
// (must be registered before /me to avoid route shadowing)
users.get("/me/org-roles", async (c) => {
  const authId = c.get("userId") as string;

  const user = await prisma.user.findUnique({ where: { authId } });
  if (!user) {
    return c.json({ roles: [] });
  }

  const memberships: OrgRoleRow[] = await prisma.orgMembership.findMany({
    where: { userId: user.id },
    select: {
      role: true,
      organizationId: true,
      organization: { select: { id: true, name: true, logoUrl: true } },
    },
  }) as unknown as OrgRoleRow[];

  const roles = memberships.map((m) => m.role);

  return c.json({ roles, memberships });
});

// GET /users/me — fetch or create user by auth UID
users.get("/me", async (c) => {
  const authId = c.get("userId") as string;

  const user = await prisma.user.upsert({
    where: { authId },
    update: {},
    create: {
      authId,
      firstName: "",
      lastName: "",
    },
  });

  return c.json(user);
});

// PUT /users/me — update profile fields
users.put("/me", async (c) => {
  const authId = c.get("userId") as string;
  const body = await c.req.json();

  const allowedFields = [
    "firstName",
    "lastName",
    "avatarUrl",
    "ghinIndex",
    "homeCourseId",
    "homeCourseName",
    "playStyle",
    "onboardingStep",
  ] as const;

  const data: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      data[field] = body[field];
    }
  }

  const user = await prisma.user.update({
    where: { authId },
    data,
  });

  return c.json(user);
});

// POST /users/me/avatar — upload avatar to Supabase Storage
users.post("/me/avatar", async (c) => {
  const authId = c.get("userId") as string;

  const formData = await c.req.formData();
  const file = formData.get("avatar");

  if (!file || !(file instanceof File)) {
    return c.json({ error: "No avatar file provided", statusCode: 400 }, 400);
  }

  const ext = file.name.split(".").pop() || "jpg";
  const filePath = `${authId}/avatar.${ext}`;
  const buffer = await file.arrayBuffer();

  const { error: uploadError } = await supabaseAdmin.storage
    .from("avatars")
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return c.json(
      { error: `Avatar upload failed: ${uploadError.message}`, statusCode: 500 },
      500,
    );
  }

  const { data: urlData } = supabaseAdmin.storage
    .from("avatars")
    .getPublicUrl(filePath);

  const user = await prisma.user.update({
    where: { authId },
    data: { avatarUrl: urlData.publicUrl },
  });

  return c.json(user);
});

export default users;
