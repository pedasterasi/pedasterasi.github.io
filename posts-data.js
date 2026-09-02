/*
  Add new notes at the TOP of this list. Copy an existing post, give it a new
  slug, then change the words. The homepage and article page update on their own.
*/
const posts = [
  {
    slug: "starting-somewhere",
    date: "2026-09-02",
    dateLabel: "02 Sep 2026",
    tags: ["Starting out", "Devlog"],
    title: "Starting somewhere: why I’m making games in public",
    summary: "Every game begins a little messy. This is the first note from my journey of learning by making.",
    cover: "one", // Optional image: "images/my-picture.jpg",
    content: [
      { type: "p", text: "Every game starts in a slightly awkward place: a folder with too many test scenes, a character that slides when it should walk, and an idea that is clearer in feeling than in words. This is mine." },
      { type: "p", text: "I’m making this blog to remember the process as it happens. I don’t want to wait until everything looks finished before sharing it. The small wins, confusing bugs, and half-formed ideas are part of the story too." },
      { type: "quote", text: "I want to make things small enough to finish, strange enough to remember, and honest enough to learn from." },
      { type: "heading", text: "What I hope to share" },
      { type: "p", text: "Some notes will be about game development. Others will be about things I’m learning from books, other games, or a day spent trying to solve one tiny problem. The important thing is that they are real notes from the work." },
      { type: "p", text: "For now, I’m keeping the goal simple: make the next version a little more playable than the last one, then write down what it taught me." }
    ]
  },
  {
    slug: "learning-to-finish",
    date: "2026-08-28",
    dateLabel: "28 Aug 2026",
    tags: ["Learning", "Small projects"],
    title: "Learning to finish small things",
    summary: "A reminder to make tiny projects complete before chasing the next exciting idea.",
    cover: "two", // Optional image: "images/my-picture.jpg",
    content: [
      { type: "p", text: "Starting is easy when an idea feels exciting. The harder part is staying with it once it becomes ordinary work: moving a button, fixing a small bug, or deciding when a detail is good enough." },
      { type: "p", text: "I’m trying to make smaller promises to myself. One room instead of a whole world. One good interaction instead of ten systems. Something I can actually show at the end of a week." },
      { type: "heading", text: "Small is not the same as unimportant" },
      { type: "p", text: "A short project still has a beginning, a middle, and an ending. It lets me experience the full loop: an idea becomes a thing, someone can try it, and I can see what to improve next time." },
      { type: "p", text: "Finishing does not mean perfect. It only means giving an idea the chance to become real." }
    ]
  },
  {
    slug: "movement-feel",
    date: "2026-08-22",
    dateLabel: "22 Aug 2026",
    tags: ["Game dev", "Unity"],
    title: "Making movement feel good",
    summary: "A few early thoughts on why the way a character moves matters more than I expected.",
    cover: "three", // Optional image: "images/my-picture.jpg",
    content: [
      { type: "p", text: "I used to think movement was just a basic thing to get working. Press a button, go left or right, jump. But a character can move correctly and still feel stiff, slow, or strangely disconnected." },
      { type: "p", text: "Now I’m paying attention to the little things: how quickly movement begins, how gently it stops, and what happens when a character lands. These details are quiet, but they change the whole feeling of a game." },
      { type: "heading", text: "Trying, then watching" },
      { type: "p", text: "The best test is often just playing the same five seconds again and again. I change one small value, move around, and ask a very simple question: does this feel better?" },
      { type: "p", text: "It is a slow way to learn, but it makes the work feel more alive." }
    ]
  },
  {
    slug: "making-a-devlog",
    date: "2026-09-02",
    dateLabel: "02 Sept 2026",
    tags: ["Reflection", "Devlog"],
    title: "Making my first study and dev log",
    summary: "Writing down the small changes helps me see how far an idea has really come.",
    cover: "four", // Optional image: "images/my-picture.jpg",
    content: [
      { type: "p", text: "When I look at a project every day, it can feel like nothing is changing. A devlog gives me a way to look back and notice the things I would otherwise forget: the first working jump, a better colour choice, or a problem that took two days to solve." },
      { type: "p", text: "It is not a report card. It is more like leaving small trail markers for myself." },
      { type: "heading", text: "A place to be honest" },
      { type: "p", text: "I want these notes to include the awkward parts too. The ideas that did not work, the time I changed direction, and the days when the best thing I did was take a break and come back with fresh eyes." },
      { type: "p", text: "Making things is easier when I can see that every step, even the messy ones, is still a step." }
    ]
  }
];
