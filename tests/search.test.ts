import search from '../src';

const input = [
  {
    id: 1,
    param1: 'lorem ipsum',
    param2: 'dolor',
    param4: true,
    param5: 14,
    param6: 1200
  },
  {
    id: 2,
    param1: 'lorem ipsum',
    param2: 'sit amet',
    param3: 'consectetur',
    param4: false,
    param5: 15,
    param6: 1300
  },
  {
    id: 3,
    param1: 'adipiscing',
    param2: 'elit sed do',
    param3: 'eiusmod',
    param4: true,
    param5: 14,
    param6: 1200
  },
  {
    id: 4,
    param1: 'lorem ipsum',
    param2: 'test',
    param3: 'lorem ipsum',
    param4: false,
    param5: 16,
    param6: 1400
  },
  {
    id: 5,
    param1: 'test',
    param2: 'toast',
    param3: 'lorem ipsum',
    param4: true,
    param5: 17,
    param6: 1500
  },
];

const gameList = [
  {
    id: "item-2",
    title: "Acron: Attack of the Squirrels!",
    author: "Resolution Games",
    description: "",
    categories: ["party-game", "action"],
    stations: ["Oculus"],
    tags: [
      "PVP",
      "COOP"
    ],
    maxPlayersOffline: 8,
    maxPlayersOnline: 0,
    flagFamilyFriendly: true,
  },
  {
    id: "item-3",
    title: "Angry Birds VR: Isle of Pigs",
    author: "Resolution Games",
    description: "",
    categories: ["puzzle"],
    stations: ["Oculus"],
    tags: [],
    maxPlayersOffline: 1,
    maxPlayersOnline: 0,
    flagFamilyFriendly: true,
  },
  {
    id: "item-5",
    title: "Echo Arena",
    author: "",
    description: "",
    categories: ["sport"],
    stations: ["Oculus"],
    tags: [],
    maxPlayersOffline: 1,
    maxPlayersOnline: 2,
    flagFamilyFriendly: true,
  },
  {
    id: "item-6",
    title: "Loco Dojo",
    author: "Make Real",
    description: "",
    categories: ["action"],
    stations: ["Oculus"],
    tags: [],
    maxPlayersOffline: 1,
    maxPlayersOnline: 2,
    flagFamilyFriendly: true,
  },
  {
    id: "item-9",
    title: "Puzzle Bobble 3D: Vacation Odyssey",
    author: "Survios, Taito Corporation",
    description: "",
    categories: ["puzzle"],
    stations: ["Oculus"],
    tags: [],
    maxPlayersOffline: 1,
    maxPlayersOnline: 2,
    flagFamilyFriendly: true,
  },
  {
    id: "item-10",
    title: "Ragnarock",
    author: "WanadevStudio",
    description: "",
    categories: ["rhythm"],
    stations: ["Oculus"],
    tags: [
      "Music"
    ],
    maxPlayersOffline: 1,
    maxPlayersOnline: 0,
    flagFamilyFriendly: true,
  },
  {
    id: "item-12",
    title: "Walkabout Mini Golf",
    author: "Mighty Coconut",
    description: "",
    categories: ["sport"],
    stations: ["Oculus"],
    tags: [
      "Golf",
      "PVP"
    ],
    maxPlayersOffline: 1,
    maxPlayersOnline: 2,
    flagFamilyFriendly: true,
  },
  {
    id: "item-13",
    title: "Zenith: The Last City",
    author: "Ramen VR",
    description: "",
    categories: ["action"],
    stations: ["Oculus"],
    tags: [
      "Open World"
    ],
    maxPlayersOffline: 1,
    maxPlayersOnline: 20,
    flagFamilyFriendly: false,
  },
];

