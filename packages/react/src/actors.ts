import type { Frame, Sprite } from "@wjdghks963/pixel-actors-core";

function frameFromGrid(rows: string[], palette: Record<string, string>): Frame {
  const frame: Frame = [];

  rows.forEach((row, y) => {
    row.split("").forEach((char, x) => {
      const color = palette[char];
      if (color) {
        frame.push([x, y, color]);
      }
    });
  });

  return frame;
}

const BAT_PALETTE = {
  x: "#111827",
  g: "#374151"
};

export const batSprite: Sprite = {
  width: 10,
  height: 6,
  frames: [
    frameFromGrid(
      [
        "xx......xx",
        "xxx....xxx",
        "xxxxxxxxxx",
        ".xxxxxxxx.",
        "..xx..xx..",
        "...x..x..."
      ],
      BAT_PALETTE
    ),
    frameFromGrid(
      [
        ".xx....xx.",
        "xxxx..xxxx",
        "xxxxxxxxxx",
        ".xxxxxxxx.",
        "..xx..xx..",
        "...x..x..."
      ],
      BAT_PALETTE
    ),
    frameFromGrid(
      [
        "..x....x..",
        ".xxxxxxxx.",
        "xxxxxxxxxx",
        "xxxxxxxxxx",
        ".xx....xx.",
        "..x....x.."
      ],
      BAT_PALETTE
    ),
    frameFromGrid(
      [
        ".xx....xx.",
        "xxxx..xxxx",
        "xxxxxxxxxx",
        ".xxxxxxxx.",
        "..xx..xx..",
        "...x..x..."
      ],
      BAT_PALETTE
    )
  ]
};

const FIRE_PALETTE = {
  y: "#fde047",
  o: "#fb923c",
  r: "#ef4444"
};

export const fireSprite: Sprite = {
  width: 8,
  height: 10,
  frames: [
    frameFromGrid(
      [
        "....y...",
        "...oyo..",
        "..oyyyo.",
        "..yyryo.",
        ".oyrryyo",
        ".yrrrroo",
        "oyrrrryo",
        "oyrrryyo",
        ".oyyyyo.",
        "..oooo.."
      ],
      FIRE_PALETTE
    ),
    frameFromGrid(
      [
        "...y....",
        "..oyyo..",
        "..yyyyo.",
        ".oyyrro.",
        ".yyrrryo",
        "oyrrrrro",
        "oyrrrryo",
        ".yrrryyo",
        "..oyyyo.",
        "...ooo.."
      ],
      FIRE_PALETTE
    ),
    frameFromGrid(
      [
        "....y...",
        "...yyo..",
        "..oyyyo.",
        ".oyyrro.",
        ".yyrrryo",
        "oyrrrrro",
        "oyrrrryo",
        "oyrrryyo",
        ".oyyyyo.",
        "..oooo.."
      ],
      FIRE_PALETTE
    ),
    frameFromGrid(
      [
        "...y....",
        "..oyyo..",
        "..yyyyo.",
        "..yyrro.",
        ".oyrrryo",
        ".yrrrrro",
        "oyrrrryo",
        ".yrrryyo",
        "..oyyyo.",
        "...ooo.."
      ],
      FIRE_PALETTE
    )
  ]
};

const COIN_PALETTE = {
  y: "#fde047",
  g: "#f59e0b",
  w: "#fff7ae"
};

export const coinSprite: Sprite = {
  width: 8,
  height: 8,
  frames: [
    frameFromGrid(
      [
        "..gggg..",
        ".gyyyyg.",
        "gywwwwyg",
        "gywwwwyg",
        "gywwwwyg",
        "gywwwwyg",
        ".gyyyyg.",
        "..gggg.."
      ],
      COIN_PALETTE
    ),
    frameFromGrid(
      [
        "...gg...",
        "..gyyg..",
        ".gywwyg.",
        ".gywwyg.",
        ".gywwyg.",
        ".gywwyg.",
        "..gyyg..",
        "...gg..."
      ],
      COIN_PALETTE
    ),
    frameFromGrid(
      [
        "....g...",
        "...gy...",
        "..gyw...",
        "..gyw...",
        "..gyw...",
        "..gyw...",
        "...gy...",
        "....g..."
      ],
      COIN_PALETTE
    ),
    frameFromGrid(
      [
        "...gg...",
        "..gyyg..",
        ".gywwyg.",
        ".gywwyg.",
        ".gywwyg.",
        ".gywwyg.",
        "..gyyg..",
        "...gg..."
      ],
      COIN_PALETTE
    ),
    frameFromGrid(
      [
        "..gggg..",
        ".gyyyyg.",
        "gywwwwyg",
        "gywwwwyg",
        "gywwwwyg",
        "gywwwwyg",
        ".gyyyyg.",
        "..gggg.."
      ],
      COIN_PALETTE
    ),
    frameFromGrid(
      [
        "...gg...",
        "..gyyg..",
        ".gywwyg.",
        ".gywwyg.",
        ".gywwyg.",
        ".gywwyg.",
        "..gyyg..",
        "...gg..."
      ],
      COIN_PALETTE
    )
  ]
};

