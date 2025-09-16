import useAuth from "../hooks/useAuth";
import LogoutButton from "./LogoutButton";
import SkeletonNavbar from "./SkeletonNavbar";

function Navbar() {
  const { user, loading } = useAuth(); // asumsi kamu punya state loading di AuthProvider

  if (loading) return <SkeletonNavbar />;

  return (
    <div className="w-full h-20 text-white font-bold bg-[#56ACBD] flex items-center justify-between px-10">
      <div>
        <h1>Halo {user.username}</h1>
      </div>
      <div className="uppercase text-2xl">{user.role} DASHBOARD</div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}

export default Navbar;
