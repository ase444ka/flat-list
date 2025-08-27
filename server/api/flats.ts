export default defineEventHandler(async (event) => {
  const body = await new Promise((res) => {
    setTimeout(
      () =>
        res([
          {
            id: 1,
            image_url: '/layouts/1.svg',
            title: '3-комнатная №104',
            rooms: 3,
            floor: 2,
            total_floors: 17,
            area: 40,
            price: 7000000,
          },
          {
            id: 2,
            image_url: '/layouts/1.svg',
            title: '3-комнатная №104',
            rooms: 3,
            floor: 2,
            total_floors: 17,
            area: 40,
            price: 7000000,
          },
          {
            id: 3,
            image_url: '/layouts/1.svg',
            title: '3-комнатная №104',
            rooms: 3,
            floor: 2,
            total_floors: 17,
            area: 40,
            price: 7000000,
          },
        ]),
      2000
    );
  });
  return body;
});
