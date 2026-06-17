import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata = {
  title: "Blog | ManaMind",
  description: "News, insights, and updates from the ManaMind team.",
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <ComingSoon
      title="Blog"
      description="News, insights, and updates from the ManaMind team."
    />
  );
}
