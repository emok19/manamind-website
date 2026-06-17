export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function TestAnnotationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