describe("(search) [AND] (OR) VRMETAGAMES real case test", () => {

  test("(search) Empty Search with allowEmpty", () => {
    expect(
      search(gameList, [
        {
          search: '',
          searchParams: ['title', 'author', 'description'],
          logic: 'OR',
          stringLimit: 2,
          distance: -1
        },
        {
          search: [],
          searchParams: ['categories'],
          logic: 'OR',
        }
      ])
    ).toEqual(gameList);
  });

  test("Empty Search without allowEmpty", () => {
    expect(
      search(gameList, [
        {
          search: '',
          searchParams: ['title', 'author', 'description'],
          logic: 'OR',
          stringLimit: 2,
          distance: -1,
          allowEmpty: true
        },
        {
          search: [],
          searchParams: ['categories'],
          logic: 'OR',
          allowEmpty: true
        }
      ])
    ).toEqual([]);
  });


  test("Text Search (IMPORTANT distance: -1)", () => {
    expect(
      search(gameList, [
        {
          search: 'Wa',
          searchParams: ['title', 'author', 'description'],
          logic: 'OR',
          stringLimit: 2,
          distance: -1
        },
        {
          search: [],
          searchParams: ['categories'],
          logic: 'OR',
        }
      ])
    ).toEqual([
      {
        id: "item-10",
        title: "Ragnarock",
        author: "WanadevStudio",
        description: "",
        categories: ["rhythm"],
        stations: ["Oculus"],
        tags: [
          "Music"
        ],
        maxPlayersOffline: 1,
        maxPlayersOnline: 0,
        flagFamilyFriendly: true,
      },
      {
        id: "item-12",
        title: "Walkabout Mini Golf",
        author: "Mighty Coconut",
        description: "",
        categories: ["sport"],
        stations: ["Oculus"],
        tags: [
          "Golf",
          "PVP"
        ],
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
      },
    ]);
  });

  test("Single Category Search", () => {
    expect(
      search(gameList, [
        {
          search: '',
          searchParams: ['title', 'author', 'description'],
          logic: 'OR',
          stringLimit: 2,
          distance: -1
        },
        {
          search: ['sport'],
          searchParams: ['categories'],
          logic: 'OR',
        }
      ])
    ).toEqual([
      {
        id: "item-5",
        title: "Echo Arena",
        author: "",
        description: "",
        categories: ["sport"],
        stations: ["Oculus"],
        tags: [],
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
      },
      {
        id: "item-12",
        title: "Walkabout Mini Golf",
        author: "Mighty Coconut",
        description: "",
        categories: ["sport"],
        stations: ["Oculus"],
        tags: [
          "Golf",
          "PVP"
        ],
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
      }
    ]);
  });

  test("Multiple Category Search", () => {
    expect(
      search(gameList, [
        {
          search: '',
          searchParams: ['title', 'author', 'description'],
          logic: 'OR',
          stringLimit: 2,
          distance: -1
        },
        {
          search: ['party-game', 'sport'],
          searchParams: ['categories'],
          logic: 'OR',
        }
      ])
    ).toEqual([
      {
        id: "item-2",
        title: "Acron: Attack of the Squirrels!",
        author: "Resolution Games",
        description: "",
        categories: ["party-game", "action"],
        stations: ["Oculus"],
        tags: [
          "PVP",
          "COOP"
        ],
        maxPlayersOffline: 8,
        maxPlayersOnline: 0,
        flagFamilyFriendly: true,
      },
      {
        id: "item-5",
        title: "Echo Arena",
        author: "",
        description: "",
        categories: ["sport"],
        stations: ["Oculus"],
        tags: [],
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
      },
      {
        id: "item-12",
        title: "Walkabout Mini Golf",
        author: "Mighty Coconut",
        description: "",
        categories: ["sport"],
        stations: ["Oculus"],
        tags: [
          "Golf",
          "PVP"
        ],
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
      }
    ]);
  });

  test("(SPECIAL) [AND] Multiple Category Search WITH AND", () => {
    expect(
      search(gameList, [
        {
          search: '',
          searchParams: ['title', 'author', 'description'],
          logic: 'OR',
          stringLimit: 2,
          distance: -1
        },
        {
          search: ['party-game', 'action'],
          searchParams: ['categories'],
          logic: 'and',
        }
      ])
    ).toEqual([
      {
        id: "item-2",
        title: "Acron: Attack of the Squirrels!",
        author: "Resolution Games",
        description: "",
        categories: ["party-game", "action"],
        stations: ["Oculus"],
        tags: [
          "PVP",
          "COOP"
        ],
        maxPlayersOffline: 8,
        maxPlayersOnline: 0,
        flagFamilyFriendly: true,
      },
    ]);
  });


  test("Category + text search", () => {
    expect(
      search(gameList, [
        {
          search: 'mi',
          searchParams: ['title', 'author', 'description'],
          logic: 'OR',
          stringLimit: 2,
          distance: -1
        },
        {
          search: ['sport'],
          searchParams: ['categories'],
          logic: 'OR',
        }
      ])
    ).toEqual([
      {
        id: "item-12",
        title: "Walkabout Mini Golf",
        author: "Mighty Coconut",
        description: "",
        categories: ["sport"],
        stations: ["Oculus"],
        tags: [
          "Golf",
          "PVP"
        ],
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
      },
    ]);
  });

  test("(SPECIAL) [OR] Category + text search WITH OR", () => {
    expect(
      search(gameList, [
        {
          search: 'wa',
          searchParams: ['title', 'author', 'description'],
          logic: 'OR',
          stringLimit: 2,
          distance: -1
        },
        {
          search: ['sport'],
          searchParams: ['categories'],
          logic: 'OR',
        }
      ], "OR")
    ).toEqual([
      {
        id: "item-5",
        title: "Echo Arena",
        author: "",
        description: "",
        categories: ["sport"],
        stations: ["Oculus"],
        tags: [],
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
      },
      {
        id: "item-10",
        title: "Ragnarock",
        author: "WanadevStudio",
        description: "",
        categories: ["rhythm"],
        stations: ["Oculus"],
        tags: [
          "Music"
        ],
        maxPlayersOffline: 1,
        maxPlayersOnline: 0,
        flagFamilyFriendly: true,
      },
      {
        id: "item-12",
        title: "Walkabout Mini Golf",
        author: "Mighty Coconut",
        description: "",
        categories: ["sport"],
        stations: ["Oculus"],
        tags: [
          "Golf",
          "PVP"
        ],
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
      },
    ]);
  });
});

