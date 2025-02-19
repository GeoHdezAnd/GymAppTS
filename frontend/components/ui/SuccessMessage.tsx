export default function SuccessMessage({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <p className="my-1 bg-green-600 rounded-md text-white px-2 py-1">
      {children}
    </p>;
  }
  