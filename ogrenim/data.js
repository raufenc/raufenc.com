const LESSONS = [
  {
    id: 'peygamber-efendimizin-cocuklugu',
    title: 'Peygamber Efendimiz (sallallahu aleyhi ve sellem)\'in Çocukluğu',
    description: 'Peygamber Efendimiz\'in doğumu, süt annesi Halime\'ye verilmesi ve çocukluk yılları.',
    duration: '40 dk',
    thumbnail: 'https://picsum.photos/seed/mecca/800/600',
    preTest: [
      {
        id: 'q1',
        text: 'Peygamber Efendimiz (sallallahu aleyhi ve sellem) hangi yılda doğmuştur?',
        options: ['570', '571', '610', '632'],
        correctAnswerIndex: 1,
      },
      {
        id: 'q2',
        text: 'Peygamber Efendimiz\'in (sallallahu aleyhi ve sellem) süt annesinin adı nedir?',
        options: ['Amine', 'Hatice', 'Halime', 'Fatıma'],
        correctAnswerIndex: 2,
      },
      {
        id: 'q3',
        text: 'Peygamber Efendimiz (sallallahu aleyhi ve sellem) kaç yaşına kadar süt annesinin yanında kalmıştır?',
        options: ['2', '4', '6', '8'],
        correctAnswerIndex: 1,
      }
    ],
    content: [
      {
        id: 'c1',
        title: 'Kutlu Doğum',
        type: 'video',
        contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        text: 'Peygamber Efendimiz (sallallahu aleyhi ve sellem) 571 yılında Mekke\'de dünyaya geldi.'
      },
      {
        id: 'c2',
        title: 'Süt Anneye Verilmesi',
        type: 'image-swipe',
        images: [
          'https://picsum.photos/seed/desert1/800/600',
          'https://picsum.photos/seed/desert2/800/600',
          'https://picsum.photos/seed/desert3/800/600'
        ],
        text: 'Mekke\'nin havası sıcak olduğu için bebekler çöldeki süt annelere verilirdi. Efendimiz (sallallahu aleyhi ve sellem) de Halime annemize verildi.'
      },
      {
        id: 'c3',
        title: 'Çocukluk Yılları',
        type: 'audio',
        contentUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        text: 'Efendimiz (sallallahu aleyhi ve sellem) 4 yaşına kadar süt annesi Halime\'nin yanında kaldı. Daha sonra öz annesi Amine\'ye teslim edildi.'
      }
    ],
    postTest: [
      {
        id: 'q1',
        text: 'Peygamber Efendimiz (sallallahu aleyhi ve sellem) hangi yılda doğmuştur?',
        options: ['570', '571', '610', '632'],
        correctAnswerIndex: 1,
      },
      {
        id: 'q2',
        text: 'Peygamber Efendimiz\'in (sallallahu aleyhi ve sellem) süt annesinin adı nedir?',
        options: ['Amine', 'Hatice', 'Halime', 'Fatıma'],
        correctAnswerIndex: 2,
      },
      {
        id: 'q3',
        text: 'Peygamber Efendimiz (sallallahu aleyhi ve sellem) kaç yaşına kadar süt annesinin yanında kalmıştır?',
        options: ['2', '4', '6', '8'],
        correctAnswerIndex: 1,
      },
      {
        id: 'q4',
        text: 'Peygamber Efendimiz\'in (sallallahu aleyhi ve sellem) annesinin adı nedir?',
        options: ['Amine', 'Hatice', 'Halime', 'Fatıma'],
        correctAnswerIndex: 0,
      }
    ]
  }
];

const FIREBASE_CONFIG = {
  projectId: "gen-lang-client-0344558124",
  appId: "1:1036430892390:web:99d3ed231e88145fcabca7",
  apiKey: "AIzaSyCdc8ZnIm_B5H3GIobJiy2VoZHBVA7nfHo",
  authDomain: "gen-lang-client-0344558124.firebaseapp.com",
  storageBucket: "gen-lang-client-0344558124.firebasestorage.app",
  messagingSenderId: "1036430892390"
};

const FIRESTORE_DB_ID = "ai-studio-ac5d1b43-b908-42e1-8974-579e8d9328bb";