describe("(search) TEXT Search various keys in a haystack", () => {

  test("[AND/OR] (AND/OR) 1 needed parameter, AND or OR is the same", () => {
    expect(
      search(input, [
        {
          search: 'lorem ipsum',
          searchParams: ['param1']
        }
      ])
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
    ]);
  });

  test("[AND/OR] (AND) 2 needed parameters", () => {
    expect(
      search(input, [
        {
          search: 'lorem ipsum',
          searchParams: ['param1', 'param3'],
        }
      ])
    ).toEqual([
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
    ]);
  });

  test("[AND/OR] (OR) 2 needed parameters", () => {
    expect(
      search(input, [
        {
          search: 'lorem ipsum',
          searchParams: ['param1', 'param3'],
          logic: "OR"
        }
      ])
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
      {
        id: 5,
        param1: 'test',
        param2: 'toast',
        param3: 'lorem ipsum',
        param4: true,
        param5: 17,
        param6: 1500
      },
    ]);
  });

  test("[AND] (AND/OR) 2 different rules", () => {
    expect(
      search(input, [
        {
          search: 'adipiscing',
          searchParams: ['param1']
        },
        {
          search: 'eiusmod',
          searchParams: ['param3']
        }
      ])
    ).toEqual([
      {
        id: 3,
        param1: 'adipiscing',
        param2: 'elit sed do',
        param3: 'eiusmod',
        param4: true,
        param5: 14,
        param6: 1200
      },
    ]);
  });

  test("[OR] (AND/OR) 2 different rules", () => {
    expect(
      search(input, [
        {
          search: 'adipiscing',
          searchParams: ['param1']
        },
        {
          search: 'lorem ipsum',
          searchParams: ['param3']
        }
      ], "OR")
    ).toEqual([
      {
        id: 3,
        param1: 'adipiscing',
        param2: 'elit sed do',
        param3: 'eiusmod',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
      {
        id: 5,
        param1: 'test',
        param2: 'toast',
        param3: 'lorem ipsum',
        param4: true,
        param5: 17,
        param6: 1500
      },
    ]);
  });

  test("[AND/OR] (AND/OR) (levenshteinDistance = 2) 1 needed parameter with fuzzy search", () => {
    expect(
      search(input, [
        {
          search: 'loerm ipsum',
          searchParams: ['param1'],
          distance: 2
        }
      ])
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
    ]);
  });

  test("[AND] (AND/OR) (levenshteinDistance = 2) 2 needed parameter with fuzzy search", () => {
    expect(
      search(input, [
        {
          search: 'loerm ipsum',
          searchParams: ['param1'],
          distance: 2
        },
        {
          search: 'lorem ispu',
          searchParams: ['param3'],
          distance: 3
        }
      ])
    ).toEqual([
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
    ]);
  });

  test("[OR] (AND/OR) (levenshteinDistance = 2) 2 needed parameter with fuzzy search", () => {
    expect(
      search(input, [
        {
          search: 'loerm ipsum',
          searchParams: ['param1'],
          distance: 2
        },
        {
          search: 'lorem ispu',
          searchParams: ['param3'],
          distance: 3
        }
      ], "OR")
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
      {
        id: 5,
        param1: 'test',
        param2: 'toast',
        param3: 'lorem ipsum',
        param4: true,
        param5: 17,
        param6: 1500
      },
    ]);
  });
});



