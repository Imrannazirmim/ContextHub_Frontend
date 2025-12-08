const HeroBackground = () => (
    <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-800/40 transform rotate-45 blur-3xl"></div>
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-teal-700/30 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-700/35 transform -rotate-12 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/30 rounded-full blur-3xl"></div>
        </div>
    </div>
);
export default HeroBackground;
