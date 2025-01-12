import { fetchReservations } from '@/actions/actions';
import Link from 'next/link';
import EmptyList from '@/components/home/EmptyList';
import CountryFlagAndName from '@/components/card/CountryFlagAndName';
import { formatDate, formatCurrency } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Stats from '@/components/reservations/Stats';
import { getTranslations } from 'next-intl/server';

const ReservationsPage = async () => {
  const reservations = await fetchReservations();
  const t = await getTranslations('Reservations');

  if (reservations.length === 0) {
    return <EmptyList />;
  }
  return (
    <>
      <Stats />
      <div className="mt-16">
        <h4 className="mb-4 capitalize">
          {t('totalReservations')} : {reservations.length}
        </h4>
        <Table>
          <TableCaption>{t('reservationsList')}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{t('propertyName')}</TableHead>
              <TableHead>{t('country')}</TableHead>
              <TableHead>{t('nights')}</TableHead>
              <TableHead>{t('total')}</TableHead>
              <TableHead>{t('checkIn')}</TableHead>
              <TableHead>{t('checkOut')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((item) => {
              const { id, orderTotal, totalNights, checkIn, checkOut } = item;
              const { id: propertyId, name, country } = item.property;
              const startDate = formatDate(checkIn);
              const endDate = formatDate(checkOut);
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link
                      href={`/properties/${propertyId}`}
                      className="underline text-muted-foreground tracking-wide"
                    >
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <CountryFlagAndName countryCode={country} />
                  </TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ReservationsPage;
