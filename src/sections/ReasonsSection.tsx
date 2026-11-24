import { business } from "../config/business";

const sectionHeading =
  "[font-family:'Gabarito',Helvetica] text-3xl font-bold leading-tight tracking-[-0.02em] text-[#142033] sm:text-4xl";
const bodyClass =
  "max-w-[65ch] [font-family:'Geist',Helvetica] text-base leading-7 text-[#3d4a5c]";

export function ReasonsSection(): JSX.Element {
  return (
    <section className="bg-[#f4f6f8] px-4 py-16 sm:px-8 lg:px-16">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-12">
        <div>
          <h2 className={sectionHeading}>A local {business.niche.toLowerCase()} shop</h2>
          <p className={`mt-4 ${bodyClass}`}>
            Kramer & Son is a Sterling shop. The tech who takes the visit does the
            work and cleans up before leaving.
          </p>
        </div>
        <img
          src="/photos/crew-van.jpg"
          alt="Two Kramer techs beside the shop van."
          className="mt-8 h-72 w-full object-cover lg:mt-0 lg:h-full lg:min-h-[22rem]"
        />
      </div>
      <h2 className={`mt-10 mb-10 ${sectionHeading}`}>Why homeowners call us</h2>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
        {business.reasons.map((reason) => (
          <li key={reason.title}>
            <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-bold leading-snug text-[#142033]">
              {reason.title}
            </h3>
            <p className="mt-2 [font-family:'Geist',Helvetica] text-base leading-7 text-[#3d4a5c]">
              {reason.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
