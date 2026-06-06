/**
 * Castory Mock Data — single source of truth
 * @see docs/DECISIONS.md ADR-004
 */
(function (global) {
  const HOUR = 3600000;
  const DAY = 86400000;
  const NOW = Date.now();

  function ago(ms) {
    return NOW - ms;
  }

  var DEMO_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  var DEMO_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  function episode(partial) {
    var mediaType = partial.mediaType || 'video';
    var defaultUrl = mediaType === 'audio' ? DEMO_AUDIO : DEMO_VIDEO;
    return {
      mediaType: 'video',
      viewsCount: 0,
      podcast: '',
      description: '',
      ...partial,
      mediaUrl: partial.mediaUrl || defaultUrl,
      date: global.Castory?.formatRelativeDate
        ? global.Castory.formatRelativeDate(partial.publishedAt)
        : partial.date || '',
    };
  }

  const CASTORY_MOCK = {
    brand: 'Castory',
    tagline: 'Premium podcast streaming',

    categories: [
      'All',
      'Technology',
      'Business',
      'AI',
      'Marketing',
      'Startups',
      'Design',
      'Crypto',
      'Health',
      'Mindset',
    ],

    audioFilterCategories: [
      'All',
      'Technology',
      'Business',
      'Health',
      'Mindset',
      'Marketing',
      'Crypto',
      'Design',
      'Stories',
    ],

    nav: [
      { label: 'Home', href: 'index.html', icon: 'house', route: 'home' },
      { label: 'Explore', href: '../explore/index.html', icon: 'compass', route: 'explore' },
      { label: 'Trending', href: '../trending-video/index.html', icon: 'fire', route: 'trending' },
      { label: 'New Episodes', href: '../new-episodes/index.html', icon: 'sparkles', route: 'new' },
      { label: 'Library', href: '../library/index.html', icon: 'bookmark', route: 'library' },
      { label: 'Profile', href: '../profile/index.html', icon: 'user', route: 'profile' },
    ],

    mobileNav: [
      { label: 'Home', href: '../home/index.html', icon: '🏠', route: 'home' },
      { label: 'Trending', href: '../trending-video/index.html', icon: '🔥', route: 'trending' },
      { label: 'Library', href: '../library/index.html', icon: '📚', route: 'library' },
      { label: 'Alerts', href: '#', icon: '🔔', route: 'notifications' },
      { label: 'Profile', href: '../profile/index.html', icon: '👤', route: 'profile' },
    ],

    notifications: [
      { id: 1, title: 'Sarah Chen published a new AI episode', timeAgo: '2 hrs ago', read: false },
      { id: 2, title: 'Your playlist "Morning Focus" was updated', timeAgo: '5 hrs ago', read: false },
      { id: 3, title: 'Weekly listening report is ready', timeAgo: '1 day ago', read: true },
      { id: 4, title: 'Alex Morgan started following you', timeAgo: '2 days ago', read: true },
    ],

    user: {
      name: 'Emma Watson',
      username: '@emmaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      badge: 'Premium Member',
      isPremium: true,
      verified: true,
      following: 128,
      followers: 2400,
      episodesCount: 342,
      listeningHours: 128,
      savedEpisodes: 24,
      playlistsCount: 12,
      bio: 'Podcast enthusiast, creator economy researcher, and lifelong learner. Sharing insights on AI, startups, and digital storytelling.',
      location: 'London, UK',
      website: 'castory.app/emmaw',
      joinDate: 'March 2023',
      cover: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1600',
    },

    heroSlides: [
      {
        episodeId: 14,
        title: 'Future of Artificial Intelligence',
        category: 'Technology',
        description: 'Discover how AI is reshaping business, creativity and the future of humanity.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600',
      },
      {
        episodeId: 15,
        title: 'The Creator Economy Revolution',
        category: 'Business',
        description: 'How creators are building million dollar businesses.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600',
      },
      {
        episodeId: 3,
        title: 'Building Global SaaS Products',
        category: 'Startups',
        description: 'Learn the frameworks behind the fastest growing startups.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600',
      },
    ],

    routes: {
      hub: '../index.html',
      home: '../home/index.html',
      explore: '../explore/index.html',
      trendingVideo: '../trending-video/index.html',
      trendingAudio: '../trending-audio/index.html',
      newEpisodes: '../new-episodes/index.html',
      library: '../library/index.html',
      profile: '../profile/index.html',
      episodeDetailAudio: '../episode-detail/audio/index.html',
      episodeDetailVideo: '../episode-detail/video/index.html',
      episodeDetailMobile: '../episode-detail/mobile/index.html',
    },

    exploreHeroSlides: [
      {
        title: 'Discover New Voices',
        description: 'Explore emerging podcasters, fresh perspectives, and stories shaping the creator economy.',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900',
        creators: [1, 2, 3, 4],
      },
      {
        title: 'Find Your Next Favorite Show',
        description: 'Curated picks across AI, startups, wellness, and leadership — updated daily.',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900',
        creators: [2, 4, 1],
      },
      {
        title: 'Creator Economy Insights',
        description: 'Learn how top creators build audiences, monetize content, and scale globally.',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900',
        creators: [1, 3, 2],
      },
    ],

    trendingTopicsExplore: [
      { id: 'ai', title: 'AI', episodeCount: 342, icon: '🤖', filterCategory: 'AI', gradient: 'linear-gradient(135deg, #7C3AED, #3B82F6)' },
      { id: 'startups', title: 'Startups', episodeCount: 218, icon: '🚀', filterCategory: 'Startups', gradient: 'linear-gradient(135deg, #9333EA, #EC4899)' },
      { id: 'creator-economy', title: 'Creator Economy', episodeCount: 186, icon: '💡', filterCategory: 'Business', gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)' },
      { id: 'productivity', title: 'Productivity', episodeCount: 154, icon: '⚡', filterCategory: 'Mindset', gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)' },
      { id: 'finance', title: 'Finance', episodeCount: 129, icon: '💰', filterCategory: 'Business', gradient: 'linear-gradient(135deg, #10B981, #3B82F6)' },
      { id: 'wellness', title: 'Wellness', episodeCount: 97, icon: '🧘', filterCategory: 'Health', gradient: 'linear-gradient(135deg, #22C55E, #14B8A6)' },
      { id: 'marketing', title: 'Marketing', episodeCount: 203, icon: '📣', filterCategory: 'Marketing', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
      { id: 'leadership', title: 'Leadership', episodeCount: 112, icon: '👑', filterCategory: 'Business', gradient: 'linear-gradient(135deg, #6366F1, #A855F7)' },
    ],

    tagCloud: [
      'Artificial Intelligence', 'Startup Funding', 'Web3', 'Product Design',
      'Remote Work', 'Creator Tools', 'Mindfulness', 'Growth Hacking',
      'SaaS', 'Personal Brand', 'Investing', 'Storytelling',
    ],

    discoveryStats: [
      { label: 'Episodes Discovered', value: '12.4K', trend: '+8.2%', icon: '🎧' },
      { label: 'New Creators', value: '842', trend: '+12%', icon: '✨' },
      { label: 'Topics Trending', value: '48', trend: '+5', icon: '🔥' },
    ],

    mostFollowedTopics: [
      { name: 'Artificial Intelligence', percent: 92 },
      { name: 'Startups & SaaS', percent: 78 },
      { name: 'Creator Economy', percent: 65 },
      { name: 'Marketing', percent: 54 },
      { name: 'Wellness', percent: 41 },
    ],

    popularCreators: [
      { id: 1, name: 'Alex Morgan', followers: '1.5M', category: 'Business', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', verified: true },
      { id: 2, name: 'Sarah Chen', followers: '950K', category: 'AI', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', verified: true },
      { id: 3, name: 'John Smith', followers: '10K', category: 'Technology', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', verified: false },
      { id: 4, name: 'Emily White', followers: '8.5K', category: 'Design', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300', verified: true },
      { id: 5, name: 'David Ross', followers: '420K', category: 'Startups', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300', verified: true },
      { id: 6, name: 'Jamie Clear', followers: '280K', category: 'Health', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300', verified: false },
    ],

    creators: [
      { id: 1, name: 'Alex Morgan', followers: '1.5M', followersCount: 1500000, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', category: 'Business', verified: true },
      { id: 2, name: 'Sarah Chen', followers: '950K', followersCount: 950000, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', category: 'AI', verified: true },
      { id: 3, name: 'John Smith', followers: '10k', followersCount: 10000, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', category: 'Technology', verified: false },
      { id: 4, name: 'Emily White', followers: '8.5k', followersCount: 8500, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300', category: 'Design', verified: true },
    ],

    topics: [
      '# Artificial Intelligence',
      '# Startup Funding',
      '# Web3',
      '# Product Design',
    ],

    episodes: [
      episode({ id: 1, title: 'The Startup Playbook', creator: 'John Doe', verified: true, category: 'Business', mediaType: 'video', views: '2.1M', viewsCount: 2100000, publishedAt: ago(6 * HOUR), duration: '52:10', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800' }),
      episode({ id: 2, title: 'AI Revolution', creator: 'Lex Friedman', verified: true, category: 'AI', mediaType: 'video', views: '785K', viewsCount: 785000, publishedAt: ago(1 * DAY), duration: '45:18', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800' }),
      episode({ id: 3, title: 'Future of SaaS Products', creator: 'Emma Watson', verified: false, category: 'Technology', mediaType: 'video', views: '1.2M', viewsCount: 1200000, publishedAt: ago(2 * DAY), duration: '1:04:20', thumbnail: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800' }),
      episode({ id: 4, title: 'Marketing in 2026', creator: 'Gary Vee', verified: true, category: 'Marketing', mediaType: 'video', views: '500K', viewsCount: 500000, publishedAt: ago(3 * DAY), duration: '39:12', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800' }),
      episode({ id: 5, title: 'Design Thinking', creator: 'Alice Johnson', verified: false, category: 'Design', mediaType: 'video', views: '300K', viewsCount: 300000, publishedAt: ago(5 * DAY), duration: '50:30', thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800' }),
      episode({ id: 6, title: 'Crypto Trends', creator: 'Chris Parker', verified: true, category: 'Crypto', mediaType: 'video', views: '1.5M', viewsCount: 1500000, publishedAt: ago(6 * HOUR), duration: '42:05', thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800' }),
      episode({ id: 7, title: 'AI & Startups', creator: 'Sarah Chen', verified: true, category: 'Startups', mediaType: 'video', views: '900K', viewsCount: 900000, publishedAt: ago(1 * DAY), duration: '48:20', thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800' }),
      episode({ id: 8, title: 'Blockchain Basics', creator: 'Vitalik B.', verified: true, category: 'Crypto', mediaType: 'audio', views: '750K', viewsCount: 750000, publishedAt: ago(3 * DAY), duration: '35:50', thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800' }),
      episode({ id: 9, title: 'Public Speaking Mastery', creator: 'Emma Watson', verified: false, category: 'Business', mediaType: 'audio', views: '420K', viewsCount: 420000, publishedAt: ago(2 * DAY), duration: '46:12', thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800' }),
      episode({ id: 10, title: 'Designing the Future', creator: 'Jony Ive', verified: true, category: 'Design', mediaType: 'video', views: '680K', viewsCount: 680000, publishedAt: ago(1 * DAY), duration: '55:00', thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800' }),
      episode({ id: 11, title: 'Marketing AI Tools', creator: 'Sarah Lee', verified: false, category: 'Marketing', mediaType: 'audio', views: '320K', viewsCount: 320000, publishedAt: ago(6 * HOUR), duration: '40:30', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800' }),
      episode({ id: 12, title: 'Startup Case Studies', creator: 'Ben Horowitz', verified: true, category: 'Startups', mediaType: 'video', views: '890K', viewsCount: 890000, publishedAt: ago(3 * DAY), duration: '58:45', thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800' }),
      episode({ id: 13, title: 'Deep Learning Explained', creator: 'Andrew Ng', verified: true, category: 'AI', mediaType: 'audio', views: '1.8M', viewsCount: 1800000, publishedAt: ago(1 * DAY), duration: '1:10:00', thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', podcast: 'AI Insights', description: 'Exploring neural networks and modern ML.' }),
      episode({ id: 14, title: 'The Future of Artificial Intelligence', creator: 'Sarah Chen', verified: true, category: 'AI', mediaType: 'audio', views: '2.1M', viewsCount: 2100000, publishedAt: ago(2 * HOUR), duration: '52:45', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500', podcast: 'AI Insights', description: 'Exploring the next decade of machine intelligence.' }),
      episode({ id: 15, title: 'Building Billion Dollar Startups', creator: 'David Ross', verified: true, category: 'Business', mediaType: 'audio', views: '980K', viewsCount: 980000, publishedAt: ago(1 * DAY), duration: '48:12', thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500', podcast: 'Founders Unplugged', description: 'Lessons from founders scaling globally.' }),
      episode({ id: 16, title: 'Mindset Mastery', creator: 'Alex Reed', verified: false, category: 'Mindset', mediaType: 'audio', views: '640K', viewsCount: 640000, publishedAt: ago(2 * DAY), duration: '41:30', thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500', podcast: 'The Growth Mindset', description: 'Developing high-performance habits.' }),
      episode({ id: 17, title: 'Crypto & Web3 Explained', creator: 'Chris Parker', verified: true, category: 'Crypto', mediaType: 'audio', views: '720K', viewsCount: 720000, publishedAt: ago(2 * DAY), duration: '39:18', thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500', podcast: 'Web3 Daily', description: 'The future of decentralized ecosystems.' }),
      episode({ id: 18, title: 'Marketing in the New Era', creator: 'Neil Harper', verified: true, category: 'Marketing', mediaType: 'audio', views: '550K', viewsCount: 550000, publishedAt: ago(3 * DAY), duration: '44:22', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500', podcast: 'Marketing School', description: 'AI, creators and modern growth channels.' }),
      episode({ id: 19, title: 'The Power of Storytelling', creator: 'Emma Blake', verified: true, category: 'Stories', mediaType: 'audio', views: '480K', viewsCount: 480000, publishedAt: ago(3 * DAY), duration: '55:04', thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500', podcast: 'Story Matters', description: 'Why stories influence human behavior.' }),
      episode({ id: 20, title: 'Scaling Remote Teams', creator: 'TechTalk', verified: true, category: 'Business', mediaType: 'audio', views: '210K', viewsCount: 210000, publishedAt: ago(2 * HOUR), duration: '30:00', thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600', podcast: 'TechTalk', description: 'Leadership strategies for distributed teams.' }),
      episode({ id: 21, title: 'Daily Habits for a Better Life', creator: 'Jamie Clear', verified: true, category: 'Health', mediaType: 'audio', views: '390K', viewsCount: 390000, publishedAt: ago(4 * DAY), duration: '38:20', thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500', podcast: 'Better Everyday', description: 'Small habits that compound into big results.' }),
      episode({ id: 22, title: 'Space: The Next Frontier', creator: 'Neil deGrasse Tyson', verified: true, category: 'Technology', mediaType: 'audio', views: '610K', viewsCount: 610000, publishedAt: ago(5 * DAY), duration: '57:30', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500', podcast: 'Space Tonight', description: 'Exploring humanity\'s future among the stars.' }),
    ],

    topPodcasts: [
      { rank: 1, name: 'The Daily Brief', followers: '8.2M followers', artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300' },
      { rank: 2, name: 'Huberman Lab', followers: '7.4M followers', artwork: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300' },
      { rank: 3, name: 'On Purpose', followers: '6.7M followers', artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300' },
      { rank: 4, name: 'The Tim Ferriss Show', followers: '5.9M followers', artwork: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=300' },
      { rank: 5, name: 'The Joe Rogan Experience', followers: '5.1M followers', artwork: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300' },
    ],

    library: {
      stats: [
        { icon: '🎧', value: '128h', label: 'Listening Time', trend: '+12%', trendUp: true },
        { icon: '▶', value: '42h', label: 'Watch Time', trend: '+8%', trendUp: true },
        { icon: '📚', value: '24', label: 'Saved Episodes', trend: '+3', trendUp: true },
        { icon: '⬇', value: '18', label: 'Downloads', trend: '+2', trendUp: true },
        { icon: '▣', value: '12', label: 'Playlists', trend: '0', trendUp: null },
        { icon: '★', value: '86%', label: 'Completion Rate', trend: '+4%', trendUp: true },
      ],

      continueListening: [
        { id: 14, title: 'The Future of Artificial Intelligence', podcast: 'AI Insights', creator: 'Sarah Chen', duration: '52:45', progress: 62, thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400' },
        { id: 13, title: 'Deep Learning Explained', podcast: 'AI Insights', creator: 'Andrew Ng', duration: '1:10:00', progress: 38, thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400' },
        { id: 15, title: 'Building Billion Dollar Startups', podcast: 'Founders Unplugged', creator: 'David Ross', duration: '48:12', progress: 74, thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400' },
        { id: 16, title: 'Mindset Mastery', podcast: 'The Growth Mindset', creator: 'Alex Reed', duration: '41:30', progress: 21, thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400' },
      ],

      continueWatching: [
        { id: 2, title: 'AI Revolution', creator: 'Lex Friedman', duration: '45:18', progress: 55, thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600' },
        { id: 3, title: 'Future of SaaS Products', creator: 'Emma Watson', duration: '1:04:20', progress: 32, thumbnail: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600' },
        { id: 7, title: 'AI & Startups', creator: 'Sarah Chen', duration: '48:20', progress: 68, thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600' },
        { id: 1, title: 'The Startup Playbook', creator: 'John Doe', duration: '52:10', progress: 12, thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600' },
      ],

      playlists: [
        { id: 1, name: 'Morning Focus', episodes: 24, updated: '2 days ago', covers: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200', 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200'] },
        { id: 2, name: 'Tech Deep Dives', episodes: 18, updated: '5 days ago', covers: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200', 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=200', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200'] },
        { id: 3, name: 'Creator Economy', episodes: 12, updated: '1 week ago', covers: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200'] },
        { id: 4, name: 'Weekend Listening', episodes: 31, updated: '3 days ago', covers: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200', 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=200', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200'] },
      ],

      defaultPlaylists: [
        { name: 'Morning Focus', episodeIds: [14, 13, 21] },
        { name: 'Tech Deep Dives', episodeIds: [2, 7, 12] },
        { name: 'Creator Economy', episodeIds: [15, 4, 9] },
        { name: 'Weekend Listening', episodeIds: [21, 16, 8] },
      ],

      downloaded: [
        { id: 21, title: 'Daily Habits for a Better Life', mediaType: 'audio', fileSize: '48 MB', duration: '38:20', label: 'Offline' },
        { id: 6, title: 'Crypto Trends', mediaType: 'video', fileSize: '320 MB', duration: '42:05', label: 'HD' },
        { id: 17, title: 'Crypto & Web3 Explained', mediaType: 'audio', fileSize: '52 MB', duration: '39:18', label: 'Offline' },
        { id: 12, title: 'Startup Case Studies', mediaType: 'video', fileSize: '410 MB', duration: '58:45', label: '4K' },
      ],

      savedForLater: [
        { id: 10, title: 'Designing the Future', creator: 'Jony Ive', mediaType: 'video', duration: '55:00', thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400' },
        { id: 19, title: 'The Power of Storytelling', creator: 'Emma Blake', mediaType: 'audio', duration: '55:04', thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400' },
        { id: 4, title: 'Marketing in 2026', creator: 'Gary Vee', mediaType: 'video', duration: '39:12', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400' },
      ],

      recentActivity: [
        { title: 'Finished "AI Revolution"', completion: 100, timeAgo: '2 hrs ago', type: 'complete' },
        { title: 'Added to Watch Later', completion: 0, timeAgo: '5 hrs ago', type: 'save' },
        { title: 'Downloaded "Daily Habits"', completion: 0, timeAgo: '1 day ago', type: 'download' },
        { title: 'Listening "Deep Learning Explained"', completion: 38, timeAgo: '1 day ago', type: 'progress' },
        { title: 'Created playlist "Morning Focus"', completion: 0, timeAgo: '2 days ago', type: 'playlist' },
      ],

      storage: {
        usedPercent: 68,
        usedLabel: '6.8 GB',
        totalLabel: '10 GB',
        breakdown: [
          { label: 'Audio', percent: 42, color: '#7C3AED' },
          { label: 'Video', percent: 48, color: '#3B82F6' },
          { label: 'Other', percent: 10, color: '#64748B' },
        ],
      },

      watchlistSummary: {
        saved: 24,
        unfinished: 8,
        newUploads: 5,
      },

      listeningInsights: {
        weeklyHours: [3.2, 4.1, 2.8, 5.4, 4.6, 6.2, 3.9],
        weekLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        topCategories: [
          { name: 'AI', hours: 12.4 },
          { name: 'Business', hours: 9.8 },
          { name: 'Technology', hours: 7.2 },
        ],
        topCreators: [
          { name: 'Sarah Chen', hours: 8.5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
          { name: 'Andrew Ng', hours: 6.2, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
          { name: 'Lex Friedman', hours: 5.1, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
        ],
      },
    },

    profile: {
      stats: [
        { label: 'Followers', value: '2.4K' },
        { label: 'Following', value: '128' },
        { label: 'Saved Episodes', value: '24' },
        { label: 'Playlists', value: '12' },
        { label: 'Listening Hours', value: '128h' },
      ],

      achievements: [
        { title: 'Early Adopter', desc: 'Joined in first 1000 users', icon: '🌱', theme: 'green' },
        { title: 'Power Listener', desc: '100+ hours listened', icon: '🎧', theme: 'purple' },
        { title: 'Curator', desc: 'Created 10+ playlists', icon: '⭐', theme: 'gold' },
        { title: 'Explorer', desc: '50+ categories explored', icon: '🧭', theme: 'blue' },
      ],

      listeningTimeline: [
        { title: 'Listened to "AI Revolution"', detail: 'Lex Friedman · 45 min', timeAgo: '2 hrs ago', icon: '🎧' },
        { title: 'Completed "Deep Learning Explained"', detail: 'Andrew Ng · 1h 10m', timeAgo: '5 hrs ago', icon: '✓' },
        { title: 'Saved "Marketing in 2026"', detail: 'Gary Vee', timeAgo: '1 day ago', icon: '🔖' },
        { title: 'Followed Sarah Chen', detail: 'Creator', timeAgo: '2 days ago', icon: '✦' },
        { title: 'Watched "Future of SaaS Products"', detail: '32% progress', timeAgo: '3 days ago', icon: '▶' },
      ],

      favoriteCreators: [
        { name: 'Sarah Chen', followers: '950K', category: 'AI', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', verified: true },
        { name: 'Alex Morgan', followers: '1.5M', category: 'Business', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', verified: true },
        { name: 'Andrew Ng', followers: '2.1M', category: 'AI', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', verified: true },
        { name: 'Lex Friedman', followers: '3.8M', category: 'Technology', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300', verified: true },
        { name: 'Emily White', followers: '8.5K', category: 'Design', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300', verified: true },
      ],

      watchHistory: [
        { title: 'AI Revolution', creator: 'Lex Friedman', duration: '45:18', progress: 100, thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400' },
        { title: 'Future of SaaS Products', creator: 'Emma Watson', duration: '1:04:20', progress: 32, thumbnail: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400' },
        { title: 'The Startup Playbook', creator: 'John Doe', duration: '52:10', progress: 78, thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400' },
      ],

      topCategories: [
        { name: 'AI', episodes: 45, gradient: 'linear-gradient(135deg, #7C3AED, #3B82F6)' },
        { name: 'Business', episodes: 38, gradient: 'linear-gradient(135deg, #9333EA, #EC4899)' },
        { name: 'Technology', episodes: 29, gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)' },
        { name: 'Startups', episodes: 22, gradient: 'linear-gradient(135deg, #10B981, #3B82F6)' },
      ],

      recentlyCompleted: [
        { title: 'AI Revolution', creator: 'Lex Friedman', completedAgo: '2 hrs ago', mediaType: 'video', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300' },
        { title: 'Deep Learning Explained', creator: 'Andrew Ng', completedAgo: '5 hrs ago', mediaType: 'audio', thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300' },
        { title: 'Public Speaking Mastery', creator: 'Emma Watson', completedAgo: '2 days ago', mediaType: 'audio', thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300' },
      ],

      insights: {
        engagementRate: '4.2%',
        avgSession: '38 min',
        weeklyGrowth: [12, 18, 15, 22, 28, 24, 32, 29, 35, 38, 42, 45],
        monthLabels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      },

      followingSummary: {
        creators: 128,
        podcasts: 42,
        topics: 18,
      },

      accountStatus: {
        plan: 'Premium',
        status: 'Active',
        renewal: 'December 2026',
        memberSince: 'March 2023',
      },

      topInterests: [
        { name: 'Artificial Intelligence', percent: 88 },
        { name: 'Startup Culture', percent: 72 },
        { name: 'Product Design', percent: 58 },
        { name: 'Creator Economy', percent: 45 },
        { name: 'Mindfulness', percent: 32 },
      ],

      heatmapLevels: [
        1, 2, 3, 1, 0, 2, 1, 3, 2, 4, 1, 0,
        2, 3, 4, 2, 1, 3, 2, 1, 0, 2, 3, 1,
        1, 0, 2, 3, 4, 2, 1, 3, 2, 1, 0, 2,
        3, 2, 1, 4, 3, 2, 1, 0, 2, 3, 4, 2,
        2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 1,
        1, 2, 3, 2, 1, 0, 2, 3, 4, 2, 1, 3,
        0, 1, 2, 3, 2, 1, 0, 2, 3, 1, 2, 4,
      ],
    },

    episodeExtras: {
      14: {
        podcast: 'AI Insights',
        description: 'Exploring the next decade of machine intelligence — from large language models to autonomous agents and the ethical frameworks shaping our future.',
        chapters: [
          { time: '0:00', title: 'Introduction' },
          { time: '8:42', title: 'State of AI in 2026' },
          { time: '22:15', title: 'Enterprise Adoption' },
          { time: '38:50', title: 'Ethics & Regulation' },
          { time: '48:00', title: 'Q&A' },
        ],
        transcript: 'Welcome to AI Insights. Today we explore how machine intelligence is reshaping industries worldwide...',
      },
      2: {
        podcast: 'Lex Friedman Podcast',
        description: 'A deep conversation on artificial intelligence, consciousness, and the future of humanity with one of the most influential voices in tech.',
        chapters: [
          { time: '0:00', title: 'Opening' },
          { time: '5:30', title: 'AGI Timeline' },
          { time: '18:00', title: 'Robotics & Embodiment' },
          { time: '32:40', title: 'Philosophy of Mind' },
        ],
        transcript: '[00:00] Lex: Welcome back to the podcast. Today we discuss AI revolution...',
      },
    },

    defaultComments: [
      { author: 'Alex M.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', text: 'Incredible episode. The section on enterprise AI was eye-opening.', timeAgo: '2 hrs ago', likes: 24 },
      { author: 'Sarah K.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', text: 'Shared this with my whole team. More content like this please!', timeAgo: '5 hrs ago', likes: 18 },
      { author: 'Mike T.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', text: 'The ethics discussion at the end really made me think differently.', timeAgo: '1 day ago', likes: 11 },
    ],
  };

  // Hydrate display dates if utils loaded first
  CASTORY_MOCK.episodes.forEach(function (ep) {
    if (global.Castory && global.Castory.formatRelativeDate) {
      ep.date = global.Castory.formatRelativeDate(ep.publishedAt);
    } else if (!ep.date) {
      ep.date = 'Recently';
    }
  });

  CASTORY_MOCK.getVideoEpisodes = function () {
    return CASTORY_MOCK.episodes.filter(function (ep) { return ep.mediaType === 'video'; });
  };

  CASTORY_MOCK.getAudioEpisodes = function () {
    return CASTORY_MOCK.episodes.filter(function (ep) { return ep.mediaType === 'audio'; });
  };

  CASTORY_MOCK.getNewestEpisodes = function (limit) {
    return CASTORY_MOCK.episodes.slice().sort(function (a, b) {
      return b.publishedAt - a.publishedAt;
    }).slice(0, limit || 12);
  };

  CASTORY_MOCK.getRecommendedEpisodes = function (limit) {
    var mixed = CASTORY_MOCK.episodes.slice().sort(function (a, b) {
      return b.viewsCount - a.viewsCount;
    });
    return mixed.slice(0, limit || 8);
  };

  CASTORY_MOCK.getCreatorById = function (id) {
    return CASTORY_MOCK.creators.find(function (c) { return c.id === id; })
      || CASTORY_MOCK.popularCreators.find(function (c) { return c.id === id; });
  };

  CASTORY_MOCK.generateHeatmap = function (cols, rows) {
    var cells = [];
    var c = cols || 12;
    var r = rows || 7;
    for (var i = 0; i < c * r; i++) {
      cells.push(Math.floor(Math.random() * 5));
    }
    return { cols: c, rows: r, cells: cells };
  };

  CASTORY_MOCK.getEpisodeById = function (id) {
    var ep = CASTORY_MOCK.episodes.find(function (e) { return e.id === id; });
    if (!ep) return null;
    var extras = CASTORY_MOCK.episodeExtras[id] || {};
    return Object.assign({}, ep, extras, {
      podcast: extras.podcast || ep.podcast || ep.creator + ' Podcast',
      description: extras.description || ep.description || 'An engaging episode from the Castory catalog.',
      chapters: extras.chapters || [],
      transcript: extras.transcript || '',
      comments: extras.comments || CASTORY_MOCK.defaultComments,
    });
  };

  CASTORY_MOCK.getRelatedEpisodes = function (episode, limit) {
    if (!episode) return [];
    var cat = episode.category;
    return CASTORY_MOCK.episodes.filter(function (ep) {
      return ep.id !== episode.id && ep.mediaType === episode.mediaType;
    }).sort(function (a, b) {
      if (cat === a.category && cat !== b.category) return -1;
      if (cat === b.category && cat !== a.category) return 1;
      return b.viewsCount - a.viewsCount;
    }).slice(0, limit || 6);
  };

  CASTORY_MOCK.getEpisodeUrl = function (episode, prefix) {
    var p = prefix || '../';
    var path = episode.mediaType === 'audio'
      ? p + 'episode-detail/audio/index.html'
      : p + 'episode-detail/video/index.html';
    return path + '?id=' + episode.id;
  };

  global.CASTORY_MOCK = CASTORY_MOCK;
})(typeof window !== 'undefined' ? window : globalThis);
