export type Singer = {
  id: string;
  name: string;
  genre: string;
  bio: string;
};

export type Track = {
  id: string;
  singerId: string;
  title: string;
  album: string;
  audioUri: string;
};
