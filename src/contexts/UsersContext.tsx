import {
  type Country,
  type UserData,
  type NormalizedUserData,
} from "@/types/declaration";
import { createContext, useEffect, useState, useContext } from "react";

interface UsersContextType {
  countries: Country[];
  users: UserData[];
  cleanedUsers: NormalizedUserData[];
  isLoading: boolean;
  fetchCountries: () => void;
  refetchUsers: () => Promise<void>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [cleanedUsers, setCleanedUsers] = useState<NormalizedUserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchCountries() {
    const response = await fetch(
      "https://685013d7e7c42cfd17974a33.mockapi.io/countries"
    );
    const data = response.json();
    const result = await data;
    setCountries(
      result.map((item: Country) => ({ id: item.id, name: item.name }))
    );
  }

  async function fetchUserData() {
    const response = await fetch(
      "https://685013d7e7c42cfd17974a33.mockapi.io/taxes"
    );
    const data = response.json();
    const result = await data;
    setUsers(result);
  }

  async function refetchUsers() {
    setIsLoading(true);
    await fetchUserData();
    setIsLoading(false);
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCountries(), fetchUserData()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (users.length === 0 || countries.length === 0) return;

    const cleanData = (): NormalizedUserData[] => {
      return users.map((user) => {
        // Prioritizing countryId over country field
        let resolvedCountry = user.country;
        if (user.countryId) {
          const countryById = countries.find((c) => c.id === user.countryId);
          if (countryById) {
            resolvedCountry = countryById.name;
          }
        }

        // Gender - Title Mode (first letter is capital)
        const normalizedGender =
          user.gender.charAt(0).toUpperCase() +
          user.gender.slice(1).toLowerCase();

        // Normalize tax - convert empty string to 0, ensure number
        let normalizedTax: number | undefined;
        if (user.tax !== undefined) {
          if (user.tax === "" || user.tax === null) {
            normalizedTax = 0;
          } else {
            normalizedTax =
              typeof user.tax === "string"
                ? parseFloat(user.tax) || 0
                : user.tax;
          }
        }

        // Normalize requestDate to ISO format or null
        let normalizedRequestDate: string | null = null;
        if (user.requestDate) {
          try {
            // Try to parse the date
            const parsedDate = new Date(user.requestDate);
            if (!isNaN(parsedDate.getTime())) {
              normalizedRequestDate = parsedDate.toISOString();
            }
          } catch (e) {
            normalizedRequestDate = null;
          }
        }

        return {
          id: user.id,
          createdAt: user.createdAt,
          name: user.name,
          country: resolvedCountry,
          gender: normalizedGender as "Male" | "Female",
          requestDate: normalizedRequestDate,
          countryId: user.countryId,
          entity: user.entity,
          tax: normalizedTax,
          date: user.date,
          normalizedCountry: user.normalizedCountry,
        };
      });
    };

    setCleanedUsers(cleanData());
  }, [users]);

  const contextValue: UsersContextType = {
    countries,
    users,
    cleanedUsers,
    isLoading,
    fetchCountries,
    refetchUsers,
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
