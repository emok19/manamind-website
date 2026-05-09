import { notFound } from "next/navigation";
import { getRoleBySlug, roles } from "@/data/roles";
import { RoleDetail } from "@/components/careers/RoleDetail";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return { title: "Role | ManaMind" };
  return {
    title: `${role.title} | ManaMind`,
    description: role.summary,
  };
}

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();
  return <RoleDetail role={role} />;
}
