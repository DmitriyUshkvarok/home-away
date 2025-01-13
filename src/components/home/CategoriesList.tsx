import { categories } from '@/utils/categories';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const CategoriesList = async ({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) => {
  const t = await getTranslations('Categories');
  const searchTerm = search ? `&search=${search}` : '';

  const currentCategory = categories.find((item) => item.label === category);
  const categoryName = currentCategory
    ? t(currentCategory.label)
    : 'Home Page All Category Homes';
  return (
    <section>
      <h1 className="hiddenTitle">{categoryName}</h1>
      <ScrollArea className="py-6">
        <div className="flex gap-x-4">
          {categories.map((item) => {
            const isActive = item.label === category;
            return (
              <Link
                key={item.label}
                href={`/?category=${item.label}${searchTerm}`}
              >
                <article
                  className={`p-3 flex flex-col items-center cursor-pointer duration-300  hover:text-primary w-[100px] ${
                    isActive ? 'text-primary' : ''
                  }`}
                >
                  <item.icon className="w-8 h-8 " />
                  <p className="capitalize text-sm mt-1"> {t(item.label)} </p>
                </article>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default CategoriesList;
