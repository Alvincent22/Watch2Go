document.addEventListener('DOMContentLoaded', function() {
    const movies = {
        "joker": {
            title: "Joker",
            poster: "movies/Joker.jpg",
            trailer: "TrailerVids/joker-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-joker-hd-9766.5392645",
            info: [
                { label: "Release Date", value: "October 4, 2019" },
                { label: "Director", value: "Todd Phillips" },
                { label: "Starring", value: "Joaquin Phoenix, Robert De Niro, Zazie Beetz" },
                { label: "Genre", value: "Crime, Drama, Thriller" },
                { label: "Studio", value: "Warner Bros. Pictures" }
            ],
            plot: [
                "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
                "Joaquin Phoenix delivers a haunting performance as Arthur Fleck, a man struggling to find his way in Gotham's fractured society. As he faces the cruelty and outright scorn of existence, one bad decision brings about a chain reaction of escalating events."
            ]
        },
        "despicableMe": {
            title: "Despicable Me",
            poster: "movies/despicable.jpg",
            trailer: "TrailerVids/despicableme-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-despicable-me-hd-19486.5349256",
            info: [
                { label: "Release Date", value: "July 9, 2010" },
                { label: "Directors", value: "Pierre Coffin, Chris Renaud" },
                { label: "Starring", value: "Steve Carell, Jason Segel, Russell Brand" },
                { label: "Genre", value: "Animation, Comedy, Family" },
                { label: "Studio", value: "Illumination Entertainment" }
            ],
            plot: [
                "When a criminal mastermind uses a trio of orphan girls as pawns for a grand scheme, he finds their love is profoundly changing him for the better.",
                "Gru, a super-villain, has his pride injured when an unknown super-villain steals the Great Pyramid of Giza. Gru decides to do something even more despicable: steal the moon!"
            ]
        },
        "interstellar": {
            title: "Interstellar",
            poster: "movies/interstellar.jpg",
            trailer: "TrailerVids/interstellar-trailer.mp4",
            watchLink: "https://sflix.to/movie/free-interstellar-hd-19788",
            info: [
                { label: "Release Date", value: "November 7, 2014" },
                { label: "Director", value: "Christopher Nolan" },
                { label: "Starring", value: "Matthew McConaughey, Anne Hathaway, Jessica Chastain" },
                { label: "Genre", value: "Adventure, Drama, Sci-Fi" },
                { label: "Studio", value: "Paramount Pictures" }
            ],
            plot: [
                "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                "Set in a dystopian future where humanity is struggling to survive, the film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for mankind."
            ]
        },
        "jumanjiWelcomeToTheJungle": {
            title: "Jumanji: Welcome to the Jungle",
            poster: "movies/jumanji.jpg",
            trailer: "TrailerVids/jumanji-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-jumanji-welcome-to-the-jungle-hd-19299.5298103",
            info: [
                { label: "Release Date", value: "December 20, 2017" },
                { label: "Director", value: "Jake Kasdan" },
                { label: "Starring", value: "Dwayne Johnson, Karen Gillan, Kevin Hart, Jack Black" },
                { label: "Genre", value: "Action, Adventure, Comedy" },
                { label: "Studio", value: "Sony Pictures" }
            ],
            plot: [
                "Four teenagers are sucked into a magical video game, and the only way they can escape is to work together to finish the game.",
                "When four high-school kids discover an old video game console with a game they've never heard of – Jumanji – they are immediately drawn into the game's jungle setting, literally becoming the avatars they chose."
            ]
        },
        "transformersOne": {
            title: "Transformers: One",
            poster: "movies/transformersone.jpg",
            trailer: "TrailerVids/transformers-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-transformers-one-hd-114058.10682158",
            info: [
                { label: "Release Date", value: "September 13, 2024" },
                { label: "Director", value: "Josh Cooley" },
                { label: "Starring", value: "Chris Hemsworth, Brian Tyree Henry, Scarlett Johansson" },
                { label: "Genre", value: "Action, Adventure, Sci-Fi" },
                { label: "Studio", value: "Paramount Pictures" }
            ],
            plot: [
                "An origin story set on Cybertron, the planet from which the good-guy and bad-guy robots came from in the sci-fi action franchise.",
                "This animated prequel explores the relationship between Optimus Prime and Megatron, diving into the history of the Transformers' home world, Cybertron."
            ]
        },
        "theLastOfUs": {
            title: "The Last of Us",
            poster: "movies/the last of us.jpg",
            trailer: "TrailerVids/thelastofus-trailer.mp4",
            watchLink: "https://sflix.to/tv/free-the-last-of-us-hd-92254",
            info: [
                { label: "Release Date", value: "January 15, 2023" },
                { label: "Creators", value: "Craig Mazin, Neil Druckmann" },
                { label: "Starring", value: "Pedro Pascal, Bella Ramsey" },
                { label: "Genre", value: "Drama, Horror, Sci-Fi" },
                { label: "Studio", value: "HBO" }
            ],
            plot: [
                "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
                "Based on the critically acclaimed video game, the series takes place twenty years after modern civilization has been destroyed by a deadly virus. Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone."
            ]
        },
        "aQuietPlace": {
            title: "A Quiet Place",
            poster: "movies/aquietplace.jpg",
            trailer: "TrailerVids/aquietplace-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-a-quiet-place-hd-19740.5297305",
            info: [
                { label: "Release Date", value: "April 6, 2018" },
                { label: "Director", value: "John Krasinski" },
                { label: "Starring", value: "Emily Blunt, John Krasinski, Millicent Simmonds" },
                { label: "Genre", value: "Drama, Horror, Sci-Fi" },
                { label: "Studio", value: "Paramount Pictures" }
            ],
            plot: [
                "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
                "The Abbott family must now face the terrors of the outside world as they fight for survival in silence. Forced to venture into the unknown, they realize that the creatures that hunt by sound are not the only threats that lurk beyond the sand path."
            ]
        },
        "theAvengers": {
            title: "The Avengers",
            poster: "movies/avengers.jpg",
            trailer: "TrailerVids/avengers-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-the-avengers-hd-19782.5297293",
            info: [
                { label: "Release Date", value: "May 4, 2012" },
                { label: "Director", value: "Joss Whedon" },
                { label: "Starring", value: "Robert Downey Jr., Chris Evans, Scarlett Johansson" },
                { label: "Genre", value: "Action, Adventure, Sci-Fi" },
                { label: "Studio", value: "Marvel Studios" }
            ],
            plot: [
                "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
                "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster."
            ]
        },
        "insideOut2": {
            title: "Inside Out 2",
            poster: "movies/InsideOut2.jpg",
            trailer: "TrailerVids/insideout-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-inside-out-2-hd-110170.10515250",
            info: [
                { label: "Release Date", value: "June 14, 2024" },
                { label: "Director", value: "Kelsey Mann" },
                { label: "Starring", value: "Amy Poehler, Phyllis Smith, Lewis Black, Tony Hale, Maya Hawke" },
                { label: "Genre", value: "Animation, Adventure, Comedy" },
                { label: "Studio", value: "Pixar Animation Studios" }
            ],
            plot: [
                "Inside Out 2 returns to the mind of newly minted teenager Riley just as headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who've long been running a successful operation by all accounts, aren't sure how to feel when Anxiety shows up. And it looks like she's not alone.",
                "This highly anticipated sequel to the 2015 hit promises to explore the complexities of adolescence with Pixar's signature blend of humor and heart. As Riley navigates the challenges of being a teenager, the addition of Anxiety (voiced by Maya Hawke) brings a new dynamic to the emotional team.",
                "Director Kelsey Mann, taking over from Pete Docter, aims to capture the turbulent nature of teenage emotions while maintaining the charm and inventiveness that made the original a classic. With Amy Poehler returning as the voice of Joy, alongside the original cast, Inside Out 2 is shaping up to be another emotional rollercoaster that will resonate with audiences of all ages."
            ]
        },
        "spiderManFarFromHome": {
            title: "Spider-Man: Far From Home",
            poster: "movies/spiderman.jpg",
            trailer: "TrailerVids/spiderman-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-spiderman-far-from-home-hd-17240.5389384",
            info: [
                { label: "Release Date", value: "July 2, 2019" },
                { label: "Director", value: "Jon Watts" },
                { label: "Starring", value: "Tom Holland, Samuel L. Jackson, Zendaya" },
                { label: "Genre", value: "Action, Adventure, Sci-Fi" },
                { label: "Studio", value: "Marvel Studios" }
            ],
            plot: [
                "Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.",
                "Our friendly neighborhood Super Hero decides to join his best friends Ned, MJ, and the rest of the gang on a European vacation. However, Peter's plan to leave super heroics behind for a few weeks are quickly scrapped when he begrudgingly agrees to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent."
            ]
        },
        "deadpoolAndWolverine": {
            title: "Deadpool & Wolverine",
            poster: "movies/wolverine&pool.jpg",
            trailer: "TrailerVids/deadpoolwolverine-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-deadpool-wolverine-hd-111016.10587811",
            info: [
                { label: "Release Date", value: "July 26, 2024" },
                { label: "Director", value: "Shawn Levy" },
                { label: "Starring", value: "Ryan Reynolds, Hugh Jackman" },
                { label: "Genre", value: "Action, Comedy, Sci-Fi" },
                { label: "Studio", value: "Marvel Studios" }
            ],
            plot: [
                "The third installment in the Deadpool franchise, now set in the Marvel Cinematic Universe, featuring the return of Wolverine.",
                "While plot details are currently under wraps, fans can expect the trademark humor of Deadpool combined with the gritty persona of Wolverine, as these two fan-favorite characters team up for what promises to be an action-packed and hilarious adventure."
            ]
        },
        "inception": {
            title: "Inception",
            poster: "movies/inception.jpg",
            trailer: "TrailerVids/inception-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-inception-hd-19764.5297266",
            info: [
                { label: "Release Date", value: "July 16, 2010" },
                { label: "Director", value: "Christopher Nolan" },
                { label: "Starring", value: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page" },
                { label: "Genre", value: "Action, Adventure, Sci-Fi" },
                { label: "Studio", value: "Warner Bros. Pictures" }
            ],
            plot: [
                "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a wanted man, and after being offered a chance to return home to his children, he must complete one last job: 'inception', the implantation of another person's idea into a target's subconscious."
            ]
        },
        "freeGuy": {
            title: "Free Guy",
            poster: "movies/freeguy.jpg",
            trailer: "TrailerVids/freeguy-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-free-guy-hd-66987.4820914",
            info: [
                { label: "Release Date", value: "August 13, 2021" },
                { label: "Director", value: "Shawn Levy" },
                { label: "Starring", value: "Ryan Reynolds, Jodie Comer, Lil Rel Howery" },
                { label: "Genre", value: "Action, Comedy, Fantasy" },
                { label: "Studio", value: "20th Century Studios" }
            ],
            plot: [
                "A bank teller discovers that he's actually an NPC inside a brutal, open world video game.",
                "When Guy, a bank teller, discovers he is actually a background player in an open-world video game, he decides to become the hero of his own story. In a world where there are no limits, he is determined to save the day his way before it is too late, and maybe find a little romance with the coder who conceived him."
            ]
        },
        "1917": {
            title: "1917",
            poster: "movies/1917.jpg",
            trailer: "TrailerVids/1917-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-1917-hd-41773.5417827",
            info: [
                { label: "Release Date", value: "December 25, 2019" },
                { label: "Director", value: "Sam Mendes" },
                { label: "Starring", value: "George MacKay, Dean-Charles Chapman" },
                { label: "Genre", value: "Drama, War" },
                { label: "Studio", value: "Universal Pictures" }
            ],
            plot: [
                "April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.",
                "At the height of the First World War, two young British soldiers, Schofield and Blake are given a seemingly impossible mission. In a race against time, they must cross enemy territory and deliver a message that will stop a deadly attack on hundreds of soldiers—Blake's own brother among them."
            ]
        },
        "aquaman": {
            title: "Aquaman",
            poster: "movies/aquaman.jpg",
            trailer: "TrailerVids/aquaman-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-aquaman-hd-19837.5297155",
            info: [
                { label: "Release Date", value: "December 21, 2018" },
                { label: "Director", value: "James Wan" },
                { label: "Starring", value: "Jason Momoa, Amber Heard, Willem Dafoe" },
                { label: "Genre", value: "Action, Adventure, Fantasy" },
                { label: "Studio", value: "Warner Bros. Pictures" }
            ],
            plot: [
                "Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land.",
                "Once home to the most advanced civilization on Earth, the city of Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people -- and then the surface world. Standing in his way is Aquaman, Orm's half-human, half-Atlantean brother and true heir to the throne. With help from royal counselor Vulko and Princess Mera, Aquaman must retrieve the legendary Trident of Atlan and embrace his destiny as protector of the deep."
            ]
        },
        "godzillaKingOfTheMonsters": {
            title: "Godzilla: King of the Monsters",
            poster: "movies/godzilla.jpg",
            trailer: "TrailerVids/godzilla-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-godzilla-king-of-the-monsters-hd-7843.5384293",
            info: [
                { label: "Release Date", value: "May 31, 2019" },
                { label: "Director", value: "Michael Dougherty" },
                { label: "Starring", value: "Kyle Chandler, Vera Farmiga, Millie Bobby Brown" },
                { label: "Genre", value: "Action, Adventure, Fantasy" },
                { label: "Studio", value: "Warner Bros. Pictures" }
            ],
            plot: [
                "The crypto-zoological agency Monarch faces off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah.",
                "Members of the crypto-zoological agency Monarch face off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah. When these ancient super-species-thought to be mere myths-rise again, they all vie for supremacy, leaving humanity's very existence hanging in the balance."
            ]
        },
        "oppenheimer": {
            title: "Oppenheimer",
            poster: "movies/oppenheimer.jpg",
            trailer: "TrailerVids/oppenheimer-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-oppenheimer-hd-98446.9759013",
            info: [
                { label: "Release Date", value: "July 21, 2023" },
                { label: "Director", value: "Christopher Nolan" },
                { label: "Starring", value: "Cillian Murphy, Emily Blunt, Matt Damon" },
                { label: "Genre", value: "Biography, Drama, History" },
                { label: "Studio", value: "Universal Pictures" }
            ],
            plot: [
                "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
                "Oppenheimer is an epic thriller that thrusts audiences into the pulse-pounding paradox of the enigmatic man who must risk destroying the world in order to save it. The film follows theoretical physicist J. Robert Oppenheimer, the director of the Los Alamos Laboratory during the Manhattan Project, and his contributions that led to the creation of the atomic bomb."
            ]
        },
        "theMeg": {
            title: "The Meg",
            poster: "movies/themeg.jpg",
            trailer: "TrailerVids/themeg-trailer.mp4",
            watchLink: "https://sflix.to/watch-movie/free-the-meg-hd-19787.5297269",
            info: [
                { label: "Release Date", value: "August 10, 2018" },
                { label: "Director", value: "Jon Turteltaub" },
                { label: "Starring", value: "Jason Statham, Bingbing Li, Rainn Wilson" },
                { label: "Genre", value: "Action, Horror, Sci-Fi" },
                { label: "Studio", value: "Warner Bros. Pictures" }
            ],
            plot: [
                "A deep-sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy-foot ancestor of the Great White Shark believed to be extinct.",
                "A massive creature attacks a deep-sea submersible, leaving it disabled and trapping the crew at the bottom of the Pacific Ocean. With time running out, rescue diver Jonas Taylor must save the crew and confront his fears to save everyone from an unimaginable threat -- a 75-foot-long prehistoric shark known as the Megalodon."
            ]
        }
    };

    function updateMovieContent(movieId) {
        const movie = movies[movieId];
        if (!movie) return;

        document.getElementById('movie-title').textContent = movie.title;
        document.getElementById('movie-poster').src = movie.poster;
        document.getElementById('movie-poster').alt = movie.title;
        document.getElementById('movie-trailer').querySelector('source').src = movie.trailer;
        document.getElementById('movie-trailer').load(); 

        const movieInfoList = document.getElementById('movie-info');
        movieInfoList.innerHTML = movie.info.map(item => `<li><strong>${item.label}:</strong> ${item.value}</li>`).join('');

        const moviePlot = document.getElementById('movie-plot');
        moviePlot.innerHTML = movie.plot.map(paragraph => `<p>${paragraph}</p>`).join('');

        document.querySelector('.watch-movie-button').href = movie.watchLink;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movie');
    if (movieId) {
        updateMovieContent(movieId);
    }
});