const STAR_PALETTE = {
  y: "#fde047",
  w: "#fff7ae"
};

export const starSprite: Sprite = {
  width: 8,
  height: 8,
  frames: [
    frameFromGrid(
      [
        "...y....",
        "...y....",
        "yywywyy.",
        ".ywwwy..",
        "..ywy...",
        ".ywwwy..",
        "yywywyy.",
        "...y...."
      ],
      STAR_PALETTE
    ),
    frameFromGrid(
      [
        "........",
        "...w....",
        "..ywy...",
        ".wwyww..",
        "..ywy...",
        ".wwyww..",
        "..ywy...",
        "...w...."
      ],
      STAR_PALETTE
    )
  ]
};

const GHOST_PALETTE = {
  p: "#e9d5ff",
  w: "#ffffff",
  b: "#1e3a8a",
  s: "#c084fc"
};

export const ghostSprite: Sprite = {
  width: 10,
  height: 10,
  frames: [
    frameFromGrid(
      [
        "..pppppp..",
        ".pppppppp.",
        "pppppppppp",
        "ppwppwpppp",
        "ppbppbpppp",
        "pppppppppp",
        "ppsssssspp",
        "psppssppsp",
        "psppssppsp",
        "p.s.pp.s.p"
      ],
      GHOST_PALETTE
    ),
    frameFromGrid(
      [
        "..pppppp..",
        ".pppppppp.",
        "pppppppppp",
        "ppwppwpppp",
        "ppbppbpppp",
        "pppppppppp",
        "ppsssssspp",
        "psppssppsp",
        "psppssppsp",
        "pp.spp.spp"
      ],
      GHOST_PALETTE
    ),
    frameFromGrid(
      [
        "..pppppp..",
        ".pppppppp.",
        "pppppppppp",
        "ppwppwpppp",
        "ppbppbpppp",
        "pppppppppp",
        "ppsssssspp",
        "psppssppsp",
        "psppssppsp",
        "p.sppps.pp"
      ],
      GHOST_PALETTE
    ),
    frameFromGrid(
      [
        "..pppppp..",
        ".pppppppp.",
        "pppppppppp",
        "ppwppwpppp",
        "ppbppbpppp",
        "pppppppppp",
        "ppsssssspp",
        "psppssppsp",
        "psppssppsp",
        "pp.spp.spp"
      ],
      GHOST_PALETTE
    )
  ]
};

const DRAGON_PALETTE = {
  g: "#34d399",
  m: "#10b981",
  y: "#fde68a",
  p: "#f9a8d4",
  w: "#ffffff",
  b: "#111827",
  o: "#f59e0b",
  c: "#fb7185",
  s: "#93c5fd"
};

const dragonFrame1 = frameFromGrid(
  [
    "................",
    ".....oo.........",
    "....oggo........",
    "...oggggo.......",
    "..ppgggggg......",
    ".pppggggggg.....",
    ".ppgggggggggo...",
    ".pgggywbygggo...",
    "..gggycyygggg...",
    "..ggyyyyyygggg..",
    "..gggyyyygggg...",
    "...gggggggg.....",
    "....gggggg......",
    "....pggggp......",
    "...pp....pp.....",
    "..ss......ss...."
  ],
  DRAGON_PALETTE
);

const dragonFrame2 = frameFromGrid(
  [
    "................",
    "....poo..p......",
    "...ppggopp......",
    "..ppgggggopp....",
    ".ppgggggggg.....",
    "ppgggggggggg....",
    ".ppgggggggggo...",
    "..pggywbygggo...",
    "..gggycyygggg...",
    "..ggyyyyyygggg..",
    "...ggyyyygggg...",
    "....ggggggg.....",
    ".....ggggg......",
    "....ppggpp......",
    "...pp....pp.....",
    "...ss....ss....."
  ],
  DRAGON_PALETTE
);

const dragonFrame3 = frameFromGrid(
  [
    "................",
    ".....oo.........",
    "....oggo........",
    "...oggggo.......",
    "...ggggggg......",
    "...pggggggg.....",
    "..ppggggggggo...",
    ".ppggywbygggo...",
    "..gggycyygggg...",
    "..ggyyyyyygggg..",
    "..ggyyyyygggg...",
    "...gggggggg.....",
    "....gggggg......",
    "...ppggggpp.....",
    "..pp......pp....",
    ".ss........ss..."
  ],
  DRAGON_PALETTE
);

