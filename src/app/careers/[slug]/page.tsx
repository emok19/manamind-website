import { notFound } from "next/navigation";
import { getRoles, getRole } from "@/lib/content/roles";
import { RoleDetail } from "@/components/careers/RoleDetail";

export function generateStaticParams() {
  return getRoles().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRole(slug);
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
  const role = getRole(slug);
  if (!role) notFound();
  return <RoleDetail role={role} />;
}
