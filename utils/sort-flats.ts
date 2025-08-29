export default function sortFlats(
  flats: Flat[],
  floor: Order,
  area: Order,
  price: Order
) {
  const flatsCopy = [...flats];
  flatsCopy
    .sort((a, b) => a.id - b.id)
    .sort((a, b) => (a.floor - b.floor) * floor)
    .sort((a, b) => (a.area - b.area) * area)
    .sort((a, b) => (a.price - b.price) * price)

  return flatsCopy
}