const dragonFrame4 = frameFromGrid(
  [
    "................",
    ".....oo.........",
    "....oggo........",
    "..ppgggggo......",
    ".ppgggggggg.....",
    ".ppggggggggg....",
    "..pgggggggggo...",
    "..gggybbyygggg..",
    "..gggycyygggg...",
    "..ggyyyyyygggg..",
    "...ggyyyygggg...",
    "....ggggggg.....",
    "....gggggg......",
    "...ppggggpp.....",
    "..pp......pp....",
    "..s...ss...s...."
  ],
  DRAGON_PALETTE
);

export const dragonSprite: Sprite = {
  width: 16,
  height: 16,
  frames: [
    dragonFrame1,
    dragonFrame2,
    dragonFrame3,
    dragonFrame4,
    dragonFrame3,
    dragonFrame2,
    dragonFrame1,
    dragonFrame2
  ]
};

const BUNNY_KNIGHT_PALETTE = {
  w: "#ffffff",
  p: "#f9a8d4",
  y: "#fef3c7",
  b: "#1d4ed8",
  s: "#9ca3af",
  "1": "#4b5563"
};

const bunnyKnightFrame1 = frameFromGrid(
  [
    ".....ww..ww.....",
    ".....ww..ww.....",
    "......wwww......",
    ".....wppppw.....",
    "....wppppppw....",
    "...wppyyyyppw...",
    "...wpybyybypw...",
    "...wpyyyyyypw...",
    "...wppyyyyppw...",
    "....wppppppw....",
    "...sswppppwss...",
    "..s11swppws11s..",
    "..s111swws111s..",
    "...s11s..s11s...",
    "....ss....ss....",
    "................"
  ],
  BUNNY_KNIGHT_PALETTE
);

const bunnyKnightFrame2 = frameFromGrid(
  [
    "....ww....ww....",
    ".....ww..ww.....",
    "......wwww......",
    ".....wppppw.....",
    "....wppppppw....",
    "...wppyyyyppw...",
    "...wpybyybypw...",
    "...wpyyyyyypw...",
    "...wppyyyyppw...",
    "....wppppppw....",
    "...sswppppwss...",
    "..s11swppws11s..",
    "..s111swws111s..",
    "...s11s..s11s...",
    "....ss....ss....",
    "................"
  ],
  BUNNY_KNIGHT_PALETTE
);

const bunnyKnightFrame3 = frameFromGrid(
  [
    "......wwww......",
    ".....ww..ww.....",
    ".....ww..ww.....",
    ".....wppppw.....",
    "....wppppppw....",
    "...wppyyyyppw...",
    "...wpyyyyyypw...",
    "...wpyyyyyypw...",
    "...wppyyyyppw...",
    "....wppppppw....",
    "...sswppppwss...",
    "...s11wppw11s...",
    "..ss111swws11s..",
    "...s11s..s11s...",
    "....s......s....",
    "...ss......ss..."
  ],
  BUNNY_KNIGHT_PALETTE
);

const bunnyKnightFrame4 = frameFromGrid(
  [
    "....ww....ww....",
    ".....ww..ww.....",
    "......wwww......",
    ".....wppppw.....",
    "....wppppppw....",
    "...wppyyyyppw...",
    "...wpyb..bypw...",
    "...wpyyyyyypw...",
    "...wppyyyyppw...",
    "....wppppppw....",
    "...sswppppwss...",
    "..s11swppws11s..",
    "..s111swws111s..",
    "...s11s..s11s...",
    "....ss....ss....",
    "................"
  ],
  BUNNY_KNIGHT_PALETTE
);

export const bunnyKnightSprite: Sprite = {
  width: 16,
  height: 16,
  frames: [
    bunnyKnightFrame1,
    bunnyKnightFrame2,
    bunnyKnightFrame3,
    bunnyKnightFrame4,
    bunnyKnightFrame3,
    bunnyKnightFrame2
  ]
};

const ROBO_CAT_PALETTE = {
  t: "#f59e0b",
  m: "#94a3b8",
  c: "#64748b",
  b: "#22d3ee",
  y: "#fef08a",
  s: "#334155"
};

const roboCatFrame1 = frameFromGrid(
  [
    "....t......t....",
    "....mm....mm....",
    "...mmmm..mmmm...",
    "..mccccmmccccm..",
    "..mccbccbbcccm..",
    "..mccccccccccm..",
    "..mccyyyyyyccm..",
    "...mcyyyyyycm...",
    "...mccccccccm...",
    "..mccmmmmmmccm..",
    "..mcmm....mmcm..",
    "..smm......mms..",
    ".ssm........mss.",
    "..s..........s..",
    "................",
    "................"
  ],
  ROBO_CAT_PALETTE
);

