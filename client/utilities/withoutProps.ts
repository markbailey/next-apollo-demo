function withoutProps<T>(obj: T, ...props: string[]): Partial<T> {
  const newObj = Object.keys(obj)
    .filter((key) => !props.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

  return newObj;
}

export default withoutProps;
