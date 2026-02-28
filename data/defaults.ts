export const defaultChurchInfo = {
  churchName: "Celestial Church of Christ",
  cathedralName: "Calgary Model Parish",
  motto: "\u201cIjo Mimo ti Kristi lati Orun wa\u201d \u2014 The Holy Church of Christ from Heaven. Join us in worship, prayer, and spiritual growth as we walk in the light of God.",
  subtitle: "True Worship | Soul Winning | Charity",
  street: "440 28 St NE",
  city: "Calgary",
  province: "AB",
  phone: "(587) 966-6261",
  email: "info@ccccalgarymodel.ca",
  facebookUrl: "https://www.facebook.com/profile.php?id=100081787865942",
  youtubeUrl: "https://www.youtube.com/@calgarymodelparish",
  instagramUrl: "https://www.instagram.com/calgarymodelparish",
  audiomackUrl: "https://audiomack.com/ccccalgaryparish",
};

export const defaultServiceTimes = {
  services: [
    { day: "Sunday", times: ["10:00 AM \u2013 1:00 PM \u2014 Main Sunday Service"] },
    { day: "Wednesday", times: ["6:00 PM \u2014 Mercy Day Service"] },
    { day: "Friday", times: ["8:00 PM \u2014 Special Service for Prophets, Prophetesses, Dreamers & Visioneers"] },
    { day: "1st Thursday", times: ["10:00 PM \u2013 1:00 AM \u2014 New Moon Service"] },
    { day: "Saturday", times: ["7:00 AM \u2013 7:30 AM \u2014 Sanctuary Cleaning"] },
  ],
  worshipAspects: [
    "White Sutana (Robes)",
    "Barefoot Entry",
    "Incense & Holy Water",
    "Seven Candles on the Altar",
  ],
};

export const defaultStats = {
  items: [
    { label: "Years of Faith", value: 79, suffix: "+" },
    { label: "Members", value: 100, suffix: "+" },
    { label: "Ministries", value: 8, suffix: "" },
    { label: "Weekly Services", value: 4, suffix: "" },
  ],
};

export const defaultAnnouncements = {
  items: [
    {
      id: "1",
      title: "Welcome to Calgary Model Parish",
      date: "February 28, 2026",
      type: "important",
      body: "Welcome to the official website of the Celestial Church of Christ, Calgary Model Parish. Stay connected with announcements, events, and service updates.",
    },
    {
      id: "2",
      title: "Monthly Thanksgiving \u2014 March 2026",
      date: "March 1, 2026",
      type: "event",
      body: "Our monthly thanksgiving service will hold on the first Sunday of March. Please come with your thanksgiving offerings.",
    },
    {
      id: "3",
      title: "New Moon Service \u2014 March",
      date: "March 5, 2026",
      type: "event",
      body: "The New Moon Service for March will hold on Thursday, March 5th. All prophets, prophetesses, dreamers, and visioneers are especially invited.",
    },
  ],
};

export const defaultAbout = {
  beliefs: [
    {
      title: "The Holy Bible",
      description: "We believe in the Holy Bible as the inspired and infallible Word of God, the foundation of our faith and the guide for all aspects of Christian living.",
    },
    {
      title: "Prayer & Prophecy",
      description: "The Celestial Church of Christ is guided by the Holy Spirit through prayer, visions, and divine prophecy as revealed to our members.",
    },
    {
      title: "Holy Sacraments",
      description: "We observe the sacraments of Baptism by immersion, Holy Communion, and the washing of feet as commanded by our Lord Jesus Christ.",
    },
    {
      title: "White Garment (Sutana)",
      description: "Members worship in white garments symbolising purity, holiness, and our heavenly citizenship, as revealed by divine instruction.",
    },
  ],
  historyParagraphs: [
    "The Celestial Church of Christ (CCC) was founded on 29 September 1947 in Porto-Novo, Dahomey (now Republic of Benin) by the late Pastor-Founder, Rev. Samuel Bilewu Joseph Oshoffa, through divine revelation and the guidance of the Holy Spirit.",
    "Calgary Model Parish is a vibrant parish within the Diocese of Alberta, serving as a beacon of faith, prayer, and spiritual renewal for CCC members in Calgary and the surrounding communities.",
    "As a Celestial family in Calgary, we continue to proclaim the gospel of Jesus Christ, worship in the power of the Holy Spirit, and extend the love of God to our community and beyond.",
  ],
  leadership: [
    { id: "1", name: "Shepherd-in-Charge", title: "Shepherd-in-Charge \u2014 Calgary Model Parish", bio: "Leading the Calgary Model Parish with divine guidance, pastoral care, and an unwavering commitment to the spiritual growth of all members.", photo: "" },
    { id: "2", name: "Church Secretary", title: "Church Secretary", bio: "Managing parish administration, communications, and record-keeping to ensure the smooth operation of Calgary Model Parish.", photo: "" },
    { id: "3", name: "Mother-in-Celestial", title: "Mother-in-Celestial", bio: "Guiding the women's fellowship, prayer ministries, and welfare activities with love and spiritual wisdom.", photo: "" },
  ],
};

export const defaultCharacterOfWeek = {
  name: "Onesimus",
  title: "The Faithful Servant",
  verse: "Philemon 1:10-11",
  description:
    "Once a runaway slave, Onesimus became a faithful servant of Christ through Paul's ministry. His transformation shows that no one is beyond God's redemptive power.",
  imageUrl: "",
};

export const defaultMinistries = {
  items: [
    { name: "Men's Fellowship", description: "Brotherhood in Christ \u2014 men gathering for prayer, Bible study, and mutual support. Building godly men who lead their families and serve the church.", leader: "Men's Leader", icon: "shield" },
    { name: "Women's Fellowship (Mothers-in-Celestial)", description: "A powerful ministry of women united in prayer, welfare, and spiritual nurturing. The Mothers-in-Celestial guide and support the entire parish family.", leader: "Mother-in-Celestial", icon: "heart" },
    { name: "Youth Ministry", description: "Empowering young people ages 13\u201330 through fellowship, leadership training, outreach, and spiritual development. The future of the church.", leader: "Youth Leader", icon: "star" },
    { name: "Children's Ministry", description: "Nurturing the youngest members of our church through age-appropriate Bible lessons, songs, and activities. Training children in the way of the Lord.", leader: "Children's Coordinator", icon: "book" },
    { name: "Choir & Music Ministry", description: "Leading the congregation in praise and worship through hymns, celestial songs, and spiritual choruses. Music that lifts the soul to heaven.", leader: "Choir Director", icon: "music" },
    { name: "Ushering Ministry", description: "Welcoming worshippers with warmth and maintaining order during services. The first point of contact for visitors and members alike.", leader: "Head Usher", icon: "users" },
    { name: "Welfare & Outreach", description: "Caring for the needy within and outside the church. Coordinating food drives, hospital visits, and community assistance programs.", leader: "Welfare Committee", icon: "heart" },
    { name: "Prayer Warriors", description: "A dedicated team of intercessors who pray for the church, its members, and all submitted prayer requests. Available for special prayer sessions.", leader: "Prayer Coordinator", icon: "shield" },
  ],
};
