import { Card, CardContent } from "@/components/ui/card";
import { cardBlog } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30;

async function getData() {
  const query = `
   *[_type=="blog"] | order(_createdAt desc){
  title,
    smallDescription,
    "currentSlug":slug.current,
    titleImage
 }
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: cardBlog[] = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((item, index) => (
        <Card key={index}>
          <Image
            src={urlFor(item.titleImage).url()}
            alt="Post Image"
            width={500}
            height={500}
            className="h-[200px] object-cover object-center rounded-t-lg"
          />
          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{item.title}</h3>
            <p className="line-clamp-2 text-sm mt-2 text-gray-600 dark:text-gray-300 ">
              {item.smallDescription}
            </p>
            <Button asChild className="w-full mt-7 dark:text-gray-100">
              <Link href={`/blog/${item.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
