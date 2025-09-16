function SkeletonNavbar() {
  return (
    <div className="w-full h-20 bg-[#56ACBD] flex items-center justify-between px-10 text-white">
      {/* Left: Halo username */}
      <div className="h-6 w-32 bg-white/50 rounded animate-pulse"></div>

      {/* Center: Role Dashboard */}
      <div className="h-8 w-48 bg-white/50 rounded animate-pulse"></div>

      {/* Right: Logout Button */}
      <div className="h-8 w-20 bg-white/50 rounded animate-pulse"></div>
    </div>
  );
}

export default SkeletonNavbar;
