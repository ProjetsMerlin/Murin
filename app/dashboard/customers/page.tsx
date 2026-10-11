import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { fetchCustomers } from '@/app/lib/data';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Clients',
};

export default async function CustomersTable() {
  const customers = await fetchCustomers();
  
  return (
    <div className="w-full">
    <h1 className={`${lusitana.className} text-2xl`}>Clients</h1>
    {customers?.map(customer => (
      <a href={`invoices?page=1&query=${customer.name}`} className="flex rounded-lg max-w-86 p-4 gap-4 items-center hover:opacity-75 hover:bg-gray-200 " key={customer.id}>
      <Image
      width="44"
      height="44"
      alt={customer.name}
      src={customer.image_url}
      className='rounded-lg'
      />
      <div>
      <strong className="block bold">
      {customer.name}
      </strong>
      <span>{customer.email}</span>
      </div>
      </a>
    ))}
    </div>
  );
}