describe("(search) BOOLEAN/NUMBERS Search various keys in a haystack", () => {

  test("[AND/OR] (AND/OR) BOOLEAN parameters", () => {
    expect(
      search(input, [
        {
          search: false,
          searchParams: ['param4']
        }
      ])
    ).toEqual([
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
    ]);
  });

  test("[AND/OR] (AND/OR) NUMERIC parameters", () => {
    expect(
      search(input, [
        {
          search: 14,
          searchParams: ['param5']
        }
      ])
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 3,
        param1: 'adipiscing',
        param2: 'elit sed do',
        param3: 'eiusmod',
        param4: true,
        param5: 14,
        param6: 1200
      },
    ]);
  });

  test("[AND/OR] (AND/OR) Search specific number (alternate)", () => {
    expect(
      search(input, [
        {
          search: 1300,
          searchParams: ['param6'],
          numberRule: "eq"
        }
      ])
    ).toEqual([
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
    ]);
  });

  test("[AND] (AND/OR) Between 2 numbers (1200 < X < 1400)", () => {
    expect(
      search(input, [
        {
          search: 1200,
          searchParams: ['param6'],
          numberRule: "gt"
        },
        {
          search: 1400,
          searchParams: ['param6'],
          numberRule: "lt"
        }
      ])
    ).toEqual([
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
    ]);
  });

  test("[OR] (AND/OR) Between 2 numbers (1200 < X < 1400)", () => {
    expect(
      search(input, [
        {
          search: 1400,
          searchParams: ['param6'],
          numberRule: "egt"
        },
        {
          search: 1200,
          searchParams: ['param6'],
          numberRule: "elt"
        }
      ], "OR")
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 3,
        param1: 'adipiscing',
        param2: 'elit sed do',
        param3: 'eiusmod',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
      {
        id: 5,
        param1: 'test',
        param2: 'toast',
        param3: 'lorem ipsum',
        param4: true,
        param5: 17,
        param6: 1500
      },
    ]);
  });
});

describe("(search) GROUP search", () => {
  test("[AND] (AND/OR) COMPLEX search with groups", () => {
    expect(
      search(input, [
        {
          // logic: "AND",
          rules: [
            {
              search: 1200,
              searchParams: ['param6'],
              numberRule: "gt"
            },
            {
              search: 1400,
              searchParams: ['param6'],
              numberRule: "lt"
            }
          ]
        },
        {
          logic: "OR",
          rules: [
            {
              search: "dolor",
              searchParams: ['param2'],
            },
            {
              search: false,
              searchParams: ['param4'],
            }
          ]
        },
      ])
    ).toEqual([
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      }
    ]);
  });

  test("[OR] (AND/OR) COMPLEX search with groups", () => {
    expect(
      search(input, [
        {
          // logic: "AND",
          rules: [
            {
              search: 1200,
              searchParams: ['param6'],
              numberRule: "gt"
            },
            {
              search: 1400,
              searchParams: ['param6'],
              numberRule: "lt"
            }
          ]
        },
        {
          logic: "OR",
          rules: [
            {
              search: "dolor",
              searchParams: ['param2'],
            },
            {
              search: false,
              searchParams: ['param4'],
            }
          ]
        },
      ], "OR")
    ).toEqual([
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      }
    ]);
  });
});

