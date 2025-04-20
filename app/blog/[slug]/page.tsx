import { FullBlog } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";


async function getData (slug: string) {
    const query = `*[_type == 'blog' && slug.current == '${slug}'] 
  {
    "currentSlug": slug.current,
      title,
      content,
      titleImage
  }[0]`;
    
    const data = await client.fetch(query);
    return data;
   
}






export default async function BlogArticle({params}: {params: {slug: string}}) {
    const data:FullBlog = await getData(params.slug); // Await the data here
  return (
    <div>
        <div className="mt-6">
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
                 Notice: Dotfiles are now available for download!
                </span>
                <span className="mt-2 block text-3xl text-center leading-10 font-bold tracking-wide sm:text-4xl">
                 {data.title}
                </span>
            </h1>
            <Image src={urlFor(data.titleImage).url()} alt="blog" width={1000} height={500} className="w-full h-96 object-cover mt-6 rounded-lg" priority />
            <div className=" mt-6 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
              <PortableText value={data.content}/>
              </div> 
        </div>
    </div>
  )
}