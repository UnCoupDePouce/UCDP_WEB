import { useAuth } from "../../context/AuthContext";

export default function WelcomeCard() {
  const { user } = useAuth();
  const fullName = user ? `${user.prenom} ${user.nom}` : "Admin";

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100 h-full flex flex-col justify-center relative overflow-hidden min-h-[344px]">
      <div className="z-10">
        <p className="text-gray-500 text-sm font-medium mb-1">Welcome back,</p>
        <h2 className="text-3xl font-bold text-black mb-6">{fullName}</h2>
        <div className="text-gray-500 text-base leading-relaxed">
          <p>Heureux de te revoir,</p>
          <p>Comment puis-je t’aider ?</p>
        </div>
      </div>
      
      {/* Decorative elements to mimic the Figma image/circles if possible */}
      <div className="absolute right-[-50px] top-[-50px] w-[300px] h-[300px] bg-[#f7b70c] opacity-10 rounded-full blur-3xl"></div>
    </div>
  );
}
