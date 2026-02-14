import type { Sprite } from "@wjdghks963/pixel-actors-core";
import { createActorComponent } from "@wjdghks963/pixel-actors-react";

const palette = {
  "a": "#302a34",
  "b": "#251c2b",
  "c": "#212f4c",
  "d": "#263554",
  "e": "#ca733d",
  "f": "#273758",
  "g": "#263758",
  "h": "#273859",
  "i": "#28395a",
  "j": "#283a5b",
  "k": "#202e4b",
  "l": "#243250",
  "m": "#2a3b5c",
  "n": "#2d3d5d",
  "o": "#263452",
  "p": "#2b3c5c"
} as const;

type Pixel = [x: number, y: number, color: string];

function frameFromGrid(rows: string[]): Pixel[] {
  const pixels: Pixel[] = [];

  rows.forEach((row, y) => {
    row.split("").forEach((char, x) => {
      if (char === ".") return;
      const color = palette[char as keyof typeof palette];
      if (color) pixels.push([x, y, color]);
    });
  });

  return pixels;
}

export const CatSprite: Sprite = {
  width: 32,
  height: 32,
  frames: [
  [
    "clldddffgfhhiijijijnnigdllcckkkk",
    "llonnniimmnnmmnpmnnnnomgfolccccc",
    "lodnenppnnnnnnnnnnnokacppfolllcc",
    "odfnnnnnnnnnnnnnnnocabbknmpdloll",
    "dpinnnnnnnnnnnennnocbbbbdnpinool",
    "fpnnnnnaannnnnennolabbbbknpnendo",
    "pnnnnnneabaneeeeeeaabbolacnnnnif",
    "nnnnnneeeabeeeeeeeeebboaaannnnnp",
    "nnnnnneennnennnaeeeeaaaaaannnnnn",
    "nnnnnabbbbbannnocaaaabaaennnnnnn",
    "nnnnbbbbbbbbbboolaabbbaeennnnnnn",
    "nnnabbbbbbbbbbbboaaabbaeennnnnnn",
    "nnnabbbbbaaabbbbbaaaabaeennnnnnn",
    "nnnnaabbabaaaaabbbbaaaaaannnnnnn",
    "nnnnnaaaaeabaaaabbbbbaabonnnnnnn",
    "nnnnnnaaenabaaabnbabbbbaknnnnnnn",
    "nneennnaeabaaaababnabbbbbbknnnnn",
    "nnnnnnnaneaaaaaabaeabbbbbbbbnnnn",
    "nnnnnnnaaaaaaaaaaenbbbbbbbbannnn",
    "nnnnnnnnbbaabaaaaabbbbbaonnnnnnn",
    "nnnnnnnnnabbbbbbbbbbbbnnnnnnnnnn",
    "nnnnnnnnnnnabbbbbbbannnnnnnnnnnn",
    "nnnnnnnnnnneeaaeabbnnnnabbnnnnnn",
    "eeeennnnnnneeaeeabbbnnnbbannnnnn",
    "eeeeeeeennnaeaeabbbbbnnbbnnnnnnn",
    "eeeeeeeeeeeaabeabbbbbanbbnnnnnne",
    "eeeeeeeeeeeabbbbbbbbbbbbannnnnnn",
    "eeeeeeeeeeeabbbbbbbbbbbbaaaaaaaa",
    "eeeeeeeeeeeaabbbbbbbbbaaaaaaaaaa",
    "eeeeeeeeeeeaabbbbbbbaaaaaaaaaaaa",
    "eeeeeeeeeeeeeeeeeeeeeeeeeeeaaaaa",
    "eeeeeeeeeeeeeeeeeeeaaaaaaaaaaaaa"
  ]
  ].map(frameFromGrid)
};

export const Cat = createActorComponent(CatSprite, "Cat");
