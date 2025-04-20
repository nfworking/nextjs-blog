import { FullBlog } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string) {
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

export default async function BlogArticle(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    if (!params || !params.slug) {
        throw new Error("Slug is required");
    }

    const data: FullBlog = await getData(params.slug); // Fetch data using slug

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
                <Image
                    src={urlFor(data.titleImage).url()}
                    alt="blog"
                    width={1000}
                    height={500}
                    className="w-full h-96 object-cover mt-6 rounded-lg"
                    priority
                />
                <div className="mt-6 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
                    <PortableText value={data.content} />
                </div>
            </div>
        </div>
    );
}

// Add this function to handle dynamic params
export async function generateStaticParams() {
    const query = `*[_type == 'blog'] { "slug": slug.current }`;
    const slugs = await client.fetch(query);

    return slugs.map((slug: { slug: string }) => ({
        slug: slug.slug,
    }));
}