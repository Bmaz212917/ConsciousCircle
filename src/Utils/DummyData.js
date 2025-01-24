export const DummyEvent = [
  {
    title: 'Cacao Ceremony & Heart-Opening Circle',
    location: 'The Conscious Loft, 456 Bliss Boulevard, Washington',
    date: new Date(),
    type: 'PREMIUM',
    numOfMembers: 20,
    image: require('../assets/images/Himalaya.jpg'),
    attendees: [
      {id: 1, image: 'https://picsum.photos/200'},
      {id: 2, image: 'https://picsum.photos/200'},
      {id: 3, image: 'https://picsum.photos/200'},
      {id: 4, image: 'https://picsum.photos/200'},
    ],
    description:
      'Join us for a nurturing ceremonial cacao experience. Well share intentions, sip on a rich cacao brew, and connect through guided meditation. Ideal for anyone seeking a warm, heart-centered gathering focused on emotional healing and authentic connection.',
  },
  {
    title: 'Chakra Sound Bath',
    location: 'Serene Mind Studios, 123 Harmony Lane, Washington',
    date: new Date(),
    type: 'FREE',
    numOfMembers: 20,
    image: require('../assets/images/chakra.jpg'),
    attendees: [
      {id: 1, image: 'https://picsum.photos/200'},
      {id: 2, image: 'https://picsum.photos/200'},
      {id: 3, image: 'https://picsum.photos/200'},
      {id: 4, image: 'https://picsum.photos/200'},
    ],
    description:
      'Immerse yourself in the healing tones of singing bowls and other resonant instruments, designed to balance and align the body’s energy centers. This meditative experience gently guides you into a state of deep relaxation and emotional release.',
  },
  {
    title: 'Restorative Yoga & Guided Meditation',
    location: 'Inner Balance Yoga Studio, 789 Zen Street, Washington',
    date: new Date(),
    type: 'FREE',
    numOfMembers: 20,
    image: require('../assets/images/yog.jpg'),
    attendees: [
      {id: 1, image: 'https://picsum.photos/200'},
      {id: 2, image: 'https://picsum.photos/200'},
      {id: 3, image: 'https://picsum.photos/200'},
      {id: 4, image: 'https://picsum.photos/200'},
    ],
    description:
      'Upwind in a calming yoga session emphasizing gentle postures and breath awareness. This class concludes with a guided meditation designed to nurture inner peace and mental clarity—perfect for beginners and experienced yogis alike.',
  },
  {
    title: 'Sacred Breathwork Journey',
    location: 'The Breathing Room, 234 Harmony Heights, Washington',
    date: new Date(),
    type: 'FREE',
    numOfMembers: 20,
    image: require('../assets/images/yoga.png'),
    attendees: [
      {id: 1, image: 'https://picsum.photos/200'},
      {id: 2, image: 'https://picsum.photos/200'},
      {id: 3, image: 'https://picsum.photos/200'},
      {id: 4, image: 'https://picsum.photos/200'},
    ],
    description:
      'Experience a profound shift in consciousness through guided breathwork techniques. This workshop helps release emotional blockages, increase self-awareness, and invite a powerful sense of liberation.',
  },
];

export const DummyCoach = [
  {
    title: 'International Band Music',
    location: 'Inner Balance Yoga Studio, 789 Zen Street, Washington',
    date: new Date(),
    type: 'FREE',
    availableCount: 20,
    image: require('../assets/images/yoga.png'),
    coach: {
      name: 'Serena Siong',
      category: 'Emotional Well-Being & Relationship Coaching',
      image: require('../assets/images/coachFemale.png'),
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Reconnecting with yourself',
    location: 'The Breathing Room, 234 Harmony Heights, Washington DC',
    date: new Date(),
    type: 'FREE',
    isBooked: true,
    availableCount: 20,
    image: require('../assets/images/yog.jpg'),
    coach: {
      name: 'Kerry Davies',
      category: 'Mindfulness & Meditation Coaching',
      image: require('../assets/images/profile.png'),
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];
