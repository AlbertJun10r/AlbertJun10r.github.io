export default function MarqueeBanner() {
  const text =
    '/// OPEN FOR WORK /// FULL STACK DEVELOPMENT /// UI/UX DESIGN /// WEB3 READY /// ACCESSIBLE /// FAST /// SECURE /// OPEN FOR WORK /// FULL STACK DEVELOPMENT ///';

  return (
    <div className="border-b-4 border-black bg-neo-blue py-3 relative z-20">
      <div className="marquee-container font-mono font-bold text-2xl text-white">
        <div className="marquee-content">{text} &nbsp;&nbsp; {text}</div>
      </div>
    </div>
  );
}
