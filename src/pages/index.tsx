import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const { data, isLoading, error } = useQuery(["drivers"], fetchDrivers);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{"We had an error :" + error}</div>;

  console.log();

  return (
    <>
      <Head>
        <title>Formula 1 Stats</title>
        <meta name="description" content="All about Formula 1 numbers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-3 lg:w-2/3">
          {data?.MRData.DriverTable.Drivers.map((driver) => (
            <DriverCard
              key={driver.code}
              firstName={driver.familyName}
              lastName={driver.givenName}
              number={driver.permanentNumber}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

type DriverCardProps = {
  firstName: string;
  lastName: string;
  number: string;
};

const DriverCard = ({ firstName, lastName, number }: DriverCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105 bg-slate-800">
      <div>
        <h2 className="text-lg text-gray-200">#{number}</h2>
      </div>
      <div className="flex justify-end flex-col">
        <div>
          <h2 className="text-lg text-gray-200">{lastName}</h2>
        </div>
        <div>
          <h2 className="text-lg text-gray-200">{firstName}</h2>
        </div>
      </div>
    </section>
  );
};

async function fetchDrivers(): Promise<DriversList> {
  return fetch("http://ergast.com/api/f1/2022/drivers.json").then((res) =>
    res.json()
  );
}

type DriversList = {
  MRData: Mrdata;
};

type Mrdata = {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  DriverTable: DriverTable;
};

type DriverTable = {
  season: string;
  Drivers: Driver[];
};

type Driver = {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};
