enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

enum Direction2 {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right',
}

// Keine Enums verwenden weil sie sind komisch...
// kompilierte enum.js anschauen
// wenn wir ueber das enum Direction iterieren wollten, dann ware die Laenge 8 statt der erwarteten 4

// Bessere Alternativen yu enums: Type-Literal
type DirectionType = 'Up' | 'Down' | 'Left' | 'Right';
let direction: DirectionType = 'Up';

// 2. Alternative ist ein readonly object
// Details zur Erklaerung hier: https://youtu.be/jjMbPt_H3RQ
const directionObj = {
    Up: 1,
    Down: 2,
    Left: 3,
    Right: 4,
} as const;

// directionObj.Down = 42; // as const verhindert Zuweisung eines anderen Wertes
