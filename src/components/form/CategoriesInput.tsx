import { Label } from '@/components/ui/label';
import { categories } from '@/utils/categories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTranslations } from 'next-intl/server';

const name = 'category';
const CategoriesInput = async ({ defaultValue }: { defaultValue?: string }) => {
  const t = await getTranslations('Categories');
  const tLabel = await getTranslations('CategoriesInput');
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {tLabel('categories')}
      </Label>
      <Select
        defaultValue={defaultValue || categories[0].label}
        name={name}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((item) => {
            return (
              <SelectItem key={item.label} value={item.label}>
                <span className="flex items-center gap-2">
                  <item.icon /> {t(item.label)}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoriesInput;