const roboCatFrame2 = frameFromGrid(
  [
    ".....t....t.....",
    "....mm....mm....",
    "...mmmm..mmmm...",
    "..mccccmmccccm..",
    "..mccccccccccm..",
    "..mccbccbbcccm..",
    "..mccyyyyyyccm..",
    "...mcyyyyyycm...",
    "...mccccccccm...",
    "..mccmmmmmmccm..",
    "..mcmm....mmcm..",
    "..smm......mms..",
    "..ssm......mss..",
    "...s......s.....",
    "................",
    "................"
  ],
  ROBO_CAT_PALETTE
);

const roboCatFrame3 = frameFromGrid(
  [
    "....t......t....",
    "....mm....mm....",
    "...mmmm..mmmm...",
    "..mccccmmccccm..",
    "..mccccccccccm..",
    "..mccccccccccm..",
    "..mccyyyyyyccm..",
    "...mcyyyyyycm...",
    "..mccccccccccm..",
    "..mccmmmmmmccm..",
    "..mcmm....mmcm..",
    "..smm......mms..",
    ".ssm........mss.",
    "...s......s.....",
    "..ss......ss....",
    "................"
  ],
  ROBO_CAT_PALETTE
);

const roboCatFrame4 = frameFromGrid(
  [
    ".....t....t.....",
    "....mm....mm....",
    "...mmmm..mmmm...",
    "..mccccmmccccm..",
    "..mccbccbbcccm..",
    "..mccccccccccm..",
    "..mccyyyyyyccm..",
    "...mcyyyyyycm...",
    "...mccccccccm...",
    "..mccmmmmmmccm..",
    "..mcmm....mmcm..",
    "..smm......mms..",
    "..ssm......mss..",
    "...ss....ss.....",
    "....s....s......",
    "................"
  ],
  ROBO_CAT_PALETTE
);

export const roboCatSprite: Sprite = {
  width: 16,
  height: 16,
  frames: [roboCatFrame1, roboCatFrame2, roboCatFrame3, roboCatFrame4, roboCatFrame3, roboCatFrame2]
};

const SLIME_MAGE_PALETTE = {
  o: "#fb923c",
  p: "#a855f7",
  g: "#4ade80",
  w: "#ffffff",
  b: "#1d4ed8",
  s: "#64748b"
};

const slimeMageFrame1 = frameFromGrid(
  [
    "......oo........",
    ".....oooo.......",
    "....oooopo......",
    "...oopppppoo....",
    "...opgggggpo....",
    "..opgwwggggpo...",
    "..opgbbggggpo...",
    "..opgggggggpo...",
    "...opgggggpo....",
    "...oopggpoo.....",
    "....oppppo......",
    "...soppppos.....",
    "..ssopppposs....",
    "...ss....ss.....",
    "................",
    "................"
  ],
  SLIME_MAGE_PALETTE
);

const slimeMageFrame2 = frameFromGrid(
  [
    ".....oo.........",
    "....oooo........",
    "...oooopoo......",
    "..ooppppppoo....",
    "..opggggggpo....",
    "..opgwwggggpo...",
    "..opgbbggggpo...",
    "...opggggggpo...",
    "...opgggggpo....",
    "....opggpoo.....",
    "....oppppo......",
    "...soppppos.....",
    "..ssopppposs....",
    "...ss....ss.....",
    "................",
    "................"
  ],
  SLIME_MAGE_PALETTE
);

const slimeMageFrame3 = frameFromGrid(
  [
    "......oo........",
    ".....oooo.......",
    "....oooopo......",
    "...oopppppoo....",
    "...opgggggpo....",
    "..opgggggggpo...",
    "..opg..ggggpo...",
    "..opgggggggpo...",
    "...opgggggpo....",
    "...oopggpoo.....",
    "....oppppo......",
    "...soppppos.....",
    "..ssopppposs....",
    "...s......s.....",
    "..ss......ss....",
    "................"
  ],
  SLIME_MAGE_PALETTE
);

const slimeMageFrame4 = frameFromGrid(
  [
    ".....oo.........",
    "....oooo........",
    "...oooopoo......",
    "..ooppppppoo....",
    "..opggggggpo....",
    "..opgwwggggpo...",
    "..opgbbggggpo...",
    "..opgggggggpo...",
    "..opggggggpo....",
    "...oopggpoo.....",
    "...ooppppo......",
    "..ssopppposs....",
    "...ssppppss.....",
    "....s....s......",
    "...ss....ss.....",
    "................"
  ],
  SLIME_MAGE_PALETTE
);

export const slimeMageSprite: Sprite = {
  width: 16,
  height: 16,
  frames: [
    slimeMageFrame1,
    slimeMageFrame2,
    slimeMageFrame3,
    slimeMageFrame4,
    slimeMageFrame3,
    slimeMageFrame2
  ]
};
