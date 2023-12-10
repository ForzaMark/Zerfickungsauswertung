/**
 * Picks a specific type of a discriminated union by its discriminator.
 *
 * @example
 * type Union = { type: 'a', a: number } | { type: 'b', b: string }
 * type A = PickByDiscriminator<Union, 'type', 'a'> // { type: 'a', a: number }
 * type B = PickByDiscriminator<Union, 'type', 'b'> // { type: 'b', b: string }
 */
export type PickByDiscriminator<
  TType,
  TProperty extends keyof TType,
  TDiscriminator extends TType[TProperty],
> = TType & { [key in TProperty]: TDiscriminator };

export function isDiscriminatedBy<
  TType,
  TProperty extends keyof TType,
  TDiscriminator extends TType[TProperty],
>(
  property: TProperty,
  discriminator: TDiscriminator,
): (
  value: TType,
) => value is PickByDiscriminator<TType, TProperty, TDiscriminator> {
  return (
    value,
  ): value is PickByDiscriminator<TType, TProperty, TDiscriminator> =>
    value[property] === discriminator;
}

export function isNotDiscriminatedBy<
  TType,
  TProperty extends keyof TType,
  TDiscriminator extends TType[TProperty],
>(
  property: TProperty,
  discriminator: TDiscriminator,
): (
  value: TType,
) => value is PickByDiscriminator<
  TType,
  TProperty,
  Exclude<TType[TProperty], TDiscriminator>
> {
  return (
    value,
  ): value is PickByDiscriminator<
    TType,
    TProperty,
    Exclude<TType[TProperty], TDiscriminator>
  > => value[property] !== discriminator;
}
