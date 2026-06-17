export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function PositionFinderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
