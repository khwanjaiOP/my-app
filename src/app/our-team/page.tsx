import qs from "qs";
import Image from "next/image";
import Link from "next/link";
import { fetchApi } from "../utils/fetch";

async function getTeamMembers() {
  const res = await fetchApi("/api/team-members", {},{
    photo: {
      fields: ['alternativeText', 'name', 'url']
    },
  });
  if (res){
    if (res.status === 200){
      return res.data;
    }
    return res.data;
  }

  /*const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/team-members";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
    },
  });

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch team members");

  const data = await res.json();
  console.log(data);

  return data;*/
}

interface TeamMemberProps {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  photo: {
    id: number;
    documentId: string;
    alternativeText: string;
    name: string;
    url: string;
  };
}

function TeamMemberCard({
  name,
  description,
  photo,
  slug,
}: Readonly<TeamMemberProps>) {
  const imageUrl = `${
    process.env.API_URL ?? "http://localhost:1337"
  }${photo.url}`;
  return (
    <Link
  href={`/our-team/${slug}`}
  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center"
>
  <div className="relative w-full h-64 rounded-t-xl">
    <Image
      src={imageUrl}
      alt={photo.alternativeText || name}
      layout="fill"
      objectFit="contain"
      className="rounded-t-lg" 
    />
  </div>
  <div className="p-6 flex flex-col justify-center items-center"> {/* Flexbox for centering content */}
    <h3 className="text-xl font-semibold mb-2 text-center">{name}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
</Link>
  );
}

export default async function OurTeam() {
  const teamMembers : any = await getTeamMembers() ;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Movie</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.data.map((member: TeamMemberProps) => (
          <TeamMemberCard key={member.documentId} {...member} />
        ))}
      </div>
    </div>
  );
}