type ArrayWithUtils<T, U extends Record<string, (...args: any[]) => any>> = {
  [P in keyof U]: U[P];
} & Array<T>;

interface ArrayUtilities<T> {
  groupBy<K extends string | number | symbol>(keySelector: (item: T, index: number) => K): Record<K, T[]>;
}

class EnhancedArray<T> extends Array<T> implements ArrayUtilities<T> {
  groupBy<K extends string | number | symbol>(keySelector: (item: T, index: number) => K): Record<K, T[]> {
    return this.reduce((acc, item, index) => {
      const key = keySelector(item, index);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<K, T[]>);
  }

  mapWithIndex<U>(callback: (value: T, index: number, array: T[]) => U): EnhancedArray<U> {
    return this.map(callback) as EnhancedArray<U>;
  }
}

const users = new EnhancedArray(
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"},
  {id: 3, name: "Charlie", role: "admin"}
);

const groupedByRole = users.groupBy((user) => user.role);

const result = users
  .mapWithIndex((user, index) => ({
    ...user,
    index,
    status: index % 2 === 0 ? "active" : "inactive",
  }))
  .groupBy((user) => user.status);