describe("(search) FUNCTION search", () => {
  test("[AND/OR] (AND?)", () => {
    expect(
      search(input, [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item :any) => 1200 < item.param6 && item.param6 < 1500
      ])
    ).toEqual([
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
    ]);
  });

  test("[AND] (AND?) Double function", () => {
    expect(
      search(input, [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item :any) => 1200 < item.param6 && item.param6 < 1500,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ param2 } :any) => param2 === "test"
      ])
    ).toEqual([
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
    ]);
  });

  test("[OR] (AND?) Double function", () => {
    expect(
      search(input, [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item :any) => 1200 < item.param6 && item.param6 < 1500,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ param2 } :any) => param2 === "toast"
      ], "OR")
    ).toEqual([
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
      {
        id: 5,
        param1: 'test',
        param2: 'toast',
        param3: 'lorem ipsum',
        param4: true,
        param5: 17,
        param6: 1500
      },
    ]);
  });
});

describe("(search) COMPLEX Search various keys in a haystack", () => {

  test("[AND] (AND/OR) COMPLEX search with MIXED groups and filters", () => {
    expect(
      search(input, [
        {
          // logic: "AND",
          rules: [
            {
              search: 1200,
              searchParams: ['param6'],
              numberRule: "egt"
            },
            {
              search: 1400,
              searchParams: ['param6'],
              numberRule: "elt"
            }
          ]
        },
        {
          search: 14,
          searchParams: ['param5'],
        }
      ])
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 3,
        param1: 'adipiscing',
        param2: 'elit sed do',
        param3: 'eiusmod',
        param4: true,
        param5: 14,
        param6: 1200
      }
    ]);
  });

  test("[AND] (AND/OR) COMPLEX (different order) search with MIXED groups and filters", () => {
    expect(
      search(input, [
        {
          search: 14,
          searchParams: ['param5'],
        },
        {
          // logic: "AND",
          rules: [
            {
              search: 1200,
              searchParams: ['param6'],
              numberRule: "egt"
            },
            {
              search: 1400,
              searchParams: ['param6'],
              numberRule: "elt"
            }
          ]
        },
      ])
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 3,
        param1: 'adipiscing',
        param2: 'elit sed do',
        param3: 'eiusmod',
        param4: true,
        param5: 14,
        param6: 1200
      }
    ]);
  });

  test("[OR] (AND/OR) COMPLEX search with MIXED groups and filters", () => {
    expect(
      search(input, [
        {
          // logic: "AND",
          rules: [
            {
              search: 1200,
              searchParams: ['param6'],
              numberRule: "egt"
            },
            {
              search: 1400,
              searchParams: ['param6'],
              numberRule: "elt"
            }
          ]
        },
        {
          search: 14,
          searchParams: ['param5'],
        }
      ], "OR")
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 3,
        param1: 'adipiscing',
        param2: 'elit sed do',
        param3: 'eiusmod',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
      {
        id: 4,
        param1: 'lorem ipsum',
        param2: 'test',
        param3: 'lorem ipsum',
        param4: false,
        param5: 16,
        param6: 1400
      },
    ]);
  });

  test("[AND/OR] (AND?) COMPLEX search with FUNCTION", () => {
    expect(
      search(input, [
        {
          // logic: "AND",
          rules: [
            {
              search: 1200,
              searchParams: ['param6'],
              numberRule: "egt"
            },
            {
              search: 1400,
              searchParams: ['param6'],
              numberRule: "elt"
            }
          ]
        },
        {
          search: 14,
          searchParams: ['param5'],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ param2 } :any) => param2 === "dolor",
      ])
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
    ]);
  });

  test("[AND/OR] (AND?) COMPLEX search with FUNCTION", () => {
    expect(
      search(input, [
        {
          // logic: "AND",
          rules: [
            {
              search: 1200,
              searchParams: ['param6'],
              numberRule: "gt"
            },
            {
              search: 1400,
              searchParams: ['param6'],
              numberRule: "lt"
            }
          ]
        },
        {
          search: 14,
          searchParams: ['param5'],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ param5 } :any) => param5 === 17,
      ], "OR")
    ).toEqual([
      {
        id: 1,
        param1: 'lorem ipsum',
        param2: 'dolor',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 3,
        param1: 'adipiscing',
        param2: 'elit sed do',
        param3: 'eiusmod',
        param4: true,
        param5: 14,
        param6: 1200
      },
      {
        id: 2,
        param1: 'lorem ipsum',
        param2: 'sit amet',
        param3: 'consectetur',
        param4: false,
        param5: 15,
        param6: 1300
      },
      {
        id: 5,
        param1: 'test',
        param2: 'toast',
        param3: 'lorem ipsum',
        param4: true,
        param5: 17,
        param6: 1500
      },
    ]);
  });
});
