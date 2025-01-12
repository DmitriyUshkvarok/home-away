'use client';
import { useState } from 'react';
import { Amenity } from '@/utils/amenities';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FiCloud,
  FiTruck,
  FiZap,
  FiWind,
  FiSun,
  FiCoffee,
  FiFeather,
  FiAirplay,
  FiTrello,
  FiBox,
  FiAnchor,
  FiDroplet,
  FiMapPin,
  FiSunrise,
  FiSunset,
  FiMusic,
  FiHeadphones,
  FiRadio,
  FiFilm,
  FiTv,
} from 'react-icons/fi';
import { useTranslations } from 'next-intl';

function AmenitiesInput({ defaultValue }: { defaultValue?: Amenity[] }) {
  const t = useTranslations('AmenitiesInput');

  const amenities: Amenity[] = [
    { name: t('unlimitedCloudStorage'), icon: FiCloud, selected: false },
    { name: t('vipParkingForSquirrels'), icon: FiTruck, selected: false },
    { name: t('selfLightingFirePit'), icon: FiZap, selected: false },
    {
      name: t('bbqGrillWithMasterchef'),
      icon: FiWind,
      selected: false,
    },
    { name: t('outdoorFurniture'), icon: FiSun, selected: false },
    {
      name: t('privateBathroom'),
      icon: FiCoffee,
      selected: false,
    },
    { name: t('hotShower'), icon: FiFeather, selected: false },
    { name: t('kitchenette'), icon: FiAirplay, selected: false },
    { name: t('naturalHeating'), icon: FiTrello, selected: false },
    {
      name: t('airConditioning'),
      icon: FiBox,
      selected: false,
    },
    { name: t('bedLinens'), icon: FiAnchor, selected: false },
    { name: t('towels'), icon: FiDroplet, selected: false },
    {
      name: t('picnicTable'),
      icon: FiMapPin,
      selected: false,
    },
    {
      name: t('hammock'),
      icon: FiSunrise,
      selected: false,
    },
    { name: t('solarPower'), icon: FiSunset, selected: false },
    {
      name: t('waterSupply'),
      icon: FiMusic,
      selected: false,
    },
    {
      name: t('cookingUtensils'),
      icon: FiHeadphones,
      selected: false,
    },
    { name: t('coolBox'), icon: FiRadio, selected: false },
    { name: t('lanterns'), icon: FiFilm, selected: false },
    { name: t('firstAidKit'), icon: FiTv, selected: false },
  ];

  const amenitiesWithIcons = defaultValue?.map(({ name, selected }) => {
    const amenity = amenities.find((amenity) => amenity.name === name);
    return amenity
      ? { name, selected, icon: amenity.icon }
      : { name, selected, icon: FiCloud };
  });

  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    amenitiesWithIcons || amenities
  );

  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenity.name) {
          return { ...a, selected: !a.selected };
        }
        return a;
      });
    });
  };

  return (
    <section>
      <input
        type="hidden"
        name="amenities"
        value={JSON.stringify(selectedAmenities)}
      />
      <div className="grid grid-cols-2 gap-4">
        {selectedAmenities.map((amenity) => {
          return (
            <div key={amenity.name} className="flex items-center space-x-2">
              <Checkbox
                id={amenity.name}
                checked={amenity.selected}
                onCheckedChange={() => handleChange(amenity)}
              />
              <label
                htmlFor={amenity.name}
                className="text-sm font-medium leading-none capitalize flex gap-x-2 items-center"
              >
                {amenity.name} <amenity.icon className="w-4 h-4" />
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default AmenitiesInput;
