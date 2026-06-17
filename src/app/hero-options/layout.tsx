export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function HeroOptionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
