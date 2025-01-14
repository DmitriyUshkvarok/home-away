import db from '@/utils/db';

export default async function sitemap() {
  const baseUrl = 'https://home-away-snowy.vercel.app/en';
  const properties = await db.property.findMany({});

  const propertiesUrl = properties?.map((property) => {
    return {
      url: `${baseUrl}/rentals/${property.id}`,
      lastModified: property.updatedAt,
    };
  });
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/rentals`,
      lastModified: new Date(),
    },
    ...propertiesUrl,
  ];
}
