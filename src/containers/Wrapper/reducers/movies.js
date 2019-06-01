const initialState = [
  {
    "vote_count": 809,
    "id": 999999,
    "video": false,
    "vote_average": 7.2,
    "title": "Aladdin",
    "popularity": 476.676,
    "poster_path": "/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg",
    "original_language": "en",
    "original_title": "Aladdin",
    "genre_ids": [
      12,
      14,
      10749,
      35,
      10751
    ],
    "backdrop_path": "/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg",
    "adult": false,
    "overview": "A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.",
    "release_date": "2019-05-22"
  },
];
export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'RECEIVE_MOVIES':
      return [...state, ...action.movies.results];
    default:
      return state;
  }
}
