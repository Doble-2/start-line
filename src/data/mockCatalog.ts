import type { Singer, Track } from "./models";

export const singers: Singer[] = [
  {
    id: "sk",
    name: "Stray kids",
    genre: "K-pop",
    bio: "Banda surcoreana de música pop y hip-hop.",
  },
  {
    id: "xh",
    name: "xdinary heroes",
    genre: "Rock / K-pop",
    bio: "Banda surcoreana de rock alternativo y K-pop.",
  },
  {
    id: "bnd",
    name: "boynextdoor",
    genre: "K-pop",
    bio: "Banda surcoreana de K-pop.",
  },
  {
    id: "tm",
    name: "Tomorrow x Together",
    genre: "K-pop",
    bio: "Banda surcoreana de K-pop.",
  },
  {
    id: "rv",
    name: "Red Velvet",
    genre: "K-pop",
    bio: "Banda surcoreana de K-pop.",
  },
  {
    id: "s1",
    name: "Luna Vino",
    genre: "Jazz",
    bio: "Luna Vino es una cantante de jazz contemporáneo conocida por su voz suave y melódica.",
  },
  {
    id: "s2",
    name: "Electro Pulse",
    genre: "Electronic",
    bio: "Electro Pulse es un dúo de música electrónica que combina ritmos vibrantes con melodías pegajosas.",
  },
  {
    id: "s3",
    name: "Noir Beats",
    genre: "Hip-Hop",
    bio: "Noir Beats es un rapero y productor de hip-hop conocido por sus letras profundas y beats innovadores.",
  },
];

const demoAudio = {
  a1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  a2: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  a3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  a4: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
} as const;

export const tracks: Track[] = [
  {
    id: "t0",
    singerId: "sk",
    title: "Thunderous",
    album: "Noeasy",
    audioUri: demoAudio.a1,
  },
  {
    id: "t6",
    singerId: "sk",
    title: "MANIAC",
    album: "ODDINARY",
    audioUri: demoAudio.a2,
  },
  {
    id: "t7",
    singerId: "xh",
    title: "LO$ER=LO♡ER",
    album: "Overload",
    audioUri: demoAudio.a3,
  },
  {
    id: "t8",
    singerId: "xh",
    title: "TITANIC",
    album: "Overload",
    audioUri: demoAudio.a4,
  },
  {
    id: "t9",
    singerId: "bnd",
    title: "butterfly",
    album: "boynextdoor 1st Single Album",
    audioUri: demoAudio.a1,
  },
  {
    id: "t10",
    singerId: "bnd",
    title: "serenade",
    album: "boynextdoor 1st Single Album",
    audioUri: demoAudio.a2,
  },
  {
    id: "t11",
    singerId: "tm",
    title: "0X1=LOVESONG (I Know I Love You)",
    album: "The Chaos Chapter: FREEZE",
    audioUri: demoAudio.a3,
  },
  {
    id: "t12",
    singerId: "tm",
    title: "CROWN",
    album: "The Dream Chapter: STAR",
    audioUri: demoAudio.a4,
  },
  {
    id: "t13",
    singerId: "rv",
    title: "psycho",
    album: "The ReVe Festival 2021 - Feel My Rhythm",
    audioUri: demoAudio.a1,
  },
  {
    id: "t14",
    singerId: "rv",
    title: "red flavor",
    album: "The Red Summer",
    audioUri: demoAudio.a2,
  },
  {
    id: "t1",
    singerId: "s1",
    title: "Noche Morada",
    album: "Vino Vol. 1",
    audioUri: demoAudio.a1,
  },
  {
    id: "t2",
    singerId: "s1",
    title: "Bento Dreams",
    album: "Vino Vol. 1",
    audioUri: demoAudio.a2,
  },
  {
    id: "t3",
    singerId: "s2",
    title: "Pulse 808",
    album: "Gradient City",
    audioUri: demoAudio.a3,
  },
  {
    id: "t4",
    singerId: "s2",
    title: "Neon Velvet",
    album: "Gradient City",
    audioUri: demoAudio.a4,
  },
  {
    id: "t5",
    singerId: "s3",
    title: "Black Cherry",
    album: "Noir Sessions",
    audioUri: demoAudio.a2,
  },
];

export function getSingerById(id: string) {
  return singers.find((s) => s.id === id);
}

export function getTracksBySingerId(singerId: string) {
  return tracks.filter((t) => t.singerId === singerId);
}
