export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative">
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-pink-400 rounded-full opacity-70"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-pink-500 rounded-full opacity-70"></div>
        <div className="relative w-80 h-48 rounded-2xl backdrop-blur-xl bg-gradient-to-tr from-gray-900/60 to-gray-800/30 border border-white/10 shadow-lg flex flex-col justify-between p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="w-10 h-8 bg-white/20 rounded-sm"></div>
            <span className="font-semibold text-lg">VISA</span>
          </div>
          <div className="text-center tracking-widest text-lg">
            4012 0091 9824 1881
          </div>
          <div className="flex justify-between items-end text-sm">
            <span>12/24</span>
            <span>123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
