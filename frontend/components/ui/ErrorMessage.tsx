export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="my-1 bg-red-600 rounded-md text-white px-2 py-1">
    {children}
  </p>;
}
