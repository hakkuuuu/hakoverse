import { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';

type MemePost = {
  id: number;
  title: string;
  image: string;
  upvotes: number;
  comments: number;
};

const initialMemes: MemePost[] = [
  {
    id: 1,
    title: 'Burst Fade pa to ya?',
    image:
      'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/528921662_122229982940088505_3615420672165660195_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE9gqluRjd1P-RQe3xLCHVJBxF6dkD-eqQHEXp2QP56pCrwGmlqMZfMYyaqrLeRWhagQ0AIbp2PO8ENhMOUdyQH&_nc_ohc=oMdvOOpJ1DoQ7kNvwH59Nqj&_nc_oc=Adkw24UsEqg6WJOgYbi31Gcy1r_3SsTmGeEYTF534E4GYevtOU_OV-nfr8udiDMs3E0&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=xQPhk2KDOP5NAVYB0uxssQ&oh=00_AfUtvXRs5snABlwUxhPMOPhfy22RKLNIkpkRK6SbJac7cQ&oe=689BD2E2',
    upvotes: 253,
    comments: 12,
  },
  {
    id: 2,
    title: 'Burst Fade parin to ya?',
    image:
      'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/528921662_122229982940088505_3615420672165660195_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE9gqluRjd1P-RQe3xLCHVJBxF6dkD-eqQHEXp2QP56pCrwGmlqMZfMYyaqrLeRWhagQ0AIbp2PO8ENhMOUdyQH&_nc_ohc=oMdvOOpJ1DoQ7kNvwH59Nqj&_nc_oc=Adkw24UsEqg6WJOgYbi31Gcy1r_3SsTmGeEYTF534E4GYevtOU_OV-nfr8udiDMs3E0&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=xQPhk2KDOP5NAVYB0uxssQ&oh=00_AfUtvXRs5snABlwUxhPMOPhfy22RKLNIkpkRK6SbJac7cQ&oe=689BD2E2',
    upvotes: 253,
    comments: 12,
  },
  {
    id: 3,
    title: 'Burst Fade parin to ya?',
    image:
      'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/528921662_122229982940088505_3615420672165660195_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE9gqluRjd1P-RQe3xLCHVJBxF6dkD-eqQHEXp2QP56pCrwGmlqMZfMYyaqrLeRWhagQ0AIbp2PO8ENhMOUdyQH&_nc_ohc=oMdvOOpJ1DoQ7kNvwH59Nqj&_nc_oc=Adkw24UsEqg6WJOgYbi31Gcy1r_3SsTmGeEYTF534E4GYevtOU_OV-nfr8udiDMs3E0&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=xQPhk2KDOP5NAVYB0uxssQ&oh=00_AfUtvXRs5snABlwUxhPMOPhfy22RKLNIkpkRK6SbJac7cQ&oe=689BD2E2',
    upvotes: 253,
    comments: 12,
  },
  {
    id: 4,
    title: 'Burst Fade parin to ya?',
    image:
      'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/528921662_122229982940088505_3615420672165660195_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE9gqluRjd1P-RQe3xLCHVJBxF6dkD-eqQHEXp2QP56pCrwGmlqMZfMYyaqrLeRWhagQ0AIbp2PO8ENhMOUdyQH&_nc_ohc=oMdvOOpJ1DoQ7kNvwH59Nqj&_nc_oc=Adkw24UsEqg6WJOgYbi31Gcy1r_3SsTmGeEYTF534E4GYevtOU_OV-nfr8udiDMs3E0&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=xQPhk2KDOP5NAVYB0uxssQ&oh=00_AfUtvXRs5snABlwUxhPMOPhfy22RKLNIkpkRK6SbJac7cQ&oe=689BD2E2',
    upvotes: 253,
    comments: 12,
  },
];

export default function Home() {
  const [memes, setMemes] = useState(initialMemes);

  const handleVote = (id: number, type: 'up' | 'down') => {
    setMemes((prev) =>
      prev.map((meme) =>
        meme.id === id
          ? {
              ...meme,
              upvotes: type === 'up' ? meme.upvotes + 1 : meme.upvotes - 1,
            }
          : meme
      )
    );
  };

  return (
    <main className="glassy-gradient dark:bg-primary-dark min-h-screen p-6 text-stone-700 dark:text-white">
      <div className="w-[70%] flex flex-col mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Welcome sa Reddit na Legends lang nakakaalam
        </h1>

        <div className="space-y-6">
          {memes.map((meme) => (
            <div
              key={meme.id}
              className="bg-white dark:bg-primary-light/5 rounded-xl shadow p-4"
            >
              <h2 className="font-semibold text-lg mb-2">{meme.title}</h2>
              <img
                src={meme.image}
                alt={meme.title}
                className="rounded-lg mb-3 max-h-[400px] w-full object-cover"
              />

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleVote(meme.id, 'up')}
                    className="flex items-center gap-1 hover:text-green-500"
                  >
                    <FaArrowUp /> {meme.upvotes}
                  </button>
                  <button
                    onClick={() => handleVote(meme.id, 'down')}
                    className="flex items-center gap-1 hover:text-red-500"
                  >
                    <FaArrowDown />
                  </button>
                </div>

                <button className="flex items-center gap-1 hover:text-blue-500">
                  <FaComment /> {meme.comments} Comments
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
