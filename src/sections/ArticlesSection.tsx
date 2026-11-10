import { Link } from "react-router-dom";
import { business } from "../config/business";
import { slugify } from "../lib/shop";

export function ArticlesSection(): JSX.Element {
  return (
    <section className="bg-white px-4 py-16 sm:px-8 lg:px-16 lg:py-20">
      <h2 className="text-center [font-family:'Gabarito',Helvetica] text-[28px] font-extrabold text-[#142033] sm:text-[36px]">
        From the shop
      </h2>
      <ul className="mx-auto mt-10 grid w-full max-w-5xl gap-4">
        {business.articles.map((article) => (
          <li key={article.title} className="border border-slate-200 bg-[#f4f6f8] p-5 sm:p-6">
            <h3 className="[font-family:'Gabarito',Helvetica] text-xl font-extrabold text-[#142033]">
              <Link to={`/articles/${slugify(article.title)}`} className="hover:text-[#2a7a78]">
                {article.title}
              </Link>
            </h3>
            <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
              {article.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
