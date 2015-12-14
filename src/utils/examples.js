import { getId } from './index';
import movies from './moviesData';
import defaultAvatar from '../../images/avatar.png';
import gotrecilloAvatar from '../../images/gotrecilloAvatar.png';
import gotreAvatar from '../../images/gotreAvatar.png';
import avatarPost from '../../images/avatarPost.png';
import independancePost from '../../images/independancePost.png';
import retiredPost from '../../images/retiredPost.png';
import specialPost from '../../images/specialPost.png';
import hansoloPost from '../../images/hansoloPost.png';

export const defaultMovies = movies;

const HISTORY_ID = getId();
const WATCHLIST_ID = getId();
const COLLECTION_ID = getId();
const HARRY_POTTER_LIST_ID = getId();
const FIRST_COMMENT_ID = getId();
const SECOND_COMMENT_ID = getId();
const THIRD_COMMENT_ID = getId();
const FOURTH_COMMENT_ID = getId();
const FIRST_USERNAME = 'Pepe';

export const defaultLists = {
  [HISTORY_ID]: {
    id: HISTORY_ID,
    title: 'History',
    slug: 'history',
    desc: 'A list of watched movies',
    custom: false
  },
  [WATCHLIST_ID]: {
    id: WATCHLIST_ID,
    title: 'WatchList',
    slug: 'watchlist',
    desc: 'A list of pending movies',
    custom: false
  },
  [COLLECTION_ID]: {
    id: COLLECTION_ID,
    title: 'Collection',
    slug: 'collection',
    desc: 'A list of collected movies',
    custom: false,
  },
  [HARRY_POTTER_LIST_ID]: {
    id: HARRY_POTTER_LIST_ID,
    title: 'Harry potter movies',
    slug:'harry-potter-movies',
    desc: 'All the magic in Howarts',
    custom: true,
  }

};

export const defaultEntries = {
  [HISTORY_ID] : ['7', '70', '43'],
  [WATCHLIST_ID] : ['234', '432'],
  [COLLECTION_ID] : ['481', '505'],
  [HARRY_POTTER_LIST_ID] : ['546', '234', '62544', '234', '432', '481', '505', '7', '70', '43', '198', '228', '230', '309', '358']
};

export const defaultComments = {
  [HARRY_POTTER_LIST_ID] : [
      {
        id: FIRST_COMMENT_ID,
        text: 'Hiiiiii',
        time: new Date(),
        userName: 'Gotre1',
        likes: 0,
        dislikes: 0
      },
      {
        id: SECOND_COMMENT_ID,
        text: 'Byeee',
        time: new Date(),
        userName: 'Gotre',
        likes: 0,
        dislikes: 0
      },
      {
        id: FOURTH_COMMENT_ID,
        text: 'I\'m shy',
        time: new Date(),
        userName: 'ShyBoy',
        likes: 0,
        dislikes: 1337
      }
    ],
  ['7'] : [
      {
        id: THIRD_COMMENT_ID,
        text: 'This movie is awesome',
        time: new Date(),
        userName: 'Gotre',
        likes: 0,
        dislikes: 0
      }
    ]
};

export const defaultUsers = {
  [FIRST_USERNAME] : {
    userName: FIRST_USERNAME,
    displayName: 'Pepito',
    avatarUrl: defaultAvatar
  },
  'Gotre': {
    userName: 'Gotre',
    displayName: 'Gotre',
    avatarUrl: gotreAvatar
  },
  'Gotre1': {
    userName: 'Gotre1',
    displayName: 'Gotrecillo',
    avatarUrl: gotrecilloAvatar
  },
  'ShyBoy': {
    userName: 'ShyBoy',
    displayName: 'ShyBoy',
    avatarUrl: defaultAvatar
  }
};

export const defaultUserRatings = {
  'Gotre': {
    '7': 7,
    '40': 1,
    '505': 10
  },
  'ShyBoy': {
    '7': 10
  },
  'Gotre1': {
    '7': 9,
    '40': 2,
  },
};


export const defaultMovieRatings = {
  '7':{
    totalVotes: 3,
    totalNote: 28
  },
  '40': {
    totalVotes: 2,
    totalNote: 3
  },
  '505': {
    totalVotes: 1,
    totalNote: 10
  }
};

