import Image from "next/image";
import { BOOKING_URL } from "@/lib/site";

// Pour afficher un vrai portrait : déposer la photo dans /public
// (ex. /team-wael.jpg) puis renseigner `image` ci-dessous.
const teamMembers: {
  name: string;
  specialty: string;
  image?: string;
}[] = [
  { name: "Wael", specialty: "Coupes & dégradés précis" },
  { name: "Souhaib", specialty: "Rasage traditionnel & styling" },
  { name: "Hamza", specialty: "Coupes modernes & finitions" },
  { name: "Simo", specialty: "Conseil & transformations" },
];

const Team = () => {
  return (
    <section
      id="equipe"
      className="scroll-mt-20 bg-night py-20 sm:py-28"
      aria-labelledby="equipe-heading"
    >
      <div className="shell-wide">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 text-canard-light">L’équipe</p>
            <h2
              id="equipe-heading"
              className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl"
            >
              Quatre barbiers,
              <br />
              quatre styles.
            </h2>
            <p className="mt-5 max-w-lg text-smoke">
              Chacun a sa spécialité. Tous ont la même exigence sur le geste et la
              finition.
            </p>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Choisir son barbier sur Planity
            <span aria-hidden>→</span>
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <li key={member.name} className="reveal">
              {/* Médaillon en arche, comme les cadres anciens */}
              <div className="medallion aspect-[3/4]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`${member.name}, barbier chez The Experts Barber Shop`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-canard-deep to-coal"
                    aria-hidden
                  >
                    <span className="font-display text-7xl font-bold text-ivory/20 select-none sm:text-8xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-display mt-5 text-2xl font-medium tracking-wide uppercase">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-smoke">{member.specialty}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Team;
