function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-lg">Page not found😛😛</p>
      <a
        href="/"
        className="mt-6 text-blue-500 hover:underline">
        Go back to Login
      </a>
    </div>
  );
}

export default NotFound;