export const genres = [
  "all",
  "action",
  "adventure",
  "animation",
  "comedy",
  "crime",
  "drama",
  "family",
  "fantasy",
  "horror",
  "music",
  "mystery",
  "romance",
  "science-fiction",
  "thriller",
  "war",
  "western"
];

export const defaultPosts = [
  {
    id: getId(),
    slug: 'refining-avatar',
    nextSlug: 'will-is-dead',
    title: "'Refining' Avatar sequels",
    entries: [
      'It might feel like we’ve been waiting for forever for new Avatar instalments, given that James Cameron has been promising them for years. But as the second, third and fourth films creep towards production, the co-writer/director has offered an update on their progress.',
      '“I’m in the process of doing another pass through all three scripts right now,” Cameron tells Entertainment Weekly. “Just refining. That’s in parallel with the design process. The design process is very mature at this point. We’ve been designing for about a year and a half. All the characters, settings and creatures are all pretty much set.” The main work of the screenplays, of course, has been farmed out to a team that includes Rick Jaffa and Amanda Silver, Josh Friedman and Shane Salerno.',
      'And Cameron doesn’t want to rest on his laurels when it comes to the ever-expanding Avatar universe. “No, you have to challenge yourself. Obviously, expectations are going to be very high on these films, especially on Avatar 2, to make sure it wasn’t just some big fluke the first time. So we’ve got to deliver. I’ve created a nice rod for my own back, so they say.”',
      'The three new Avatar movies are gearing up to shoot concurrently and will (hopefully) start to arrive in cinemas from 2017.'
    ],
    summary: 'Fresh news from our beloved blue aliens',
    image: avatarPost,
  },
  {
    id: getId(),
    slug: 'will-is-dead',
    prevSlug: 'refining-avatar',
    nextSlug: 'practical-effects',
    title: "So Will Smith’s is dead",
    entries: [
      'The trailer and website for the sequel to the 1996 film Independence Day was released over the weekend generating a collective ‘huh!?’ from the internet over the weekend. For the most part a lot of folks have fairly fond memories of the original film which helped cement Will Smith as a household name looked forward to alien infested adventure with the folks who brought together that film. But that was like 20 yrs ago and most people have no clue that a new film was being developed or why.',
      'Nobody likes an off screen death. I’m sure not getting Will Smith to return was a big blow to the film makers while trying to get this film off the ground but man… the off screen death. C’mon guys, you’re better than that. Apparently they created two scripts for this movie in development wherein they either wrote Hiller alive or dead depending on negotiations with Will Smith so this one could have went either way.'
    ],
    summary: 'We will miss the fresh prince of kicking alien asses.',
    image: independancePost,
  },
  {
    id: getId(),
    slug: 'wasted-youth',
    prevSlug: 'will-is-dead',
    nextSlug: 'practical-effects',
    title: '“Youth” Is Wasted on Everyone',
    entries: [
      'In Youth Paolo Sorrentino’s visual whimsy is bittersweet. It’s thought provoking, but feels like a put on. But it certainly works to a degree. It’s a spectacle of technical acumen and artful exploits. Terrence Malick, eat your heart out. Sorrentino’s not a pure stylist. While film is a visual medium—I have a friend who just loves to remind me of this for some reason—if you listen to Sorrentino’s Youth, you get a better idea of why it feels so empty.',
      'Sorrentino sets off a nuclear bomb of personal philosophies, much like in his previous film, The Great Beauty, which I personally found to be a painful experience to sit through. Whether it’s the super smug wisdom of a hip nightlife living Mr. Magoo lookalike named Jep, or the rank-and-file revelations of a pair of great artists entering their twilight in Youth, the effect is almost exactly the same—suffocation by way of someone else’s idealism.',
      'Michael Caine stars as Fred Ballinger, a retired orchestra conductor famous the world over for his “Simple Songs.” Fred is embarrassed by what he views as lackluster street cred in the classical music scene, though the Queen of England is hunting him down to play a concert for her, and the French (as in, the entire French nation) are demanding his memoirs. Fred is on vacation with his daughter/assistant, Lena (Rachel Weisz), at a resort in the Swiss Alps. Lena has a problem with how her dad treats her mom, but Fred just misses his wife, and it’s only later that any of this contradictory and vague narrative thread ties together to something coherent but unsatisfying. He is staying with his best buddy, Mick (Harvey Keitel), who is there to finish a script for his next movie, which he plans to be his magnum opus (it’s title: “Life’s Last Day”). Mick and his team of screenwriters squawk with the snippy ferocity of high schoolers with good grades. Fred and Mick stroll around the Alps shooting the breeze about old girlfriends, urination complications, and deriding the resident Buddhist monk who has yet to levitate in the twenty years Fred has frequented the place. You can guess whether or not the monk levitates by film’s end. Every image you see matches up with some inane snippet of dialogue, making it hard to appreciate whatever it is Sorrentino would rather us focus on visually.',
      'Pop stars are compared to prostitutes, and a Miss Universe contestant gets to stand tall in the face of scrutiny over her aspirations to be an actor–are any of these stereotypical juxtapositions interesting to anyone anymore? Lena is dumped by her handsome boyfriend for not being good in bed, but finds new love in the most “unlikely” place—a bearded, only decent looking mountain climber. A young actor (played with the most annoying affectation by Paul Dano) is running away from his early success as a big budget superhero named Mr. Q, and I couldn’t help but have posttraumatic flashbacks to all the things I disliked about Inarritu’s Birdman—another film, an Oscar winner like Sorrentino’s The Great Beauty, that seemed to fool audiences into buying its whiny, cranky, glib perspectives on life, culture, and the arts as worthwhile intellectual rumination. “Blowhard” is a strong term, and yet it’s the first thing that springs to mind when I think of these hulking manifestos by filmmakers with lots of ambition, but not enough imagination to make their worldviews and their craft come together in harmony. Every scene, every shot in Youth is connected to some kind of generalized philosophy, or moral, or life lesson. It’s like every childless uncle in the world helped to write the script in hopes of someone young taking heed of their advice.',
      'Sorrentino’s style actually is interesting. His slow moving camera work, eye for black comedy, and sentimental, dreamlike absurdity works well enough. Watching Michael Caine conduct a field of cows wearing cowbells is on the silly side, but it’s also in line with Sorrentino’s full throttle brand of emotional art house sensationalism, and these little nuggets of visual stimulation are at least something to stay awake for. There isn’t enough style to drown out the purposefully stringy narrative or the many other moments of unabashed pontification. And there are provocations, though they seem more like the firing of a flare gun in hopes of bringing attention back down to earth. Whether it’s the bull in a china shop cameo of a Jane Fonda, or someone jumping out of a window to their overtly dramatic death, Sorrentino throws haymakers hoping one will land, and that the impact will feel like substance. But the one “truth” I realized after taking in Youth was that I had wasted some of my own while watching it.'
    ],
    summary: 'A retired orchestra conductor is on holiday with his daughter and his film director best friend in the Alps when he receives an invitation from Queen Elizabeth II to perform for Prince Philip’s birthday.',
    image: retiredPost,
  },
  {
    id: getId(),
    slug: 'practical-effects',
    prevSlug: 'wasted-youth',
    nextSlug: 'han-solo-rules',
    title: 'The Magic Of Practical Effects',
    entries: [
    'Computer Generated Imagery (CGI) have been the norm in special effects for more than a generation now. Much has been made of the difference between this technology and the ‘old’ way of doing things: with practical, hand-made, effects. (Usually, by older film goers like me, grumbling about ‘kids these days’.) Rather than add to that argument, I’d like to start by saying that both techniques have their usefulness, and when blended together in just the right way, the effects can be quite, well, special. But all generational biases aside, for me, there is nothing like the textural quality of a good practical effect. It’s photographic. It’s solid. It exists in real space. It’s a kind of magician’s trick. Here are ten examples that impacted me growing up:',
    '1. “Alien” (1979) I was 8 when I saw it in the theater, way too young for such an intense film, and to this day I still have an unhealthy association between the smell of movie theater ketchup and the blood that sprayed from John Hurt’s chest. But I loved every terrifying moment. What grabbed me the most (and others) was the alien itself. Hatched from the mind of H R. Giger and fabricated by Carlo Rambaldi, it seemed designed to tap into our deepest fears. The retractable “penis mouth” was beyond me at that age but one of the things it did remind me of was a water-bug, those hideous giant cockroaches that are common in NYC, where I grew up. (They even fly sometimes if they really want to freak you out.) In my opinion, this is still the best alien design in film history.',
    '2. “The Empire Strikes Back” (1980) Yoda is one of my favorite puppets of all time. I love the design, the way it was lit. It truly looked like an actor, an old man and a wizened elf. Yes, if you look at it closely today, especially on Blu Ray, which is a friend to neither practical effects nor actors (you can see every pore), the piece does start to show its age. The movement is limited, the mouth doesn’t quite close right. Even so, I’ll take it over that little green computer blob featured in the prequels. (And we won’t even go into that light saber duel.) In my opinion, Yoda was not meant to be seen out of his environment, which was so much a part of him. Hard, polished surfaces didn’t seem right beneath his three-toed feet. Several artists were involved here, primarily Stuart Freeborn, with the input of muppet masters Frank Oz (who voiced and operated him) and Jim Henson.',
    '3. With “An American Werewolf In London” (1981), I really began to think about how special effects were made. I will never forget seeing footage of David Naughton, the Dr. Pepper guy, turning into a wolf, on TV. I had been a big fan of the original “Wolfman” from 1941, but this was a whole new ball game. Gone were the days of Lon Chaney Jr. slowly turning lupine through a series of dissolves, one yack hair at a time. Great though it was for its day, audiences of 1981 would have never accepted it. The ante had to be raised. And now we had the technology to do so. Rick Baker, a protege of the great Dick Smith, showed us for the first time, a man literally turning into a four-legged wolf-beast before our eyes.',
    '4. “E.T.” (1982) Can you fall in love with a latex puppet? Yes, you can. And I did. (And no, not in a “Lars And The Real Girl” way. I was TEN, for God’s sake!) E.T., the Extra Terrestrial, was designed and fabricated by Carlo Rambaldi, with a touch of Albert Einstein and Carl Sandberg in the eyes. Spielberg knew it was all in the eyes, the mirrors of the soul. And what a soul. And what a film. I know there are those who don’t like it, but there are also people who don’t like chocolate and I don’t understand them either. I cried when E.T. died, and I rejoiced when he came back to life again. (And I’m crying as I write this, with the theme running through my head.) This just may be the greatest practical achievement in cinema. It touched our hearts.',
    '5. “The Thing” (1982) I didn’t get around to this one till a few years after it came out, and it was probably for the best. Make-up artist Rob Bottin delivered the horrific, Lovecraftian creations for director John Carpenter’s remake of the the 1951 classic “The Thing From Another World”. This ‘thing’ could literally be anything it wanted to be, an alien that could absorb and then duplicate any other life form it came into contact with. The results were drippy, gooey, and truly disturbing. One quote from the film says it all. Upon seeing a disembodied head suddenly sprout spider legs and scurry across the floor, ‘Palmer’ expresses exactly what the audience is feeling: “You gotta be fucking kidding.”',
    '6. “Return Of The Jedi” (1983) Jabba The Hut. Space slug, crime boss and all around mensch, he was another brilliant creation from the Star Wars universe. Designed by Phil Tippett, it took at least three puppeteers to articulate those eyes, that slobbering mouth and that wonderfully disgusting tongue. (Poor Princess Leia!) Apparently, Lucas was never entirely happy with it. But it was certainly a damn-sight better than that free-floating phantasm that walked with Han Solo in the Star Wars ‘Special Edition’! (Can we officially ban this practice, by the way?) Jabba The Hutt was and still is “my kind of scum.”',
    '7. “Starman” (1984) You don’t hear much about this one but it’s worthy of mention. Another John Carpenter film, this “sci-fi/love story” is about another “bodiless” alien that comes to Earth and must find a suitable form. (Am I sensing a theme in Carpenter’s work?) So who does it choose? Jeff Bridges, of course! In this 80’s classic, the Godfather of movie makeup himself, Dick Smith, created the unique illusion of Bridges growing from a baby into a grown man in a matter of mere seconds. (My 30’s felt that way.) A brilliant concept, beautifully executed, I’ve always loved it.',
    '8. “Terminator” (1984) I was 13 when I saw that metallic skeleton rise from the flames, and I can still remember an audience member shouting “No fucking way!” with amused disbelief. (I wonder if he saw “The Thing”.) I felt the same way. And still do. A beautiful animatronic created by Stan Winston, it was like a robotic homage to the skeletons in “Jason And The Argonauts” (1963), another favorite of mine. This image has become iconic, but I’ll never forget seeing it in the theater for the first time.',
    '9. “Little Shop Of Horrors” (1986) And can we talk about Audrey II? Because it seems like one of the most overlooked practical designs in movie history. Created by puppeteer Lyle Conway and operated by a crew of up to 60, this “mean green mother from outer space” is one of the most brilliantly realized practical effects I’ve ever seen! The articulation was absolutely stunning. It’s almost hard to imagine all of this was achieved without CGI! (And if you’ve seen any footage of the original ending, it gets even more impressive.) It’s no surprise that muppet man Frank Oz directed this adaptation of the popular off-Broadway show, which in itself was a musical adaptation of a low-budget Roger Corman movie from 1960. (They are working on a remake, naturally. And it will probably be all CGI.)',
    '10. “Jurassic Park” (1993) To be honest, I am not a big fan of this film. The characters are annoying, the story is contrived, and I wish all of those wonderful special effects had been put in the service of a better film, because their power is undeniable. Here, for the first time, we were seeing living, breathing dinosaurs. This was actually achieved through a blend of live action, full-sized animatronics (courtesy of Dennis Muren) and CGI. It just goes to show you, it’s not the tool, but the artist, that makes it work. Knowing when to show the practical effect and when to use the CGI element was key. The results were breathtaking and truly frightening.',
    'I hope that there will always be a place for practical effects. Guillermo del Toro likes to use them, and blends them very well with CGI. The new Star Wars sequels promise to feature them also. As our world becomes more and more automated and digitized, it becomes important to hold on to the tactile, the organic, the humanistic. After all, have we learned nothing from “Terminator”?',
    'I know I’ve left a lot of great examples off my list. What are some of your favorites and why?'
    ],
    summary: 'Making the impossible posible',
    image: specialPost
  },
  {
    id: getId(),
    slug: 'han-solo-rules',
    prevSlug: 'practical-effects',
    title: 'Han Solo rules',
    entries: [
      'With the exception of swapping out the spirit of old Anakin Skywalker for the young version from Revenge of the Sith played by Hayden Christensen, perhaps the most egregious change in the Special Edition version of the Star Wars trilogy is making Greedo shoot first before being blasted into oblivion by Han Solo. George Lucas has a whole philosophy on why he made the change, but most fans are on the opposing side, and so is the law.',
      'A lawyer recently tossed up a post at a law blog (not Bob Law’s law blog) that says Han was fully justified in shooting Greedo first, essentially proving that there’s no reason to frown upon the smuggler for shooting the bounty hunter first.',
      'Clarifying that Greedo intended to kill Han Solo at the cantina anyway and that Han didn’t really have ample opportunity to retreat from the dangerous situation, here’s what the post over at Legal Geeks (via Vulture) says:',
      '“Without a doubt, having a blaster pointed directly at Han put his life in danger. Additionally, Greedo’s statement, “That’s the idea. I’ve been looking forward to this for a long time,” communicated Greedo’s intent to kill Han. Shooting first was seemingly the only way to prevent Greedo from using deadly force himself.',
      'Regarding the retreat issue, Han was already at gunpoint and cornered in the booth when Han shot Greedo. It is unlikely Han could have retreated with his back to the wall and in a seated position. Shooting his way out appeared to be his only option. Finally, reasonable belief wouldn’t be hard to prove. Han was in Mos Eisley Spaceport, a wretched hive of scum and villainy. Greedo had his weapon pointed at Han the entire time, with Han cornered in a booth. This should be sufficient to show the reasonableness of the threat to Han’s life.”',
      'If you want to dive a little more in depth about Han Solo shooting Greedo with all the laws and legal mumbo jumbo that explain this with specifics, you can check out the full post right here. But otherwise, you can rest easy that Han Solo isn’t just a senseless killer and George Lucas never should have changed that scene to begin with.',
      'However, am I the only one concerned with the fact that a lawyer took the time to examine this and write this post instead of doing some real legal work? I guess we all need hobbies, and this lawyer’s hobby is defending fictional court cases.'
    ],
    summary: 'You are our favourite smuggler of all the time Solo',
    image: hansoloPost
  }
];
