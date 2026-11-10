import { Link, useParams } from "react-router-dom";
import { PageHead } from "../components/PageHead";
import { business } from "../config/business";
import { formatUpdated } from "../lib/publicPages";
import { slugify } from "../lib/shop";

export function ArticlePage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const article = business.articles.find((item) => slugify(item.title) === slug);

  if (!article) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-8">
        <h1 className="[font-family:'Gabarito',Helvetica] text-3xl font-extrabold text-[#142033]">
          That article is not on this site.
        </h1>
        <Link to="/" className="mt-6 inline-block text-[#2a7a78]">
          Back to the shop
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-8 lg:py-20">
      <PageHead path={`/articles/${slug}`} />
      <p className="[font-family:'Geist',Helvetica] text-sm font-medium text-[#2a7a78]">
        From the shop · Updated {formatUpdated(article.updated)}
      </p>
      <h1 className="mt-3 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold leading-tight text-[#142033] sm:text-[40px]">
        {article.title}
      </h1>
      <p className="mt-4 [font-family:'Geist',Helvetica] text-lg leading-8 text-slate-700">
        {article.description}
      </p>
      {article.paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="mt-5 [font-family:'Geist',Helvetica] text-base leading-7 text-slate-700"
        >
          {paragraph}
        </p>
      ))}
      <p className="mt-8 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
        Written by {business.fullName}. For a visit, call {business.phoneDisplay} or book a morning or afternoon window.
      </p>
    </article>
  );
}
